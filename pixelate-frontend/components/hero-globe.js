"use client";

import { useEffect, useRef } from 'react';
import * as BABYLON from 'babylonjs';

export default function HeroGlobe() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const engine = new BABYLON.Engine(canvas, true);
    
    const createScene = function() {
      // Create a scene
      const scene = new BABYLON.Scene(engine);
      scene.clearColor = new BABYLON.Color4(0.02, 0.02, 0.1, 1); // Darker background
      
      // Create a camera
      const camera = new BABYLON.ArcRotateCamera("Camera", 
        -Math.PI / 2, 
        Math.PI / 2.5, 
        10, 
        new BABYLON.Vector3(0, 0, 0), 
        scene);
      camera.attachControl(canvas, false); // Disable user controls
      camera.lowerRadiusLimit = 5;
      camera.upperRadiusLimit = 20;
      
      // Add lights - Increased intensity
      const light = new BABYLON.HemisphericLight("light", 
        new BABYLON.Vector3(0, 1, 0), 
        scene);
      light.intensity = 1.2; // Brighter light
      
      const directionalLight = new BABYLON.DirectionalLight("directionalLight", 
        new BABYLON.Vector3(1, -0.5, 1), // Adjusted direction for better illumination
        scene);
      directionalLight.intensity = 1.0; // Brighter direct light
      
      // Create earth sphere
      const earth = BABYLON.MeshBuilder.CreateSphere("earth", {
        diameter: 4,
        segments: 32
      }, scene);
      
      // Fix orientation by rotating 180 degrees on the X-axis
      earth.rotation.x = Math.PI;
      
      // Create a material with earth texture
      const earthMaterial = new BABYLON.StandardMaterial("earthMaterial", scene);
      
      // Earth texture
      earthMaterial.diffuseTexture = new BABYLON.Texture("https://raw.githubusercontent.com/BabylonJS/Babylon.js/master/packages/tools/playground/public/textures/earth.jpg", scene);
      
      // Bump map for terrain
      earthMaterial.bumpTexture = new BABYLON.Texture("https://raw.githubusercontent.com/BabylonJS/Babylon.js/master/packages/tools/playground/public/textures/earthbump.jpg", scene);
      earthMaterial.bumpTexture.level = 0.6; // Enhanced terrain
      
      // Specular map for oceans
      earthMaterial.specularTexture = new BABYLON.Texture("https://raw.githubusercontent.com/BabylonJS/Babylon.js/master/packages/tools/playground/public/textures/earthspec.jpg", scene);
      earthMaterial.specularColor = new BABYLON.Color3(0.3, 0.3, 0.3); // Brighter specular
      earthMaterial.specularPower = 16; // Softer specular highlight
      
      // Increase diffuse color to make texture more visible
      earthMaterial.diffuseColor = new BABYLON.Color3(1.2, 1.2, 1.2); // Brighter overall
      
      // Apply material to earth
      earth.material = earthMaterial;
      
      // Create a subtle glow
      const glowLayer = new BABYLON.GlowLayer("glow", scene);
      glowLayer.intensity = 0.7; // Increased glow
      
      // Create an animation for slow earth rotation
      const rotationAnimation = new BABYLON.Animation(
        "earthRotation",
        "rotation.y",
        30,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
      );
      
      const keyFrames = [];
      keyFrames.push({ frame: 0, value: 0 });
      keyFrames.push({ frame: 1000, value: 2 * Math.PI }); // Slow rotation
      rotationAnimation.setKeys(keyFrames);
      
      earth.animations = [rotationAnimation];
      scene.beginAnimation(earth, 0, 1000, true);
     // Create star system
const starsRoot = new BABYLON.TransformNode("starsRoot", scene);

// Create stars
for (let i = 0; i < 400; i++) {
    // Use spheres instead of boxes for more realistic stars
    const star = BABYLON.MeshBuilder.CreateSphere(`star${i}`, {
        diameter: 0.05 + Math.random() * 0.15, // Vary star sizes
        segments: 5 // Low poly count for performance but better than boxes
    }, scene);

    // Position stars randomly in a large sphere around the earth
    const radius = 25 + Math.random() * 15;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    star.position.x = radius * Math.sin(phi) * Math.cos(theta);
    star.position.y = radius * Math.sin(phi) * Math.sin(theta);
    star.position.z = radius * Math.cos(phi);
    
    star.parent = starsRoot;

    // Create material for stars with emissive glow and slight color variation
    const starMaterial = new BABYLON.StandardMaterial(`starMaterial${i}`, scene);
    
    // Add slight color variations (mostly white with hints of blue/yellow)
    const colorVariation = Math.random() * 0.3;
    const r = 1 - colorVariation * Math.random();
    const g = 1 - colorVariation * Math.random();
    const b = 1 + colorVariation * (Math.random() - 0.5);
    
    starMaterial.emissiveColor = new BABYLON.Color3(r, g, b);
    starMaterial.diffuseColor = new BABYLON.Color3(r * 0.2, g * 0.2, b * 0.2);
    starMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    starMaterial.disableLighting = true;
    star.material = starMaterial;

    // Add glow effect using a lens flare system
    const lensFlareSystem = new BABYLON.LensFlareSystem(`lensFlareSystem${i}`, star, scene);
    const flare = new BABYLON.LensFlare(
        0.5 + Math.random() * 0.5, // Size
        0, // Position (0 = on emitter)
        new BABYLON.Color3(r, g, b), // Color
        "", // Texture (empty for default)
        lensFlareSystem
    );

    // More natural twinkle animation using both scaling and opacity
    const twinkleAnimation = new BABYLON.Animation(
        `starTwinkle${i}`,
        "scaling",
        10 + Math.random() * 20, // Vary twinkle speed
        BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const opacityAnimation = new BABYLON.Animation(
        `starOpacity${i}`,
        "visibility",
        10 + Math.random() * 20,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const baseScale = 0.8 + Math.random() * 1.2;
    const scaleVariation = 0.3 + Math.random() * 0.7;
    
    const twinkleKeys = [];
    const opacityKeys = [];
    
    // Create more organic twinkle pattern with multiple peaks
    for (let f = 0; f <= 100; f += 10) {
        const progress = f / 100;
        const scaleFactor = 1 + scaleVariation * Math.sin(progress * Math.PI * 4) * Math.random();
        const currentScale = new BABYLON.Vector3(
            baseScale * scaleFactor,
            baseScale * scaleFactor,
            baseScale * scaleFactor
        );
        
        twinkleKeys.push({ frame: f, value: currentScale });
        opacityKeys.push({ 
            frame: f, 
            value: 0.7 + 0.3 * Math.sin(progress * Math.PI * 2 + Math.random() * 0.5)
        });
    }

    twinkleAnimation.setKeys(twinkleKeys);
    opacityAnimation.setKeys(opacityKeys);
    
    star.animations = [twinkleAnimation, opacityAnimation];
    scene.beginAnimation(star, 0, 100, true);
}

// Create an animation for the star system rotation in opposite direction
const starSystemRotation = new BABYLON.Animation(
    "starSystemRotation",
    "rotation.y",
    30,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
);

const starRotKeyFrames = [];
starRotKeyFrames.push({ frame: 0, value: 0 });
starRotKeyFrames.push({ frame: 2000, value: -2 * Math.PI }); // Opposite direction
starSystemRotation.setKeys(starRotKeyFrames);

starsRoot.animations = [starSystemRotation];
scene.beginAnimation(starsRoot, 0, 2000, true);

// Add a point light inside the earth for extra glow
const innerLight = new BABYLON.PointLight("innerLight", new BABYLON.Vector3(0, 0, 0), scene);
innerLight.intensity = 0.6;
innerLight.diffuse = new BABYLON.Color3(0.3, 0.5, 0.8); // Bluish glow

return scene;
    };
    
    const scene = createScene();
    
    engine.runRenderLoop(function() {
      scene.render();
    });
    
    const handleResize = function() {
      engine.resize();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      engine.dispose();
      scene.dispose();
    };
  }, []);
  
  return (
    <div className="absolute inset-0 z-0">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}