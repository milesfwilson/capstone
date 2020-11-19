import { AppState } from '../AppState'
// import { logger } from '../utils/Logger'
// import { api } from './AxiosService'

class GoalService {
  createGoal(newBug) {
    newBug.id = AppState.goals.length
    AppState.goals.push(newBug)
  }
}

export const goalService = new GoalService()
