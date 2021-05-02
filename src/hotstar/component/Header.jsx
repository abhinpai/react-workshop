import React from 'react';
import '../styles/header.scss';
import HamburgerIcon from '../../assets/icons/gray_hamburger.svg';
import SearchIcon from '../../assets/icons/gray_search.svg';

const MenuItems = [
  'TV',
  'Movie',
  'Sports',
  'News',
  'Premium',
  'Disney+',
  'Kids',
];

function Header() {
  return (
    <header className='hotstar-header'>
      <div className='menu-left-items'>
        <img className='menu-icon' src={HamburgerIcon} alt='Select Menu item' />
        <img
          className='logo'
          src='https://secure-media.hotstarext.com/web-assets/prod/images/brand-logos/disney-hotstar-logo-dark.svg'
          alt='Hotstar logo'
          loading='lazy'
        />

        {MenuItems.map((item) => (
          <span className='item' key={item}>
            {item}
          </span>
        ))}
      </div>
      <div className='menu-right-items'>
        <div className='search'>
          <input type='text' placeholder='Search' />
          <img src={SearchIcon} alt='Search Content' loading='lazy' />
        </div>

        <div className='subscribe-btn'> Subscribe</div>
        <span>Login</span>
      </div>
    </header>
  );
}

export default Header;
