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
      setTimeout(this.getGoals, 1000)
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

  async renewChallenge(body, goals) {
    try {
      goals.forEach(goal => {
        api.put('/api/goals/' + goal.id, body)
        logger.log(goal.endDate)
      })
      setTimeout(this.getGoals, 250)
    } catch (error) {
      logger.error(error)
    }
  }

  async updateGoal() {
    try {
      const now = await DateTime.local()
      AppState.goals.forEach(async g => {
        const skippedDays = (now.diff(DateTime.fromISO(g.startDate), 'days'))
        const skippedWeeks = (now.diff(DateTime.fromISO(g.startDate), 'weeks'))
        const skippedMonths = (now.diff(DateTime.fromISO(g.startDate), 'months'))
        const skippedYears = (now.diff(DateTime.fromISO(g.startDate), 'years'))

        if (DateTime.fromISO(g.startDate) < now && g.timeFrame === 'day' && DateTime.fromISO(g.endDate) > now && g.creatorId === AppState.profile.id && g.recurring) {
          if (g.progress === g.counter) {
            await api.put('/api/goals/' + g._id, { progress: 0, completed: false, startDate: DateTime.fromISO(g.startDate).plus({ day: 1 }) })
            await api.put('/profile/' + g.creatorId + '/completed?completed=1')
          } else {
            await api.put('/api/goals/' + g._id, { progress: 0, completed: false, startDate: DateTime.fromISO(g.startDate).plus({ day: Math.floor(skippedDays.values.days) }) })
            await api.put('/profile/' + g.creatorId + `/failures?failures=${Math.floor(skippedDays.values.days)}`)
          }
        } else if (DateTime.fromISO(g.startDate) < now && g.timeFrame === 'week' && DateTime.fromISO(g.endDate) > now && g.creatorId === AppState.profile.id && g.recurring) {
          if (g.progress === g.counter) {
            await api.put('/api/goals/' + g._id, { progress: 0, completed: false, startDate: DateTime.fromISO(g.startDate).plus({ week: 1 }) })
            await api.put('/profile/' + g.creatorId + '/completed?completed=1')
          } else {
            await api.put('/api/goals/' + g._id, { progress: 0, completed: false, startDate: DateTime.fromISO(g.startDate).plus({ week: Math.floor(skippedWeeks.values.weeks) }) })
            await api.put('/profile/' + g.creatorId + `/failures?failures=${Math.floor(skippedWeeks.values.weeks)}`)
          }
        } else if (DateTime.fromISO(g.startDate) < now && g.timeFrame === 'month' && DateTime.fromISO(g.endDate) > now && g.creatorId === AppState.profile.id && g.recurring) {
          if (g.progress === g.counter) {
            await api.put('/api/goals/' + g._id, { progress: 0, completed: false, startDate: DateTime.fromISO(g.startDate).plus({ month: 1 }) })
            await api.put('/profile/' + g.creatorId + '/completed?completed=1')
          } else {
            await api.put('/api/goals/' + g._id, { progress: 0, completed: false, startDate: DateTime.fromISO(g.startDate).plus({ month: Math.floor(skippedMonths.values.months) }) })
            await api.put('/profile/' + g.creatorId + `/failures?failures=${Math.floor(skippedMonths.values.months)}`)
          }
        } else if (DateTime.fromISO(g.startDate) < now && g.timeFrame === 'year' && DateTime.fromISO(g.endDate) > now && g.creatorId === AppState.profile.id && g.recurring) {
          if (g.progress === g.counter) {
            await api.put('/api/goals/' + g._id, { progress: 0, completed: false, startDate: DateTime.fromISO(g.startDate).plus({ year: 1 }) })
            await api.put('/profile/' + g.creatorId + '/completed?completed=1')
          } else {
            await api.put('/api/goals/' + g._id, { progress: 0, completed: false, startDate: DateTime.fromISO(g.startDate).plus({ year: Math.floor(skippedYears.values.years) }) })
            await api.put('/profile/' + g.creatorId + `/failures?failures=${Math.floor(skippedYears.values.years)}`)
          }
        }
      })
      setTimeout(this.getGoals, 1000)
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
