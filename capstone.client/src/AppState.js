import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  profile: {},
  goals: [{ title: 'Change careers', id: 1, category: 'Financial' }, { title: 'Drink 8 glass of water per day', id: 2, category: 'Health' }, { title: 'Run 5 miles in a week', id: 3, category: 'Health' }]
})
