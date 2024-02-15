<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { formatDate } from '../formatDate'
    
const route = useRoute()
const router = useRouter()

/**Refreshes the current date if any changes occur.
 * Sets it as the current route param.
*/
let currentDate = computed(() => 
  new Date(route.params.date)
)
/**Reformats date if it changes. */
const formattedDate = computed(() => formatDate(currentDate.value))

/**Subtracts one from the currently selected day and pushes the new date to router.*/
const goToPreviousDay = () => {
  currentDate.value.setDate(currentDate.value.getDate() - 1)
  router.push({name: 'Tracker', params: {date: formattedDate.value}})
}

/**Adds one to the currently selected day and pushes the new date to router.
 * Also calls IsNextDayInFuture function to disable going to dates in the future.
*/
const goToNextDay = () => {  
  if (!isNextDayInFuture.value) {
    currentDate.value.setDate(currentDate.value.getDate() + 1)
    router.push({name: 'Tracker', params: {date: formattedDate.value}})
  }
}

/**Checks if tomorrow is a further date than the current real date. Returns boolean. */
const isNextDayInFuture = computed(() => {
  const tomorrow = new Date(currentDate.value.getTime())
  tomorrow.setDate(tomorrow.getDate() + 1)

  return tomorrow > new Date()
})
</script>
<template>  
  <v-row justify="center" align="center">
    <v-col cols="6" class="text-end">
      <v-btn variant="outlined"
       @click="goToPreviousDay">Previous Day</v-btn>
    </v-col>
    <v-col cols="6" class="text-start">
       <v-btn variant="outlined"
        @click="goToNextDay" :disabled="isNextDayInFuture">Next Day</v-btn>
    </v-col>
    <v-col cols="12" class="text-center">
      <h1 class="text-h5">{{ formattedDate }}</h1>
    </v-col>      
     
  </v-row>
      
</template>