import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import Profile from '../models/Profile'
import { logger } from "../utils/Logger"

// Private Methods

/**
 * Creates profile if one does not exist
 * @param {any} profile
 * @param {any} user
 */
async function createProfileIfNeeded(profile, user) {
  if (!profile) {
    user._id = user.id
    profile = await dbContext.Profile.create({
      ...user,
      subs: [user.sub]
    })
  }
  return profile
}

/**
 * Adds sub to profile if not already on profile
 * @param {any} profile
 * @param {any} user
 */
async function mergeSubsIfNeeded(profile, user) {
  if (!profile.subs.includes(user.sub)) {
    // @ts-ignore
    profile.subs.push(user.sub)
    await profile.save()
  }
}
/**
 * Restricts changes to the body of the profile object
 * @param {any} body
 */
function sanitizeBody(body) {
  const writable = {
    name: body.name,
    phones: body.phones,
    addresses: body.addresses,
    notes: body.notes,
    picture: body.picture
  }
  return writable
}

class ProfileService {
  /**
   * Provided an array of user ids will return an array of user profiles with email picture and name
   * @param {String[]} ids Array of email addresses to lookup users by
   */
  // async getProfiles(ids = []) {
  //   const profiles = await dbContext.Profile.find({
  //     _id: { $in: ids }
  //   }).select('email picture name')
  //   return profiles
  // }

  async getProfiles(query = {}) {
    const profiles = await dbContext.Profile.find(query)
    return profiles
  }

  /**
   * Returns a user profile from the Auth0 user object
   *
   * Creates user if none exists
   *
   * Adds sub of Auth0 account to profile if not currently on profile
   * @param {any} user
   */
  async getProfile(user) {
    let profile = await dbContext.Profile.findOne({
      _id: user.id
    })
    profile = await createProfileIfNeeded(profile, user)
    await mergeSubsIfNeeded(profile, user)
    return profile
  }

  async completed(id, query) {
    if (query.failures < 1) {
      logger.log('completed up to date')
    }
    return await dbContext.Profile.findByIdAndUpdate(id, { $inc: { completed: query.completed } }, { new: true }).populate('profile')
  }

  async fail(id, query) {
    if (query.failures < 1) {
      logger.log('failures up to date')
    }
    return await dbContext.Profile.findByIdAndUpdate(id, { $inc: { failures: query.failures } }, { new: true }).populate('profile')
  }

  async challengesLost(id, query) {
    if (query.challengesLost != 1) {
      throw new BadRequest('no')
    }
    return await dbContext.Profile.findByIdAndUpdate(id, { $inc: { challengesLost: query.challengesLost } }, { new: true }).populate('profile')
  }

  async challengesWon(id, query) {
    if (query.challengesWon != 1) {
      throw new BadRequest('no')
    }
    return await dbContext.Profile.findByIdAndUpdate(id, { $inc: { challengesWon: query.challengesWon } }, { new: true }).populate('profile')
  }

  /**
   * Updates profile with the request body, will only allow changes to editable fields
   *  @param {any} user Auth0 user object
   *  @param {any} body Updates to apply to user object
   */
  async updateProfile(user, body) {
    const update = sanitizeBody(body)
    const profile = await dbContext.Profile.findOneAndUpdate(
      { _id: user.id },
      { $set: update },
      { runValidators: true, setDefaultsOnInsert: true, new: true }
    )
    return profile
  }

  async editProfile(body, id) {
    return await dbContext.Profile.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true })
  }
}
export const profilesService = new ProfileService()
