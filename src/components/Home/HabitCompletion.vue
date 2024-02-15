<script setup>
    import { computed, inject } from 'vue'
    import { useRoute } from 'vue-router'
    import { formatDate } from '../formatDate'
    import '@fontsource/roboto';

const route = useRoute()

let habits = inject('habits')

let currentDate = computed(() => 
  new Date(route.params.date))

const formattedDate = computed(() => formatDate(currentDate.value))

/**Checks if habit has the currently selected date in localStorage object habit.completedDates.
 * If it doesn't, then the new date is added to proxy object, if it does, it is then removed.
 * Works as toggle button.
 * Based on the index of the habit in localStorage, the proxy habit is set in localStorage at the end.
 */
const markHabitAsCompleted = (habit, habitIndex) => {
  const formattedCurrentDate = formatDate(currentDate.value)
  if (!habit.completedDates.includes(formattedCurrentDate)) {
    habit.completedDates.push(formattedCurrentDate)
  } else {
    const index = habit.completedDates.indexOf(formattedCurrentDate)
    habit.completedDates.splice(index, 1)
  }

  let storedHabits = localStorage.getItem('habits')
  const existingHabits = storedHabits ? JSON.parse(storedHabits) : []
  if (habitIndex !== -1) {
    existingHabits[habitIndex] = habit
    localStorage.setItem('habits', JSON.stringify(existingHabits))
  }
}

</script>


<template>
  <!--Every habit is called through a v-for loop. Each of them is created with a set v-col size
  and a v-card. The v-card has the habit itself as well as the toggle button.
  The v-if checks if a habit is disabled or not, and stops it from rendering from the disabled date
  and onwards. Historic dates are still rendered.

  The button checks if the disabledDate is the currently selected date, and changes color accordingly.-->
  <p class="text-subtitle-1 mb-3">Click on a habit to complete it!</p>
  <v-sheet :elevation="15" border class="custom-sheet">    
    <v-row  justify="center" align="center">
      <v-col v-for="(habit, index) in habits.list" :key="habit.habitName" cols="12" sm="6" md="4" lg="3">
        <v-card class="py-2 d-flex align-center flex-column" id="habitEntry"  elevation="3"
           max-width="100%" image="https://i.pinimg.com/736x/3c/c2/1f/3cc21f46bad3ee4b458b89c394ab8359.jpg"
           v-if="!habit.disabledDate || new Date(formattedDate) < new Date(habit.disabledDate)">
          <template v-slot:text >
            {{ habit.habitName }}
          </template>
          <v-card-actions class="justify-center">
            <v-btn :class="[habit.completedDates.includes(formattedDate) ? 'bg-green' : 'bg-red']"
             @click="markHabitAsCompleted(habit, index)">Done?</v-btn>
          </v-card-actions>
          </v-card>       
      </v-col>
    </v-row>    
  </v-sheet>
</template>
<style scoped>
#habitEntry {
  user-select: none;
  font-family: 'Roboto', sans-serif; 
}

.custom-sheet {
  background-image: url(https://img.freepik.com/free-photo/wood-background_74190-7405.jpg);
  padding: 10px;
}
</style>