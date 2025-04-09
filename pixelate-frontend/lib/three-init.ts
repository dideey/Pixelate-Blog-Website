// lib/three-init.ts
import * as THREE from 'three';

if (typeof window !== 'undefined') {
  window.THREE = THREE;
}