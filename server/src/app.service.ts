import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AppService {
  constructor(@InjectModel('userTestResults') private readonly UserTestSchema) {}

  // findAll() {
  //   return this.UserTestSchema.find().exec();
  // }

  allTestCount() {
    return this.UserTestSchema.aggregate([
      {
        $group: {
          _id: { name: '$name', test_type: '$test_type' },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: '$_id.name',
          test_type: '$_id.test_type',
          count: 1,
        },
      },
    ]);
  }

  getTestCountByTestType(test_type) {
    return this.UserTestSchema.aggregate([
      {
        $match: {
          test_type,
        },
      },
      {
        $group: {
          _id: '$name',
          count: { $sum: 1 },
        },
      },
    ]);
  }

  userMonthlyTestCount(name, test_type) {
    return this.UserTestSchema.aggregate([
      {
        $match: { name, test_type },
      },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          month: '$_id.month',
          year: '$_id.year',
          count: 1,
        },
      },
    ]);
  }

  userMonthlyTestData(name, test_type, month) {
    return this.UserTestSchema.aggregate([
      { $match: { name, test_type, $expr: { $eq: [{ $month: '$date' }, month] } } },
      { $sort: { date: 1 } },
    ]);
  }

  saveResult(data) {
    return this.UserTestSchema.create(data);
  }
}
