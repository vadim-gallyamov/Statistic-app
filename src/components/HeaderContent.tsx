import AccountCard from './AccountCard';
import imgAcc1 from '../assets/logos/imgAcc1.png';
const HeaderContent = () => {
  return (
    <div className="header-content">
        <AccountCard
        logoSrc={imgAcc1}
        nickname="Kristina🐰"
        position="менеджер продаж"
      />
    </div>
  );
};

export default HeaderContent;