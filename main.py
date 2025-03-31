from fastapi import FastAPI, HTTPException, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_session
from models import BlogPost
from sqlalchemy.future import select
from typing import Optional



app = FastAPI()


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
async def get_posts(db: AsyncSession = Depends(get_session)):
    result = await db.execute(select(BlogPost))
    posts = result.scalars().all()
    return posts

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
