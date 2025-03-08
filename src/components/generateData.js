import { writeFile } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const divisions = ['B2B', 'B2C'];
const types = ['expanses', 'income', 'revenue', 'debt'];

const generateRandomData = () => {
  const data = [];
  const startDate = new Date('2023-01-01T00:00:00.000Z');
  const endDate = new Date('2023-12-31T00:00:00.000Z');

  for (let i = 0; i < 100; i++) {
    const division = divisions[Math.floor(Math.random() * divisions.length)];
    const date = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    const amount = Math.floor(Math.random() * 200001) - 100000;
    const type = types[Math.floor(Math.random() * types.length)];

    data.push({
      division,
      date: date.toISOString(),
      amount: amount.toString(),
      type,
    });
  }

  return data;
};

const allData = generateRandomData(); 

const data = {
  allData, 
};

const jsonData = JSON.stringify(data, null, 2);
const filePath = `${__dirname}/data.json`;

writeFile(filePath, jsonData, (err) => {
  if (err) {
    console.error('Ошибка генерации данных', err);
  } else {
    console.log('Данные сгенерированы в data.json');
  }
});