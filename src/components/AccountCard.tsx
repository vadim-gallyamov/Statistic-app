import React from 'react';

interface AccountCardProps {
  logoSrc: string;
  nickname: string;
  position: string;
}

const AccountCard: React.FC<AccountCardProps> = ({ logoSrc, nickname, position }) => {
  return (
    <div className="account-card">
      <img src={logoSrc} alt="Account Logo" className="account-card__logo" />
      <div className="account-card__info">
        <div className="account-card__nickname">{nickname}</div>
        <div className="account-card__position">{position}</div>
      </div>
      <div className="account-card__arrow-down">
        <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.65465 5.43305C6.27888 5.75848 5.72112 5.75848 5.34535 5.43305L1.09937 1.75593C0.399465 1.14979 0.828138 -1.15152e-06 1.75402 -1.07058e-06L10.246 -3.28187e-07C11.1719 -2.47243e-07 11.6005 1.14979 10.9006 1.75593L6.65465 5.43305Z" fill="#B6BCC3" />
        </svg>
      </div>
    </div>
  );
};

export default AccountCard;