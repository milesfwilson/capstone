import mongoose from 'mongoose'
import ValueSchema from '../models/Value'
import ProfileSchema from '../models/Profile'
import ChallengeSchema from '../models/Challenge'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Profile = mongoose.model('Profile', ProfileSchema);
  Challenges = mongoose.model('Challenge', ChallengeSchema)
}

export const dbContext = new DbContext()
