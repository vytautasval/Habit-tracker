import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
  })
const app = createApp(App)

app.provide('habits', reactive({
    list: JSON.parse(localStorage.getItem('habits')) || []
}))

app.use(router).use(vuetify)

app.mount('#app')
