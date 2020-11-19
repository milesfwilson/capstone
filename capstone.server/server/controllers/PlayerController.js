import BaseController from '../utils/BaseController'
// @ts-ignore
import { Auth0Provider } from '@bcwdev/auth0provider'
import { playerService } from '../services/ChallengeService'
export class ChallengeController extends BaseController {
  constructor() {
    super('api/players')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getPlayer)
      .post('', this.createPlayer)
      .put('/:playerId', this.editPlayer)
  }

  async getPlayer(req, res, next) {
    try {
      res.send(await playerService.getPlayer(req.query))
    } catch (error) {
      next(error)
    }
  }

  async createPlayer(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await playerService.createPlayer(req.body))
    } catch (error) {
      next(error)
    }
  }

  async editPlayer(req, res, next) {
    try {
      const userId = req.userInfo.id
      res.send(await playerService.editPlayer(req.params.playerId, req.body, userId))
    } catch (error) {
      next(error)
    }
  }
}
