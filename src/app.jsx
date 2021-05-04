import React from 'react';
import { Link } from 'react-router-dom';
import HotstarThumbnail from './assets/media/images/hotstar/hotstar.png';
import SnakeGame from './assets/media/images/snake-game/snake.png';
import './app.scss';

const applications = [
  {
    name: 'Disney+ Hotstar Clone',
    image: HotstarThumbnail,
    description: '',
    link: '/hotstar',
  },
  {
    name: 'Snake Game',
    image: SnakeGame,
    description: '',
    link: '/snakegame',
  },
  // {
  //   name: 'Twitter Clone',
  //   image: HotstarThumbnail,
  //   description: '',
  //   link: '/hotstar',
  // },
  // {
  //   name: 'Twitter Clone',
  //   image: HotstarThumbnail,
  //   description: '',
  //   link: '/hotstar',
  // },
];

function App() {
  return (
    <main className='app-container'>
      <h2 className='title'>The Clone Applications</h2>

      <section className='app-section'>
        {applications.map((item) => {
          return (
            <Link to={item.link} className='app-card' key={item.name}>
              <img
                src={item.image ? item.image : ''}
                alt={item.name}
                loading='lazy'
              />
              <div className='content'>
                <span className='app-name'>{item.name}</span>
                <span className='app-desc'>{item.description}</span>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}

export default App;
