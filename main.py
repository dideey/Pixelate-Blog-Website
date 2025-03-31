from fastapi import FastAPI, HTTPException, Depends, Query, UploadFile, File
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_session
from sqlalchemy import func
from models import BlogPost, PostReaction
from sqlalchemy.future import select
from typing import Optional
import os
from uuid import uuid4
import shutil
from fastapi.staticfiles import StaticFiles




app = FastAPI()
UPLOAD_DIR = "uploads/"
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.post("/posts/")
async def create_post(
    title: str,
    content: str,
    author: str,
    image_url: Optional[str] = None,  # Default value added
    vedio_url: Optional[str] = None,  # Default value added
    db: AsyncSession = Depends(get_session),
):
    new_post = BlogPost(title=title, content=content, author=author, image_url=image_url, vedio_url=vedio_url)
    db.add(new_post)
    await db.commit()
    await db.refresh(new_post)
    return new_post

@app.get("/posts/")
async def get_posts(db: AsyncSession = Depends(get_session),
                    limit: int = Query(10, ge=1, le=100),
                    offset: int = Query(0, ge=0),
                    order: str = Query("desc", pattern="^(asc|desc)$")  # Updated to use `pattern`
): 
    total_posts = await db.scalar(select(func.count(BlogPost.id)))
    order_by = BlogPost.created_at.desc() if order == "desc" else BlogPost.created_at.asc()
    result = await db.execute(select(BlogPost).order_by(order_by).offset(offset).limit(limit))
    posts = result.scalars().all()
    return {
        "total_posts": total_posts,
        "limit": limit,
        "offset": offset,
        "next_offset": offset + limit if offset + limit < total_posts else None,
        "previous_offset": offset - limit if offset - limit >= 0 else None,
        "posts": posts,
    }

@app.get("/posts/{post_id}")
async def get_post(post_id: int, db: AsyncSession = Depends(get_session)):
    result = await db.execute(select(BlogPost).where(BlogPost.id == post_id))
    post = result.scalar_one_or_none()
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@app.put("/posts/{post_id}")
async def update_post(
    post_id: int,
    title: Optional[str] = None,
    content: Optional[str] = None,
    author: Optional[str] = None,
    image_url: Optional[str] = None,
    vedio_url: Optional[str] = None,
    db: AsyncSession = Depends(get_session),
):
    result = await db.execute(select(BlogPost).where(BlogPost.id == post_id))
    post = result.scalar_one_or_none()

    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")

    if title is not None:
        post.title = title
    if content is not None:
        post.content = content
    if author is not None:
        post.author = author
    if image_url is not None:
        post.image_url = image_url
    if vedio_url is not None:
        post.vedio_url = vedio_url

    db.add(post)
    await db.commit()
    await db.refresh(post)
    return post

@app.delete("/posts/{post_id}")
async def delete_post(post_id: int, db: AsyncSession = Depends(get_session)):
    result = await db.execute(select(BlogPost).where(BlogPost.id == post_id))
    post = result.scalar_one_or_none()

    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")

    await db.delete(post)
    await db.commit()
    return JSONResponse("Post deleted", status_code=204)

@app.post("/upload/")
async def upload_file(
    post_id: int,
    image: UploadFile = File(None),
    video: UploadFile = File(None),
    db: AsyncSession = Depends(get_session),
):
    # Retrieve the blog post
    result = await db.execute(select(BlogPost).where(BlogPost.id == post_id))
    post = result.scalar_one_or_none()
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")

    file_urls = {}

    # Handle image upload
    if image:
        image_ext = os.path.splitext(image.filename)[1]  # Get file extension
        image_filename = f"image_{uuid4().hex}{image_ext}"  # Generate unique filename
        image_path = os.path.join(UPLOAD_DIR, image_filename)
        
        with open(image_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
        
        post.image_url = f"/{UPLOAD_DIR}{image_filename}"  # Store the file URL
        file_urls["image_url"] = post.image_url

    # Handle video upload
    if video:
        video_ext = os.path.splitext(video.filename)[1]
        video_filename = f"video_{uuid4().hex}{video_ext}"
        video_path = os.path.join(UPLOAD_DIR, video_filename)
        
        with open(video_path, "wb") as buffer:
            shutil.copyfileobj(video.file, buffer)
        
        post.vedio_url = f"/{UPLOAD_DIR}{video_filename}"  # Store the file URL
        file_urls["vedio_url"] = post.vedio_url

    # Save updates to the database
    db.add(post)
    await db.commit()
    await db.refresh(post)

    return {"message": "File(s) uploaded successfully", "urls": file_urls}

@app.post("/posts/{post_id}/react")
async def add_reaction(
    post_id: int,
    reaction_type: str,  # Can be an emoji 👍 ❤️ 😂
    db: AsyncSession = Depends(get_session),
):
    result = await db.execute(
        select(PostReaction).where(
            (PostReaction.post_id == post_id) & (PostReaction.reaction_type == reaction_type)
        )
    )
    reaction = result.scalar_one_or_none()

    if reaction:
        reaction.count += 1
    else:
        reaction = PostReaction(post_id=post_id, reaction_type=reaction_type, count=1)
        db.add(reaction)

    await db.commit()
    await db.refresh(reaction)
    return {"message": "Reaction added", "reaction": reaction_type, "count": reaction.count}


@app.delete("/posts/{post_id}/react")
async def remove_reaction(
    post_id: int,
    reaction_type: str,  # Emoji or text reaction
    db: AsyncSession = Depends(get_session),
):
    result = await db.execute(
        select(PostReaction).where(
            (PostReaction.post_id == post_id) & (PostReaction.reaction_type == reaction_type)
        )
    )
    reaction = result.scalar_one_or_none()

    if not reaction:
        raise HTTPException(status_code=404, detail="Reaction not found")

    if reaction.count > 1:
        reaction.count -= 1
    else:
        await db.delete(reaction)

    await db.commit()
    return {"message": "Reaction removed", "reaction": reaction_type, "remaining_count": reaction.count}