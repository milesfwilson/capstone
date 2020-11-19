import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Player = new Schema(
  {
    
    completed: { type: Number, default: 0, required: true },
    failures: { type: Number, default: 0, required: true },
    challengesWon: { type: Number, default: 0 },
    challengesLost: { type: Number, default: 0 }

  },

  { timestamps: true, toJSON: { virtuals: true } }

)

Player.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})

export default Player
