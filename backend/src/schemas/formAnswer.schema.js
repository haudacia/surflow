import { Schema } from 'mongoose';
import { QuestionSchema } from './question.schema';

exports.FormAnswerSchema = new Schema({
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  type: {
    type: String, required: true, validate: (v) => {
      return Object.keys(QuestionSchema._applyDiscriminators).includes(v)
    }
  },
  answer: String,
});
