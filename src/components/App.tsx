import { useState } from 'react';
import '../styles/styles.css';
import NavMenu from './NavMenu';
import MainContent from './MainContent';
import HeaderContent from './HeaderContent';
import { BrowserRouter as Router } from 'react-router-dom';
import PlaceholderMainContent from './PlaceholderMainContent';

const App = () => {
  const [selectedNav, setSelectedNav] = useState<number | null>(5);

  const handleNavClick = (index: number) => {
    setSelectedNav(index);
  };

  return (
    <Router>
      <div className="container">
        <NavMenu onNavClick={handleNavClick} activeIndex={selectedNav === null ? -1 : selectedNav} />
        <HeaderContent />
        {selectedNav === 5 ? (
          <MainContent />
        ) : selectedNav !== null ? (
          <PlaceholderMainContent text={`Здесь пока ничего нет для страницы ${selectedNav + 1}`} />
        ) : null}
      </div>
    </Router>
  );
};

export default App;