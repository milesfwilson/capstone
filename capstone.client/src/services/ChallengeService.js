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

  async getGoalByChallengeId(id) {
    try {
      const res = await api.get('/api/challenges/' + id + '/goals')
      AppState.challengeGoal = res.data
      logger.log(res)
    } catch (error) {
      logger.error(error)
    }
  }

  async createChallenge(newChallenge) {
    try {
      // @ts-ignore
      newChallenge.participantId = AppState.activeChallenger.id

      newChallenge.participantImg = AppState.activeChallenger.picture
      newChallenge.participantName = AppState.activeChallenger.name

      newChallenge.creatorImg = AppState.profile.picture
      newChallenge.creatorName = AppState.profile.name
      const res = await api.post('/api/challenges', newChallenge)
      logger.log(res.data)
      AppState.activeChallenge = res.data
      AppState.activeChallenger = {}

      this.getChallenges()
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteChallenge(challengeId) {
    try {
      await api.delete('/api/challenges/' + challengeId)
      this.getChallenges()
      logger.log(AppState.challenges)
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

  async acceptChallenge(challengeId, body) {
    try {
      body.accepted = true
      body.rejected = false
      await api.put('/api/challenges/' + challengeId, body)
    } catch (error) {
      logger.error(error)
    }
  }

  async rejectChallenge(challengeId, body) {
    try {
      body.rejected = true
      body.accepted = false
      await api.put('/api/challenges/' + challengeId, body)
      logger.log(AppState.challenges)
    } catch (error) {
      logger.error(error)
    }
  }
}

export const challengeService = new ChallengeService()
