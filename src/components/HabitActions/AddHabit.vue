<script setup>
import { ref, computed, inject } from 'vue'

const newHabit = ref('')
const habits = inject('habits')

const entryNotEmpty = computed(() => { //isEmpty
    return newHabit.value.length > 0
}) 
const addNewHabit = (event) => {
    event.preventDefault()

    const habitEntry = {
        habitName: newHabit.value,
        completedDates: [],
        disabled: false,
        disabledDate: null,
    }
    
    habits.list.push(habitEntry) //?
        
    localStorage.setItem('habits', JSON.stringify(habits.list))

    newHabit.value = ''
}

</script>

<template>
    <v-row justify="center" align="center">
        <v-col cols="12">
            <h1 class="text-h5">Enter a new habit below.</h1>
        </v-col>
        <v-col cols="6" class="text-center">
            <v-form @submit="addNewHabit">
            <v-text-field label="Your Habit" required v-model="newHabit">
            </v-text-field>
            <v-btn variant="outlined" :disabled="entryNotEmpty" type="submit">Submit</v-btn>
        </v-form>
        </v-col>
        
        
    </v-row>
    
</template>