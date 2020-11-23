import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class GoalService {
  async getGoalsByChallengeId(id) {
    return await dbContext.Goals.findById(id)
  }

  async getAll(query = {}) {
    return await dbContext.Goals.find(query).populate('Profile')
  }

  async getActiveGoal(id) {
    return await dbContext.Goals.findById(id).populate('Profile')
  }

  async createGoal(body) {
    return await dbContext.Goals.create(body)
  }

  async deleteGoal(goalId, userId) {
    const exists = await dbContext.Goals.findById(goalId)
    if (!exists) {
      throw new BadRequest('This goal does not exist')
    // @ts-ignore
    } else if (exists._doc.creatorId === userId) {
      await dbContext.Goals.findByIdAndDelete(goalId)
    }
  }

  async editGoal(goalId, newGoal, userId) {
    const exists = await dbContext.Goals.findById(goalId)
    if (!exists) {
      throw new BadRequest('This goal does not exist')
    // @ts-ignore
    } else if (exists._doc.creatorId === userId) {
      await dbContext.Goals.findByIdAndUpdate(goalId, newGoal)
    }
  }
}

export const goalService = new GoalService()
