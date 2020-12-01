import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ObjectId = Schema.Types.ObjectId
const Goal = new Schema(
  {
    creatorId: { type: String, required: true },
    challengeId: { type: ObjectId, ref: 'Challenge', required: false },
    title: { type: String, required: true },
    category: { type: String, required: true, default: 'other' },
    counter: { type: Number, default: 1, required: true },
    progress: { type: Number, default: 0, required: true },
    completed: { type: Boolean, default: false },
    participantId: { type: String, required: false },
    startDate: { type: Date, required: true },

    endDate: { type: Date, required: true },
    lastDate: {},

    timeFrame: { type: String, required: false }

  },

  { timestamps: true, toJSON: { virtuals: true } }

)

Goal.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})

export default Goal
