import React from 'react';
interface PeriodButtonsProps {
  selectedPeriod: 'month' | 'week' | 'year';
  setSelectedPeriod: (period: 'month' | 'week' | 'year') => void;
}

const PeriodButtons: React.FC<PeriodButtonsProps> = ({ selectedPeriod, setSelectedPeriod }) => {
  return (
    <div className="period-buttons__container">
      <button
        className={`period-button ${selectedPeriod === 'month' ? 'period-button--selected' : ''}`}
        onClick={() => setSelectedPeriod('month')}
      >
        Месяц
      </button>
      <button
        className={`period-button ${selectedPeriod === 'week' ? 'period-button--selected' : ''}`}
        onClick={() => setSelectedPeriod('week')}
      >
        Неделя
      </button>
      <button
        className={`period-button ${selectedPeriod === 'year' ? 'period-button--selected' : ''}`}
        onClick={() => setSelectedPeriod('year')}
      >
        Год
      </button>
    </div>
  );
};

export default PeriodButtons;