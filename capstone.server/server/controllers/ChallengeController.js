import BaseController from '../utils/BaseController'
// @ts-ignore
import { Auth0Provider } from '@bcwdev/auth0provider'
import { challengeService } from '../services/ChallengeService'
import { goalService } from '../services/GoalService'
export class ChallengeController extends BaseController {
  constructor() {
    super('api/challenges')
    this.router
      .put('/:challengeId/creatorScore', this.creatorScore)
      .put('/:challengeId/participantScore', this.participantScore)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:challengeId', this.getActiveChallenge)
      .post('', this.create)
      .delete('/:challengeId', this.deleteChallenge)
      .put('/:challengeId', this.edit)
      .get('/:challengeId/goals', this.getGoalsByChallengeId)
  }

  async creatorScore(req, res, next) {
    try {
      res.send(await challengeService.creatorScore(req.params.challengeId, req.query))
    } catch (err) {
      next(err)
    }
  }

  async participantScore(req, res, next) {
    try {
      res.send(await challengeService.participantScore(req.params.challengeId, req.query))
    } catch (err) {
      next(err)
    }
  }

  async getGoalsByChallengeId(req, res, next) {
    try {
      res.send(await goalService.getGoalsByChallengeId(req.params.challengeId))
    } catch (error) {
      next(error)
    }
  }

  async getActiveChallenge(req, res, next) {
    try {
      res.send(await challengeService.getActiveChallenge(req.params.challengeId))
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      res.send(await challengeService.getAll(req.query))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await challengeService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async deleteChallenge(req, res, next) {
    try {
      const userId = req.userInfo.id
      res.send(await challengeService.deleteChallenge(req.params.challengeId, userId))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      const userId = req.userInfo.id
      res.send(await challengeService.edit(req.params.challengeId, req.body, userId))
    } catch (error) {
      next(error)
    }
  }
}
