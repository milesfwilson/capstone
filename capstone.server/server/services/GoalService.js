import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { logger } from '../utils/Logger'

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
      return await dbContext.Goals.findByIdAndUpdate(goalId, newGoal, { new: true })
    }
  }

  // async updateGoal() {
  //   try {
  //     logger.log('first', DateTime.local())
  //     const now = await DateTime.local()

  //     // AppState.goals.forEach(async g => {
  //     //   logger.log('secondlog', DateTime.fromISO(g.endDate), g)
  //     //   if (DateTime.fromISO(g.lastDate) < now && g.timeFrame === 'daily' && DateTime.fromISO(g.endDate) > now) {
  //     //     if (g.progress === g.counter) {
  //     //       await dbContext.('/api/profile/' + g.creatorId + '/completed?completed=1')
  //     //       await api.put('/api/goals/' + g._id, { progress: 0, lastDate: DateTime.fromISO(g.lastDate).plus({ minute: 5 }) })
  //     //     } else {
  //     //       // await api.put('/api/profile/' + g.creatorId + '/failures?failures=1')
  //     //       await api.put('/api/goals/' + g._id, { progress: 0, lastDate: g.lastDate.plus({ minute: 5 }) })
  //     //     }
  //     //   } else if (g.endDate < DateTime.local() && g.timeFrame === 'weekly' && g.lastDate.plus({ week: 1 }) < DateTime.local()) {
  //     //     if (g.progress === g.counter) {
  //     //       await api.put('/api/profile/' + g.creatorId + '/completed?completed=1')
  //     //       await api.put('/api/goals/' + g.id, { progress: 0, lastDate: g.lastDate.plus({ week: 1 }) })
  //     //     } else {
  //     //       await api.put('/api/profile/' + g.creatorId + '/failures?failures=1')
  //     //       await api.put('/api/goals/' + g.id, { progress: 0, lastDate: g.lastDate.plus({ week: 1 }) })
  //     //     }
  //     //   } else if (g.endDate < DateTime.local() && g.timeFrame === 'monthly' && g.lastDate.plus({ month: 1 }) < DateTime.local()) {
  //     //     if (g.progress === g.counter) {
  //     //       await api.put('/api/profile/' + g.creatorId + '/completed?completed=1')
  //     //       await api.put('/api/goals/' + g.id, { progress: 0, lastDate: g.lastDate.plus({ month: 1 }) })
  //     //     } else {
  //     //       await api.put('/api/profile/' + g.creatorId + '/failures?failures=1')
  //     //       await api.put('/api/goals/' + g.id, { progress: 0, lastDate: g.lastDate.plus({ month: 1 }) })
  //     //     }
  //     //   } else if (g.endDate < DateTime.local() && g.timeFrame === 'yearly' && g.lastDate.plus({ year: 1 }) < DateTime.local()) {
  //     //     if (g.progress === g.counter) {
  //     //       await api.put('/api/profile/' + g.creatorId + '/completed?completed=1')
  //     //       await api.put('/api/goals/' + g.id, { progress: 0, lastDate: g.lastDate.plus({ year: 1 }) })
  //     //     } else {
  //     //       await api.put('/api/profile/' + g.creatorId + '/failures?failures=1')
  //     //       await api.put('/api/goals/' + g.id, { progress: 0, lastDate: g.lastDate.plus({ year: 1 }) })
  //     //     }
  //     //   }
  //     // },

  //     )

  //     // const res = await api.put('/api/goals/' + goalId, body)
  //     // AppState.goals = res.data
  //   } catch (error) {
  //     logger.error(error)
  //   }
  // }
}

export const goalService = new GoalService()
