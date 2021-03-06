import { initialize } from '@bcwdev/auth0provider-client'
import { AppState } from '../AppState'
import { audience, clientId, domain } from '../AuthConfig'
import router from '../router'
import { logger } from '../utils/Logger'
import { setBearer } from './AxiosService'
import { goalService } from './GoalService'
import { profileService } from './ProfileService'
import { challengeService } from './ChallengeService'

export const AuthService = initialize({
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    )
  }
})

AuthService.on(AuthService.AUTH_EVENTS.AUTHENTICATED, async function() {
  setBearer(AuthService.bearer)
  await profileService.getProfile()
  AppState.user = AuthService.user

  await challengeService.getChallenges()
  await goalService.getGoals()
  await profileService.getAllProfiles()
  // await goalService.updateGoal()

  await challengeService.updateChallengeScores()
  await profileService.getAllProfiles()
  logger.log(AppState.profile)
  // NOTE if there is something you want to do once the user is authenticated, place that here
})
