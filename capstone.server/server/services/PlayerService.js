import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class PlayerService {
  async getPlayer(query = {}) {
    return await dbContext.Player.find(query).populate('Profile')
  }

  async createPlayer() {
    return await dbContext.Player.create()
  }


  async editPlayer(challengeId, newPlayer) {
    const exists = await dbContext.Player.findById(challengeId)
    if (!exists) {
      throw new BadRequest('This player does not exist')
    // @ts-ignore
    } else if (exists._doc.creatorId === userId) {
    await dbContext.Player.findByIdAndUpdate(challengeId, newPlayer)
  }
}

export const challengeService = new PlayerService()
