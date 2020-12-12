import { DateTime } from 'luxon'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { goalService } from './GoalService'
import { profileService } from './ProfileService'
class ChallengeService {
  async getChallenges() {
    try {
      const res = await api.get('/api/challenges')
      AppState.challenges = res.data
      AppState.pending = res.data.filter(i => (AppState.profile.id === i.creatorId && !i.accepted && !i.rejected))
      logger.log('challenges', AppState.challenges)
      logger.log('pending', AppState.pending)
      // this.pendingChallenge()
      // this.challengeCheck()
    } catch (error) {
      logger.error(error)
    }
  }

  async updateChallengeScores() {
    try {
      let creatorGoal = {}
      let participantGoal = {}
      AppState.challenges.forEach(challenge => {
        AppState.goals.forEach(goal => {
          // let timeFrame = goal.timeFrame
          // let timeCheck = DateTime.fromISO(DateTime.fromISO(goal.startDate.plus({ timeFrame: 1 })))
          if ((goal.challengeId === challenge.id) && (goal.creatorId === challenge.creatorId)) {
            creatorGoal = goal
            logger.log(creatorGoal)
          } else if ((goal.challengeId === challenge.id) && (goal.creatorId === challenge.participantId)) {
            participantGoal = goal
            logger.log(participantGoal)
          }
        })
        // NOTE check to see if inside time frame,
        if (DateTime.fromISO(creatorGoal.startDate) < DateTime.local()) {
          if ((((DateTime.fromISO && (creatorGoal.endDate) > DateTime.local())) && !challenge.winner)) {
            if (participantGoal.progress > creatorGoal.progress) {
              challenge.participantScore++
              logger.log('p score', challenge.participantScore)
            } else if (participantGoal.progress < creatorGoal.progress) {
              challenge.creatorScore++
              logger.log('c score', challenge.creatorScore)
            }
          } else if ((DateTime.fromISO(creatorGoal.endDate) < DateTime.local()) && !challenge.winner) {
            if (challenge.creatorScore > challenge.participantScore) {
              challenge.winner = creatorGoal.creatorId
              challenge.loser = participantGoal.creatorId
              api.put('/profile/' + creatorGoal.creatorId + '/challengesWon?challengesWon=1')
              api.put('/profile/' + participantGoal.creatorId + '/challengesLost?challengesLost=1')
            } else if (challenge.creatorScore < challenge.participantScore) {
              challenge.loser = creatorGoal.creatorId
              challenge.winner = participantGoal.creatorId
              api.put('/profile/' + participantGoal.creatorId + '/challengesWon?challengesWon=1')
              api.put('/profile/' + creatorGoal.creatorId + '/challengesLost?challengesLost=1')
            }
          }
          api.put('/api/challenges/' + challenge.id, challenge)
        }
      })
      setTimeout(profileService.getAllProfiles, 125)
      setTimeout(challengeService.getChallenges, 125)
      setTimeout(goalService.updateGoal, 125)
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
      setTimeout(this.getChallenges, 1000)
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
      let filteredArray = []
      AppState.pending = []
      filteredArray = AppState.challenges.filter(challenge => ((challenge.accepted === false) && (challenge.participantId === AppState.profile.id) && (challenge.rejected === false)))
      filteredArray.forEach(challenge => {
        AppState.goals.forEach(goal => {
          if (goal.challengeId === challenge.id) {
            AppState.pending.push(challenge)
          }
        })
      })
      logger.log('Checked challenges', AppState.checkedChallenges)
    } catch (error) {
      logger.error(error)
    }
  }

  async challengeCheck() {
    try {
      let filteredArray = []
      AppState.checkedChallenges = []
      filteredArray = AppState.challenges.filter(challenge => ((challenge.accepted === false) && (challenge.participantId === AppState.profile.id || challenge.creatorId === AppState.profile.id) && (challenge.rejected === false)))
      filteredArray.forEach(challenge => {
        AppState.goals.forEach(goal => {
          if (goal.challengeId === challenge.id) {
            AppState.checkedChallenges.push(challenge)
          }
        })
      })
      logger.log('Checked challenges', AppState.checkedChallenges)
    } catch (error) {
      logger.error(error)
    }
  }

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

      if (goal.recurring) {
        newGoal.recurring = goal.recurring
        newGoal.timeFrame = goal.timeFrame
      }

      challenge.accepted = true
      challenge.rejected = false
      await api.put('/api/challenges/' + challenge.id, challenge)
      logger.log(AppState.challenges)
      await api.post('/api/goals/', newGoal)
      logger.log(AppState.goals)
      setTimeout(this.getChallenges, 125)
      setTimeout(goalService.getGoals, 125)
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
      setTimeout(this.getChallenges, 125)
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
      setTimeout(this.getChallenges, 125)
    } catch (error) {
      logger.error(error)
    }
  }

  async acceptedChallengeGoal(goal) {
    try {
      AppState.challenges.forEach(challenge => {
        if (challenge.id === goal.challengeId) {
          return challenge.accepted
        }
      })
    } catch (error) {
      logger.error(error)
    }
  }
}

export const challengeService = new ChallengeService()
