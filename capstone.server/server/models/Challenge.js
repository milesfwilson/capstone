import mongoose from 'mongoose'
const Schema = mongoose.Schema

// const ObjectId = Schema.Types.ObjectId
const Challenge = new Schema(
  {
    title: { type: String, required: true },
    creatorId: { type: String, required: true },
    creatorImg: { type: String, required: false },
    creatorName: { type: String, required: false },
    participantId: { type: String, required: false },
    participantImg: { type: String, required: false },
    participantName: { type: String, required: false }
    // wager: { type: String, required: true },

  },

  { timestamps: true, toJSON: { virtuals: true } }

)

Challenge.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})

export default Challenge
