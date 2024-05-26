const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  test_type: {
    type: String,
    enum: ['blood-pressure-level', 'blood-sugar-level'],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  result: {
    type: Number,
    required: true,
  },
});

const testResults = mongoose.model('userTestResults', Schema);

const johnBpLevel = [
  {
    result: 120,
    date: '2024-04-01',
    name: 'john',
    test_type: 'blood-pressure-level',
  },
  {
    result: 50,
    date: '2024-04-14',
    name: 'john',
    test_type: 'blood-pressure-level',
  },
  {
    result: 70,
    date: '2024-04-15',
    name: 'john',
    test_type: 'blood-pressure-level',
  },
  {
    result: 130,
    date: '2024-04-16',
    name: 'john',
    test_type: 'blood-pressure-level',
  },
  {
    result: 114,
    date: '2024-04-20',
    name: 'john',
    test_type: 'blood-pressure-level',
  },
  {
    result: 100,
    date: '2024-04-22',
    name: 'john',
    test_type: 'blood-pressure-level',
  },
  {
    result: 110,
    date: '2024-04-23',
    name: 'john',
    test_type: 'blood-pressure-level',
  },
  {
    result: 170,
    date: '2024-04-24',
    name: 'john',
    test_type: 'blood-pressure-level',
  },
  {
    result: 200,
    date: '2024-04-05',
    name: 'john',
    test_type: 'blood-pressure-level',
  },
  {
    result: 124,
    date: '2024-05-10',
    name: 'john',
    test_type: 'blood-pressure-level',
  },
  {
    result: 53,
    date: '2024-05-14',
    name: 'john',
    test_type: 'blood-pressure-level',
  },
  {
    result: 77,
    date: '2024-05-09',
    name: 'john',
    test_type: 'blood-pressure-level',
  },
  {
    result: 120,
    date: '2024-05-16',
    name: 'john',
    test_type: 'blood-pressure-level',
  },
  {
    result: 184,
    date: '2024-05-19',
    name: 'john',
    test_type: 'blood-pressure-level',
  },
  {
    result: 100,
    date: '2024-05-28',
    name: 'john',
    test_type: 'blood-pressure-level',
  },
  {
    result: 10,
    date: '2024-05-21',
    name: 'john',
    test_type: 'blood-pressure-level',
  },
  {
    result: 170,
    date: '2024-05-25',
    name: 'john',
    test_type: 'blood-pressure-level',
  },
  {
    result: 200,
    date: '2024-05-05',
    name: 'john',
    test_type: 'blood-pressure-level',
  },
];

const johnSugarLevel = [
  {
    result: 120,
    date: '2024-04-01',
    name: 'john',
    test_type: 'blood-sugar-level',
  },
  {
    result: 50,
    date: '2024-04-14',
    name: 'john',
    test_type: 'blood-sugar-level',
  },
  {
    result: 70,
    date: '2024-04-15',
    name: 'john',
    test_type: 'blood-sugar-level',
  },
  {
    result: 130,
    date: '2024-04-16',
    name: 'john',
    test_type: 'blood-sugar-level',
  },
  {
    result: 114,
    date: '2024-04-20',
    name: 'john',
    test_type: 'blood-sugar-level',
  },
  {
    result: 101,
    date: '2024-04-22',
    name: 'john',
    test_type: 'blood-sugar-level',
  },
  {
    result: 110,
    date: '2024-04-23',
    name: 'john',
    test_type: 'blood-sugar-level',
  },
  {
    result: 95,
    date: '2024-04-24',
    name: 'john',
    test_type: 'blood-sugar-level',
  },
  {
    result: 200,
    date: '2024-04-05',
    name: 'john',
    test_type: 'blood-sugar-level',
  },
  {
    result: 54,
    date: '2024-05-10',
    name: 'john',
    test_type: 'blood-sugar-level',
  },
  {
    result: 85,
    date: '2024-05-14',
    name: 'john',
    test_type: 'blood-sugar-level',
  },
  {
    result: 77,
    date: '2024-05-09',
    name: 'john',
    test_type: 'blood-sugar-level',
  },
  {
    result: 92,
    date: '2024-05-16',
    name: 'john',
    test_type: 'blood-sugar-level',
  },
  {
    result: 184,
    date: '2024-05-19',
    name: 'john',
    test_type: 'blood-sugar-level',
  },
  {
    result: 100,
    date: '2024-05-28',
    name: 'john',
    test_type: 'blood-sugar-level',
  },
  {
    result: 10,
    date: '2024-05-21',
    name: 'john',
    test_type: 'blood-sugar-level',
  },
  {
    result: 170,
    date: '2024-05-25',
    name: 'john',
    test_type: 'blood-sugar-level',
  },
  {
    result: 200,
    date: '2024-05-05',
    name: 'john',
    test_type: 'blood-sugar-level',
  },
];

async function createMany() {
  await mongoose.connect('mongodb://127.0.0.1:27017/biomarker');

  const adamSugarLevel = johnSugarLevel.map((data) => {
    let adam = { ...data };
    adam.name = 'adam';
    return adam;
  });

  const adamBpLevel = johnBpLevel.map((data) => {
    let adam = { ...data };
    adam.name = 'adam';
    return adam;
  });

  const data = [...johnBpLevel, ...johnSugarLevel, ...adamSugarLevel, ...adamBpLevel];

  const results = await testResults.insertMany(data);
  return results;
}

createMany()
  .then((r) => console.log(r))
  .catch((err) => console.log(err))
  .finally(() => process.exit());
