import { useState } from 'react';
import ChartComponent from './ChartComponent';
import data from './data.json';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfYear, endOfYear, addDays, addMonths} from 'date-fns';
import { ru } from 'date-fns/locale';
import PeriodButtons from './PeriondButtons';
import SummaryCard from './SummaryCard';
import SummaryButtons from './SummaryButtons';
import revenueIcon from '../assets/logos/revenue.svg';
import expansesIcon from '../assets/logos/expanses.svg';
import incomeIcon from '../assets/logos/income.svg';
import debtIcon from '../assets/logos/debt.svg';
import totalIcon from '../assets/logos/total.svg';

export const formatNumber = (number: number) => {
  return number.toLocaleString('ru-RU');
}

const MainContent = () => {
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<'month' | 'week' | 'year'>('month');

  const calculateTotal = (division: string | null) => {
    const filteredData = division === 'Итоги' ? data.allData : data.allData.filter(item => item.division === division);
    return filteredData.reduce((total: number, item) => total + parseInt(item.amount, 10), 0);
  };

  const totalB2B = calculateTotal('B2B');
  const totalB2C = calculateTotal('B2C');
  const totalAll = calculateTotal('Итоги');

  const filterData = (division: string | null) => {
    if (division === 'Итоги') {
      return data.allData;
    }
    return data.allData.filter(item => item.division === division);
  };

  const getLabels = (period: 'month' | 'week' | 'year') => {
    const now = new Date();
    let startDate: Date;
    let endDate: Date;
    let step: (date: Date) => Date;
    let formatString: string;

    if (period === 'month') {
      startDate = startOfMonth(now);
      endDate = endOfMonth(now);
      step = (date) => addDays(date, 1);
      formatString = 'd';
    } else if (period === 'week') {
      startDate = startOfWeek(now);
      endDate = endOfWeek(now);
      step = (date) => addDays(date, 1);
      formatString = 'EEE';
    } else {
      startDate = startOfYear(now);
      endDate = endOfYear(now);
      step = (date) => addMonths(date, 1);
      formatString = 'MMM';
    }

    const labels = [];
    let currentDate = startDate;
    while (currentDate <= endDate) {
      labels.push(format(currentDate, formatString, { locale: ru }));
      currentDate = step(currentDate);
    }

    return labels;
  };

  const getChartData = (division: string | null, period: 'month' | 'week' | 'year') => {
    const filteredData = filterData(division);
    const labels = getLabels(period);

    const types = ['revenue', 'expanses', 'income', 'debt'];
    const datasets = types.map(type => {
      const aggregatedData: { [key: string]: number } = {};
      filteredData.forEach(item => {
        if (item.type === type) {
          const date = new Date(item.date);
          let key: string;

          if (period === 'month') {
            key = format(date, 'd');
          } else if (period === 'week') {
            key = format(date, 'EEE', { locale: ru });
          } else {
            key = format(date, 'MMM', { locale: ru });
          }

          if (!aggregatedData[key]) {
            aggregatedData[key] = 0;
          }
          aggregatedData[key] += parseInt(item.amount, 10);
        }
      });

      const values = labels.map(label => aggregatedData[label] || 0);

      return {
        label: type === 'revenue' ? 'Выручка' : type === 'expanses' ? 'Затраты' : type === 'income' ? 'Прибыль' : type === 'debt' ? 'Задолженность' : 'Итог',
        data: values,
        fill: false,
        backgroundColor: getColor(type),
        borderColor: getColor(type),
        tension: 0.4, 
      };
    });


    const totalValues = labels.map((label, index) => {
      return datasets.reduce((sum, dataset) => sum + dataset.data[index], 0);
    });

    datasets.push({
      label: 'Итог',
      data: totalValues,
      fill: false,
      backgroundColor: getColor('total'),
      borderColor: getColor('total'),
      tension: 0.4, 
    });

    return {
      labels,
      datasets,
    };
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'revenue':
        return 'rgba(52, 201, 36, 1)';
      case 'expanses':
        return 'rgba(119, 221, 231, 1)';
      case 'income':
        return 'rgba(54, 162, 235, 1)';
      case 'debt':
        return 'rgba(255, 206, 86, 1)';
      case 'total':
        return 'rgba(153, 102, 255, 1)';
      default:
        return 'rgba(0, 0, 0, 1)';
    }
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        display: false, 
      },
      x: {
        ticks: {
          font: {
            family: 'var(--font-family)',
            size: 14,
            weight: '600',
          },
          color: '#d2d1d1',
          align: 'center',
        },
      },
    },
    plugins: {
      legend: {
        display: false, 
      },
      title: {
        display: false, 
      },
    },
  };
  interface SummaryItem {
    label: string;
    total: number;
    icon: string;
  }
  const getSummaryData = (division: string | null, period: 'month' | 'week' | 'year'): SummaryItem[] => {
    const filteredData = filterData(division);
    const types = ['revenue', 'expanses', 'income', 'debt'];
    const summary: SummaryItem[] = types.map(type => {
      const total = filteredData
        .filter(item => item.type === type)
        .reduce((sum, item) => sum + parseInt(item.amount, 10), 0);
      let label = '';
      switch (type) {
        case 'revenue':
          label = 'Выручка';
          break;
        case 'expanses':
          label = 'Затраты';
          break;
        case 'income':
          label = 'Прибыль';
          break;
        case 'debt':
          label = 'Задолженность';
          break;
        default:
          label = 'Итог';
      }
      let icon = '';
      switch (type) {
        case 'revenue':
          icon = revenueIcon;
          break;
        case 'expanses':
          icon = expansesIcon;
          break;
        case 'income':
          icon = incomeIcon;
          break;
        case 'debt':
          icon = debtIcon;
          break;
        case 'total':
          icon = totalIcon;
      }

      return {
        label,
        total,
        icon, 
      };
    });
  
    // Добавляем итог
    const total = summary.reduce((sum, item) => sum + item.total, 0);
    summary.push({
      label: 'Итог',
      total,
      icon: totalIcon,
    });
  
    return summary;
  };
  
  const summaryData = getSummaryData(selectedDivision, selectedPeriod);

  return (
    <div className="main-content">
      <div className="header">
        <h2 className="content-title">Сводный отчет</h2>
      </div>
      <SummaryButtons
        totalAll={totalAll}
        totalB2B={totalB2B}
        totalB2C={totalB2C}
        setSelectedDivision={setSelectedDivision}
      />
      <div className="statistics-container">
        <div className="statistics-header">
          <h3 className="statistics-title">Общая статистика</h3>
          <PeriodButtons selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} />
        </div>
        <div className="chart-container">
          <ChartComponent data={getChartData(selectedDivision, selectedPeriod)} options={options} />
          </div>
        <div className="summary-cards">
          {summaryData.map((item, index) => (
            <SummaryCard key={index} label={item.label} total={item.total} icon={item.icon} formatNumber={formatNumber} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainContent;