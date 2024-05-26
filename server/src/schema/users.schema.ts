import * as mongoose from 'mongoose';

export const UserTestSchema = new mongoose.Schema({
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
