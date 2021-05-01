import React from 'react';
import '../styles/tray.scss';

const Tray = ({ title, data }) => (
  <div className='tray'>
    <h2 className='tray__title'>{title}</h2>
    <div className='slick-list'>
      {data.map((item, index) => (
        <Article key={index} {...item} />
      ))}
    </div>
  </div>
);

const Article = ({ thumbnailUrl, name, description }) => {
  const [articleFocused, setArticleFocused] = React.useState(false);
  
  return (
    <article
      className='slick-article'
      onMouseEnter={() => setArticleFocused(true)}
      onMouseLeave={() => setArticleFocused(false)}
    >
      <img src={thumbnailUrl} alt={thumbnailUrl.name} />
      <div className='content' style={{ opacity: articleFocused ? 1 : 0 }}>
        <p className='title'>{name}</p>
        <span className='description'>{description}</span>
      </div>
    </article>
  );
};

export default Tray;
