import BaseController from '../utils/BaseController'
// @ts-ignore
import { Auth0Provider } from '@bcwdev/auth0provider'
import { challengeService } from '../services/ChallengeService'
// import { listService } from '../services/ListService'
export class ChallengeController extends BaseController {
  constructor() {
    super('api/challenges')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:challengeId', this.getActiveChallenge)
      .post('', this.create)
      .delete('/:challengeId', this.deleteChallenge)
      .put('/:challengeId', this.edit)
    // .get('/:challengeId/lists', this.getListByChallenge)
  }

  // async getListByChallenge(req, res, next) {
  //   try {
  //     res.send(await listService.getAllListsByChallenge(req.params.challengeId))
  //   } catch (error) {
  //     next(error)
  //   }
  // }

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
      // const userId = req.userInfo.id
      res.send(await challengeService.deleteChallenge(req.params.challengeId))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      // const userId = req.userInfo.id
      res.send(await challengeService.edit(req.params.challengeId, req.body))
    } catch (error) {
      next(error)
    }
  }
}
