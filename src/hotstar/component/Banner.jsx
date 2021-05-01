import React from 'react';
import MovieContent from '../../assets/data/hotstartMovie.json';
import '../styles/banner.scss';

const Content = {
  thumbnailUrl:
    'https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1_5x/sources/r1/cms/prod/7539/977539-h',
  name: 'Preview, MI Vs CSK',
  type: 'banner',
  category: 'Sports',
  description:
    'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.',
};

function Banner() {
  return (
    <article className='banner'>
      <div className='banner__item'>
        <div className='content'>
          <h2>{Content.name}</h2>
          <p>{Content.description}</p>
        </div>
        <div className='gradient'></div>
        <div className='image'>
          <img src={Content.thumbnailUrl} alt='' />
        </div>
      </div>
    </article>
  );
}

export default Banner;
