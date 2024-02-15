import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HabitView from '../views/HabitView.vue'
import { formatDate } from '../components/formatDate'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      //Redirect is to route to the current date by default.
      redirect: () => {        
        
        return {name: 'Tracker', params: { date: formatDate(new Date())}
      }
    }},
    {
      path: '/:date',
      name: 'Tracker',
      component: HomeView,
      props: true
    },
    {
      path: '/habits',
      name: 'Habits',
      component: HabitView
    }
  ]
})


export default router
