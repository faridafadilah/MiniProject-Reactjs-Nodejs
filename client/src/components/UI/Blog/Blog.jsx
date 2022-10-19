import React from 'react'
import videoImg from '../../../assets/img/video.png'
import './Blog.css'
import articleImg from '../../../assets/img/article.png'

const blogData = [
  {
    imgUrl: videoImg,
    title: 'Video',
    desc: 'To know about work. Watch some video f...',
    linkUrl: '#',
  },
  {
    imgUrl: articleImg,
    title: 'Video',
    desc: 'To know about work. Watch some video f...',
    linkUrl: '#',
  },
  {
    imgUrl: videoImg,
    title: 'Video',
    desc: 'To know about work. Watch some video f...',
    linkUrl: '#',
  },
]

const Blog = () => {
  return (
    <section id="blog" className="blog">
      <div className="container">
        <div className="blog__top-content">
          <h6 className="subtitle">Our blog</h6>
          <h2>
            Let's have a look from our
            <span className="highlight"> recent blog</span>
          </h2>
        </div>
        <div className="blog__wrapper">
          {blogData.map((item, index) => (
            <div key={index} className="blog__item">
              <h2>{item.title}</h2>
              <div className="blog__img">
                <img src={item.imgUrl} alt="" />
              </div>
              <p className="description">{item.desc}</p>
              <div>
                <a href={item.linkUrl} className="learn__more">
                  <i className="ri-arrow-right-line"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default Blog
