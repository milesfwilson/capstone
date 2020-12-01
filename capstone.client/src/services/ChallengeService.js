import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { goalService } from './GoalService'

class ChallengeService {
  async getChallenges() {
    try {
      const res = await api.get('/api/challenges')
      AppState.challenges = res.data
      this.pendingChallenge()
      this.challengeCheck()
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

  async reveal(value) {
    try {
      AppState.reveal = value
    } catch (error) {
      logger.error(error)
    }
  }

  async challenge(value) {
    try {
      AppState.newGoal.challenge = value
    } catch (error) {
      logger.error(error)
    }
  }

  async createChallenge(newChallenge) {
    try {
      // @ts-ignore
      newChallenge.participantId = AppState.activeChallenger.id

      // @ts-ignore
      newChallenge.participantImg = AppState.activeChallenger.picture
      // @ts-ignore
      newChallenge.participantName = AppState.activeChallenger.name

      // @ts-ignore
      newChallenge.creatorImg = AppState.profile.picture
      // @ts-ignore
      newChallenge.creatorName = AppState.profile.name
      const res = await api.post('/api/challenges', newChallenge)
      logger.log(res.data)
      AppState.activeChallenge = res.data
      AppState.activeChallenger = {}
      this.reveal(true)
      this.challenge(false)
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
      this.getChallenges()
    } catch (error) {
      logger.error(error)
    }
  }

  async pendingChallenge() {
    try {
      AppState.pending = AppState.challenges.filter(challenge =>
        ((challenge.accepted === false) && (challenge.participantId === AppState.profile.id) && (challenge.rejected === false))
      )
    } catch (error) {
      logger.error(error)
    }
  }

  async challengeCheck() {
    try {
      AppState.checkedChallenges = AppState.challenges.filter(challenge => ((challenge.accepted === false) && (challenge.participantId === AppState.profile.id || challenge.creatorId === AppState.profile.id) && (challenge.rejected === false)))
      AppState.checkedChallenges = AppState.checkedChallenges.filter(challenge => (AppState.goals.filter(goal => (goal.challengeId === challenge.id))))
      logger.log(AppState.checkedChallenges)
    } catch (error) {
      logger.error(error)
    }
  }

  // async acceptChallenge(challengeId, body) {
  //   try {
  //     body.accepted = true
  //     body.rejected = false
  //     body.participantId = AppState.profile.id
  //     await api.put('/api/challenges/' + challengeId, body)
  //   } catch (error) {
  //     logger.error(error)
  //   }
  // }

  async acceptChallenge(goal, challenge) {
    try {
      const newGoal = {}
      // @ts-ignore
      newGoal.creatorId = AppState.profile.id
      newGoal.title = goal.title
      newGoal.category = goal.category
      newGoal.challengeId = goal.challengeId

      if (goal.counter) {
        newGoal.counter = goal.counter
      }

      if (goal.endDate) {
        newGoal.endDate = goal.endDate
      }

      if (goal.lastDate) {
        newGoal.lastDate = goal.lastDate
      }

      if (goal.startDate) {
        newGoal.startDate = goal.startDate
      }

      challenge.accepted = true
      challenge.rejected = false
      await api.put('/api/challenges/' + challenge.id, challenge)
      logger.log(AppState.challenges)
      await api.post('/api/goals/', newGoal)
      logger.log(AppState.goals)
      this.getChallenges()
      goalService.getGoals()
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
      this.getChallenges()
    } catch (error) {
      logger.error(error)
    }
  }

  async leaveChallenge(challengeId, body) {
    try {
      body.rejected = true
      body.accepted = false
      await api.put('/api/challenges/' + challengeId, body)
      logger.log(AppState.challenges)
      this.getChallenges()
    } catch (error) {
      logger.error(error)
    }
  }
}

export const challengeService = new ChallengeService()
