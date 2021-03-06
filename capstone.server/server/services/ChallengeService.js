import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ChallengeService {
  async participantScore(id, query) {
    if (query.participantScore != 1) {
      throw new BadRequest('participantScore updated')
    }
    return await dbContext.Challenges.findByIdAndUpdate(id, { $inc: { participantScore: query.participantScore } }, { new: true })
  }

  async creatorScore(id, query) {
    if (query.creatorScore != 1) {
      throw new BadRequest('creatorScore updated')
    }
    return await dbContext.Challenges.findByIdAndUpdate(id, { $inc: { creatorScore: query.creatorScore } }, { new: true })
  }

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
    } else if (exists._doc.creatorId === userId || exists._doc.participantId === userId) {
      await dbContext.Challenges.findByIdAndUpdate(challengeId, newChallenge)
      return 'YOUR BOARD HAS BEEN EDITED!'
    }
  }
}

export const challengeService = new ChallengeService()
