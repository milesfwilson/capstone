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
  challengeGoal: [],
  sort: {},
  sortByStatus: false
})
