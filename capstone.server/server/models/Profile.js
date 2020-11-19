import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Profile = new Schema(
  {
    subs: [{ type: String, unique: true }],
    _id: { type: String, required: true },
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    completed: { type: Number, default: 0, required: true },
    failures: { type: Number, default: 0, required: true },
    challengesWon: { type: Number, default: 0 },
    challengesLost: { type: Number, default: 0 }
    // NOTE If you wish to add additional public properties for profiles do so here
  },
  { timestamps: true, _id: false, toJSON: { virtuals: true } }
)

export default Profile
