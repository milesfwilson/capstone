// @ts-ignore
import { Auth0Provider } from '@bcwdev/auth0provider'
import { profilesService } from '../services/ProfilesService'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'

export class ProfilesController extends BaseController {
  constructor() {
    super('profile')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/all', this.getAllProfiles)
      .get('/', this.getUserProfile)
      .put('/:profileId', this.editProfile)
      .put('/:profileId/completed', this.completed)
      .put('/:profileId/failures', this.fail)
      .put('/:profileId/', this.editProfile)
  }

  async getUserProfile(req, res, next) {
    try {
      const profile = await profilesService.getProfile(req.userInfo)
      res.send(profile)
    } catch (error) {
      next(error)
    }
  }

  async completed(req, res, next) {
    try {
      res.send(await profilesService.completed(req.params.profileId, req.query))
    } catch (err) {
      next(err)
    }
  }

  async fail(req, res, next) {
    try {
      res.send(await profilesService.fail(req.params.profileId, req.query))
    } catch (err) {
      next(err)
    }
  }

  // @ts-ignore
  async editProfile(req, res, next) {
    try {
      const original = await profilesService.getProfile(req.userInfo)
      const edited = req.body

      const editedProfile = {
        // @ts-ignore
        subs: original._doc.subs,
        // @ts-ignore
        _id: original._doc._id,
        // @ts-ignore
        email: original._doc.email,
        // @ts-ignore
        name: original._doc.name,
        // @ts-ignore
        picture: original._doc.picture,
        // @ts-ignore
        completed: edited.completed != null ? edited.completed : original._doc.completed,
        // @ts-ignore
        failures: edited.failures != null ? edited.failures : original._doc.failures,
        // @ts-ignore
        challengesWon: edited.challengesWon != null ? edited.challengesWon : original._doc.challengesWon,
        // @ts-ignore
        challengesLost: edited.challengesLost != null ? edited.challengesLost : original._doc.challengesLost
      }
      // @ts-ignore
      res.send(await profilesService.editProfile(editedProfile, original._doc._id))
    } catch (error) {
      logger.error(error)
    }
  }

  async getAllProfiles(req, res, next) {
    try {
      res.send(await profilesService.getProfiles())
    } catch (error) {
      logger.error(error)
    }
  }
}
