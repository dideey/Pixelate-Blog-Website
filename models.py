from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey

Base = declarative_base()

class BlogPost(Base):
    __tablename__ = 'blog_posts'
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    content = Column(String, nullable=False)
    author = Column(String(255), nullable=False)
    image_url = Column(String(255), nullable=True)
    vedio_url = Column(String(255), nullable=True)

    def __repr__(self):
        return f"<BlogPost(title='{self.title}', author_id={self.author_id})>"