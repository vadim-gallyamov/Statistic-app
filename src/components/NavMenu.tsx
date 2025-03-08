// NavMenu.tsx
import React from 'react';
import logo from '../assets/logos/logo.svg';
import nav1 from '../assets/logos/nav1.png';
import nav2 from '../assets/logos/nav2.png';
import nav3 from '../assets/logos/nav3.png';
import nav4 from '../assets/logos/nav4.png';
import nav5 from '../assets/logos/nav5.png';
import nav6 from '../assets/logos/nav6.png';
import nav7 from '../assets/logos/nav7.png';
import { Link } from 'react-router-dom';

interface NavMenuProps {
  onNavClick: (index: number) => void;
  activeIndex: number;
}

const navLogo = [nav1, nav2, nav3, nav4, nav5, nav6, nav7];

const NavMenu: React.FC<NavMenuProps> = ({ onNavClick, activeIndex }) => {
  return (
    <div className="nav-menu">
      <img src={logo} alt="Logo" className="nav-menu__logo" />
      <ul className="nav-menu__nav-list">
        {navLogo.map((nav, index) => (
          <li
            key={index}
            className={`nav-menu__nav-item ${activeIndex === index ? 'nav-menu__nav-item--active' : ''}`}
          >
            <Link
              to={index === 5 ? "/report" : "/page-" + (index + 1)}
              onClick={() => onNavClick(index)}
            >
              <img
                src={nav}
                alt={index === 5 ? "Отчет" : `Logo ${index + 1}`}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavMenu;