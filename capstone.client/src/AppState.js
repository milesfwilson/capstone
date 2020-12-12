import { DateTime } from 'luxon'
import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  profile: {},
  profiles: [],
  goals: [],
  newGoal: {
    recurring: false,
    counter: false,
    challenge: false
  },
  challenges: [],
  activeChallenge: {},
  activeChallenger: {},
  activeGoal: {},
  challengeGoal: [],
  sort: {},
  sortByStatus: 'all',
  reveal: false,
  pending: [],
  checkedChallenges: [],
  myGoals: [],
  date: DateTime.local().toISODate(),
  sortByTimeFrame: 'day'
})
