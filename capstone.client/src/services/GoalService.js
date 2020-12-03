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
      AppState.myGoals = res.data.filter(i => (AppState.profile.id === i.creatorId))
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

      if (newGoal.timeFrame) {
        newGoal.recurring = true
      }

      const res = await api.post('/api/goals', newGoal)
      AppState.goals = res.data
      this.getGoals()
      AppState.activeChallenge = {}
      router.push({ name: 'Home' })
      AppState.reveal = false
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

  // async updateGoal() {
  //   try {
  //     const res = await api.put('/api/goals')
  //     AppState.goals = res.data
  //   } catch (error) {
  //     logger.error(error)
  //   }
  // }

  // DO NOT ERASE THIS FUNCTION !!!!!!!

  async updateGoal() {
    try {
      const now = await DateTime.local()
      AppState.goals.forEach(async g => {
        if (DateTime.fromISO(g.startDate) < now && g.timeFrame === 'day' && DateTime.fromISO(g.endDate) > now && g.creatorId === AppState.profile.id && g.recurring) {
          if (g.progress === g.counter) {
            await api.put('/api/goals/' + g._id, { progress: 0, completed: false, startDate: DateTime.fromISO(g.startDate).plus({ day: 1 }) })
            await api.put('/profile/' + g.creatorId + '/completed?completed=1')
          } else {
            await api.put('/api/goals/' + g._id, { progress: 0, completed: false, startDate: DateTime.fromISO(g.startDate).plus({ day: 1 }) })
            await api.put('/profile/' + g.creatorId + '/failures?failures=1')
          }
        } else if (DateTime.fromISO(g.startDate) < now && g.timeFrame === 'week' && DateTime.fromISO(g.endDate) > now && g.creatorId === AppState.profile.id && g.recurring) {
          if (g.progress === g.counter) {
            await api.put('/api/goals/' + g._id, { progress: 0, completed: false, startDate: DateTime.fromISO(g.startDate).plus({ week: 1 }) })
            await api.put('/profile/' + g.creatorId + '/completed?completed=1')
          } else {
            await api.put('/api/goals/' + g._id, { progress: 0, completed: false, startDate: DateTime.fromISO(g.startDate).plus({ week: 1 }) })
            await api.put('/profile/' + g.creatorId + '/failures?failures=1')
          }
        } else if (DateTime.fromISO(g.startDate) < now && g.timeFrame === 'month' && DateTime.fromISO(g.endDate) > now && g.creatorId === AppState.profile.id && g.recurring) {
          if (g.progress === g.counter) {
            await api.put('/api/goals/' + g._id, { progress: 0, completed: false, startDate: DateTime.fromISO(g.startDate).plus({ month: 1 }) })
            await api.put('/profile/' + g.creatorId + '/completed?completed=1')
          } else {
            await api.put('/api/goals/' + g._id, { progress: 0, completed: false, startDate: DateTime.fromISO(g.startDate).plus({ month: 1 }) })
            await api.put('/profile/' + g.creatorId + '/failures?failures=1')
          }
        } else if (DateTime.fromISO(g.startDate) < now && g.timeFrame === 'year' && DateTime.fromISO(g.endDate) > now && g.creatorId === AppState.profile.id && g.recurring) {
          if (g.progress === g.counter) {
            await api.put('/api/goals/' + g._id, { progress: 0, completed: false, startDate: DateTime.fromISO(g.startDate).plus({ year: 1 }) })
            await api.put('/profile/' + g.creatorId + '/completed?completed=1')
          } else {
            await api.put('/api/goals/' + g._id, { progress: 0, completed: false, startDate: DateTime.fromISO(g.startDate).plus({ year: 1 }) })
            await api.put('/profile/' + g.creatorId + '/failures?failures=1')
          }
        }
      })

      setTimeout(this.getGoals, 125)

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
