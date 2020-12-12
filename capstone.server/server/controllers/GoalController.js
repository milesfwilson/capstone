import BaseController from '../utils/BaseController'
// @ts-ignore
import { Auth0Provider } from '@bcwdev/auth0provider'
import { goalService } from '../services/GoalService'
export class GoalController extends BaseController {
  constructor() {
    super('api/goals')
    this.router
      .put('', this.updateGoal)
      .get('', this.getAll)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:goalId', this.getActiveGoal)
      .post('', this.createGoal)
      .delete('/:goalId', this.deleteGoal)
      .put('/:goalId', this.editGoal)
  }

  async getActiveGoal(req, res, next) {
    try {
      res.send(await goalService.getActiveGoal(req.params.goalId))
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      res.send(await goalService.getAll(req.query))
    } catch (error) {
      next(error)
    }
  }

  async createGoal(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await goalService.createGoal(req.body))
    } catch (error) {
      next(error)
    }
  }

  async deleteGoal(req, res, next) {
    try {
      const userId = req.userInfo.id
      res.send(await goalService.deleteGoal(req.params.goalId, userId))
    } catch (error) {
      next(error)
    }
  }

  async editGoal(req, res, next) {
    try {
      const userId = req.userInfo.id
      res.send(await goalService.editGoal(req.params.goalId, req.body, userId))
    } catch (error) {
      next(error)
    }
  }

  async updateGoal(req, res, next) {
    try {
      // const userId = req.userInfo.id
      res.send(await goalService.editGoal())
    } catch (error) {
      next(error)
    }
  }
}
