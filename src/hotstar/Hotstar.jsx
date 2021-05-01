import React from 'react';
import { Header, Banner, Tray, Viwers } from './component';
import './styles/main.scss';
import MovieData from '../assets/data/hotstartMovie.json';

function Hotstar() {
  React.useEffect(() => (document.title = 'Disney+ Hotstar Clone'), []);
  return (
    <main className='hotstart-body'>
      <Header />
      <Banner />
      <Viwers />
      <div className='tray-container'>
        {MovieData.map(
          (item, index) =>
            Object.keys(item)[0] !== 'Banner' && (
              <Tray
                key={index}
                title={Object.keys(item)[0]}
                data={item[Object.keys(item)[0]]}
              />
            )
        )}
      </div>
    </main>
  );
}

export default Hotstar;
