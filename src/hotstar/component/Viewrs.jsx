import React from 'react';
import '../styles/viwer.scss';
import DisneyImage from '../../assets/media/images/hotstar/viewers-disney.png';
import MarvelImage from '../../assets/media/images/hotstar/viewers-marvel.png';
import NGImage from '../../assets/media/images/hotstar/viewers-national.png';
import StarWarImage from '../../assets/media/images/hotstar/viewers-starwars.png';
import PixarImage from '../../assets/media/images/hotstar/viewers-pixar.png';
import DisneyVideo from '../../assets/media/video/hotstar/1564674844-disney.mp4';
import MarvelVideo from '../../assets/media/video/hotstar/1564676115-marvel.mp4';
import NGVideo from '../../assets/media/video/hotstar/1564676296-national-geographic.mp4';
import StarWarVideo from '../../assets/media/video/hotstar/1608229455-star-wars.mp4';
import PixarVideo from '../../assets/media/video/hotstar/1564676714-pixar.mp4';

const ViwerContent = [
  {
    image: DisneyImage,
    video: DisneyVideo,
  },
  {
    image: MarvelImage,
    video: MarvelVideo,
  },
  {
    image: NGImage,
    video: NGVideo,
  },
  {
    image: StarWarImage,
    video: StarWarVideo,
  },
  {
    image: PixarImage,
    video: PixarVideo,
  },
];

function Viewrs() {
  return (
    <section className='viwer-container'>
      {ViwerContent.map((item, index) => (
        <div className='wrap' key={index}>
          <img src={item.image} alt='' loading='lazy' />
          <video src={item.video} loop autoPlay playsInline type='video/mp4' />
        </div>
      ))}
    </section>
  );
}

export default Viewrs;
