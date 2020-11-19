import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ChallengeService {
  async getAll(query = {}) {
    return await dbContext.Challenges.find(query).populate('Profile')
  }

  async getActiveChallenge(id) {
    return await dbContext.Challenges.findById(id).populate('Profile')
  }

  async create(body) {
    return await dbContext.Challenges.create(body)
  }

  async deleteChallenge(challengeId, userId) {
    const exists = await dbContext.Challenges.findById(challengeId)
    if (!exists) {
      throw new BadRequest('This challenge does not exist')
    // @ts-ignore
    } else if (exists._doc.creatorId === userId) {
      await dbContext.Challenges.findByIdAndDelete(challengeId)
      return 'Your Challenge has been delorted!'
    }
  }

  async edit(challengeId, newChallenge, userId) {
    const exists = await dbContext.Challenges.findById(challengeId)
    if (!exists) {
      throw new BadRequest('This challenge does not exist')
    // @ts-ignore
    } else if (exists._doc.creatorId === userId) {
      await dbContext.Challenges.findByIdAndUpdate(challengeId, newChallenge)
      return 'YOUR BOARD HAS BEEN EDITED!'
    }
  }
}

export const challengeService = new ChallengeService()
