import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ChallengeService {
  async getChallenges() {
    try {
      const res = await api.get('/api/challenges')
      AppState.challenges = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async createChallenge(newChallenge) {
    try {
      const res = await api.post('/api/challenges', newChallenge)
      AppState.activeChallenge = res.data
      this.getChallenges()
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteChallenge(challengeId) {
    try {
      await api.delete('/api/challenges/' + challengeId)
      this.getChallenges()
    } catch (error) {
      logger.error(error)
    }
  }

  async editChallenge(challengeId, body) {
    try {
      const res = await api.put('/api/challenges/' + challengeId, body)
      AppState.challenges = res.data
    } catch (error) {
      logger.error(error)
    }
  }
}

export const challengeService = new ChallengeService()
