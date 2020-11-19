import mongoose from 'mongoose'
const Schema = mongoose.Schema

// const ObjectId = Schema.Types.ObjectId
const Challenge = new Schema(
  {
    title: { type: String, required: true },
  },

  { timestamps: true, toJSON: { virtuals: true } }

)

// Challenge.virtual('creator', {
//   localField: 'creatorId',
//   ref: 'Profile',
//   foreignField: '_id',
//   justOne: true
// })

export default Challenge
