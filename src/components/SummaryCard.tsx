import React from 'react';

interface SummaryCardProps {
  label: string;
  total: number;
  icon: string;
  formatNumber: (number: number) => string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ label, total, icon, formatNumber }) => {
  return (
    <div className="summary-card">
      <div className="summary-card__icon">
        <img src={icon} alt={label} />
      </div>
      <div className="summary-card__content">
        <p className="summary-card__label">{label}</p>
        <p className="summary-card__total"> ₽ {formatNumber(total)}</p>
      </div>
    </div>
  );
};

export default SummaryCard;