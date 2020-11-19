import mongoose from 'mongoose'
import ValueSchema from '../models/Value'
import ProfileSchema from '../models/Profile'
import ChallengeSchema from '../models/Challenge'
import GoalSchema from '../models/Goal'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Profile = mongoose.model('Profile', ProfileSchema);
  Challenges = mongoose.model('Challenge', ChallengeSchema);
  Goals = mongoose.model('Goal', GoalSchema)
}

export const dbContext = new DbContext()
