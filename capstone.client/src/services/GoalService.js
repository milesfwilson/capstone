import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class GoalService {
  async getGoals() {
    try {
      const res = await api.get('/goals')
      AppState.goals = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async createGoal(newGoal) {
    try {
      // const res = await api.post('/goals', newGoal)
      // AppState.goals = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteGoal(goalId) {
    try {
      await api.delete('/goals/' + goalId)
      this.getGoals()
    } catch (error) {
      logger.error(error)
    }
  }

  async editGoal(goalId, body) {
    try {
      const res = await api.put('/goals' + goalId, body)
      AppState.goals = res.data
    } catch (error) {
      logger.error(error)
    }
  }
}

export const goalService = new GoalService()
