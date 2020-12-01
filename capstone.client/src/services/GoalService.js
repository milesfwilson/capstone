import router from '../router'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { DateTime } from 'luxon'

class GoalService {
  async getGoals() {
    try {
      const res = await api.get('/api/goals')
      AppState.goals = res.data
      logger.log(AppState.goals)
    } catch (error) {
      logger.error(error)
    }
  }

  async createGoal(newGoal) {
    try {
      // @ts-ignore
      if (AppState.activeChallenge.id) {
        // @ts-ignore
        newGoal.challengeId = AppState.activeChallenge.id
        // @ts-ignore
        newGoal.participantId = AppState.activeChallenge.participantId
      }
      const res = await api.post('/api/goals', newGoal)
      AppState.goals = res.data
      this.getGoals()
      AppState.activeChallenge = {}
      router.push({ name: 'Home' })
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteGoal(goalId) {
    try {
      await api.delete('/api/goals/' + goalId)
      this.getGoals()
    } catch (error) {
      logger.error(error)
    }
  }

  async crossOffGoal(id, editedGoal) {
    try {
      editedGoal.completed = !editedGoal.completed

      if (editedGoal.completed && editedGoal.counter) {
        editedGoal.progress = editedGoal.counter
      } else if (!editedGoal.completed && editedGoal.counter) {
        editedGoal.progress = 0
      }

      await api.put('/api/goals/' + id, editedGoal)
    } catch (error) {
      logger.error(error)
    }
  }

  async editGoal(goalId, body) {
    try {
      const res = await api.put('/api/goals/' + goalId, body)
      AppState.goals = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async updateGoal() {
    try {
      AppState.goals.forEach(async g => {
        const now = DateTime.local()
        if (g.endDate < now && g.timeFrame === 'daily' && g.lastDate.plus({ day: 1 }) < now) {
          if (g.progress === g.counter) {
            // await api.put('/api/profile/' + g.creatorId + '/completed?completed=1')
            await api.put('/api/goals/' + g.id, { progress: 0, lastDate: g.lastDate.plus({ day: 1 }) })
          } else {
            // await api.put('/api/profile/' + g.creatorId + '/failures?failures=1')
            await api.put('/api/goals/' + g.id, { progress: 0, lastDate: g.lastDate.plus({ day: 1 }) })
          }
        } else if (g.endDate < DateTime.local() && g.timeFrame === 'weekly' && g.lastDate.plus({ week: 1 }) < DateTime.local()) {
          if (g.progress === g.counter) {
            await api.put('/api/profile/' + g.creatorId + '/completed?completed=1')
            await api.put('/api/goals/' + g.id, { progress: 0, lastDate: g.lastDate.plus({ week: 1 }) })
          } else {
            await api.put('/api/profile/' + g.creatorId + '/failures?failures=1')
            await api.put('/api/goals/' + g.id, { progress: 0, lastDate: g.lastDate.plus({ week: 1 }) })
          }
        } else if (g.endDate < DateTime.local() && g.timeFrame === 'monthly' && g.lastDate.plus({ month: 1 }) < DateTime.local()) {
          if (g.progress === g.counter) {
            await api.put('/api/profile/' + g.creatorId + '/completed?completed=1')
            await api.put('/api/goals/' + g.id, { progress: 0, lastDate: g.lastDate.plus({ month: 1 }) })
          } else {
            await api.put('/api/profile/' + g.creatorId + '/failures?failures=1')
            await api.put('/api/goals/' + g.id, { progress: 0, lastDate: g.lastDate.plus({ month: 1 }) })
          }
        } else if (g.endDate < DateTime.local() && g.timeFrame === 'yearly' && g.lastDate.plus({ year: 1 }) < DateTime.local()) {
          if (g.progress === g.counter) {
            await api.put('/api/profile/' + g.creatorId + '/completed?completed=1')
            await api.put('/api/goals/' + g.id, { progress: 0, lastDate: g.lastDate.plus({ year: 1 }) })
          } else {
            await api.put('/api/profile/' + g.creatorId + '/failures?failures=1')
            await api.put('/api/goals/' + g.id, { progress: 0, lastDate: g.lastDate.plus({ year: 1 }) })
          }
        }
        this.getGoals()
      }

      )

      // const res = await api.put('/api/goals/' + goalId, body)
      // AppState.goals = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async increment(id, goal) {
    try {
      if (goal.progress < goal.counter) {
        goal.progress += 1
        if (goal.progress === goal.counter) {
          goal.completed = true
        }
        await api.put('/api/goals/' + id, goal)
      }
    } catch (error) {
      logger.error(error)
    }
  }

  async decrement(id, goal) {
    try {
      if (goal.progress > 0) {
        goal.progress -= 1
        if (goal.progress < goal.counter) {
          goal.completed = false
        }
        await api.put('/api/goals/' + id, goal)
      }
    } catch (error) {
      logger.error(error)
    }
  }
}

export const goalService = new GoalService()
