import React from 'react';
import { formatNumber } from './MainContent';

interface SummaryButtonsProps {
  totalAll: number;
  totalB2B: number;
  totalB2C: number;
  setSelectedDivision: (division: string | null) => void;
}

const SummaryButtons: React.FC<SummaryButtonsProps> = ({
  totalAll,
  totalB2B,
  totalB2C,
  setSelectedDivision,
}) => {
  return (
    <div className="summary-blocks">
      <div className="summary-block--total" onClick={() => setSelectedDivision('Итоги')}>
        {(() => {
          const percentage = (Math.random() * 201) - 100;
          const isPositive = percentage >= 0;
          const arrow = isPositive ? '🡡' : '🡣';
          return (
            <div
              className={`summary-block__percentage ${
                isPositive
                  ? 'summary-block__percentage--total-positive'
                  : 'summary-block__percentage--negative'
              }`}
            >
              <span className="summary-block__percentage-arrow">{arrow}</span>{' '}
              {Math.abs(percentage).toFixed(2)}%
            </div>
          );
        })()}
        <p className="summary-block--total__amount">₽ {formatNumber(totalAll)}</p>
        <p className="summary-block__text">Итоги</p>
      </div>
      <div className="summary-block--B2B" onClick={() => setSelectedDivision('B2B')}>
        {(() => {
          const percentage = (Math.random() * 201) - 100;
          const isPositive = percentage >= 0;
          const arrow = isPositive ? '🡡' : '🡣';
          return (
            <div
              className={`summary-block__percentage ${
                isPositive
                  ? 'summary-block__percentage--positive'
                  : 'summary-block__percentage--negative'
              }`}
            >
              <span className="summary-block__percentage-arrow">{arrow}</span>{' '}
              {Math.abs(percentage).toFixed(2)}%
            </div>
          );
        })()}
        <p className="summary-block__total">₽ {formatNumber(totalB2B)}</p>
        <p className="summary-block__label">B2B</p>
      </div>
      <div className="summary-block--B2C" onClick={() => setSelectedDivision('B2C')}>
        {(() => {
          const percentage = (Math.random() * 201) - 100;
          const isPositive = percentage >= 0;
          const arrow = isPositive ? '🡡' : '🡣';
          return (
            <div
              className={`summary-block__percentage ${
                isPositive
                  ? 'summary-block__percentage--positive'
                  : 'summary-block__percentage--negative'
              }`}
            >
              <span className="summary-block__percentage-arrow">{arrow}</span>{' '}
              {Math.abs(percentage).toFixed(2)}%
            </div>
          );
        })()}
        <p className="summary-block__total">₽ {formatNumber(totalB2C)}</p>
        <p className="summary-block__label">B2C</p>
      </div>
    </div>
  );
};

export default SummaryButtons;