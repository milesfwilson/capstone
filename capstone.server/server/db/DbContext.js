import mongoose from 'mongoose'
import ValueSchema from '../models/Value'
import ProfileSchema from '../models/Profile'
import ChallengeSchema from '../models/Challenge'
import GoalSchema from '../models/Goal'
import PlayerSchema from '../models/Player'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Profile = mongoose.model('Profile', ProfileSchema);
  Challenges = mongoose.model('Challenge', ChallengeSchema);
  Goals = mongoose.model('Goal', GoalSchema)
  Player = mongoose.model('Player', PlayerSchema)
}

export const dbContext = new DbContext()
