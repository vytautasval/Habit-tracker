<script setup>
import { ref, nextTick, inject } from 'vue'
import { formatDate } from '../formatDate'

let habits = inject('habits')

let editingHabit = ref()
let editingHabitName = ref()

/**Sets habit and habit.habitName to proxy values.
 * Also focuses on the input field once it has loaded.*/
const editHabit = async (habit) => {
    editingHabit.value = habit
    editingHabitName.value = habit.habitName
    await nextTick()
    const inputField = document.getElementById(habit.habitName)
    inputField.focus() 
}

/**Writes the new value to localStorage and sets the proxy back to null.*/
const updateHabit = (index) => {
    if (editingHabitName.value) {
        habits.list[index].habitName = editingHabitName.value
        localStorage.setItem('habits', JSON.stringify(habits.list))    
        editingHabit.value = null
    }
}

/**Reverses the state of the habit.disabled boolean value and sets it as such in localStorage.*/
const pauseHabit = (habit) => {
    habit.disabled = !habit.disabled
    habit.disabledDate = habit.disabled ? formatDate(new Date()) : null
    
    localStorage.setItem('habits', JSON.stringify(habits.list))            
}

/**Removes selected habit based on index from localStorage. */
const deleteHabit = (index) => {
    habits.list.splice(index, 1)        
    localStorage.setItem('habits', JSON.stringify(habits.list))
    
}
</script>

<template>
    <!--Habits are loaded via v-for loop, are loaded into a v-col with a v-card in it.
    Habit text is showss as v-card-text with the condition that it is not being edited.
    If it is beign edit, v-text-field fires through v-else. It reverts back to <v-card-text>
    when v-text-field is unfocused or enter key is pressed.
    The button activates a dropdown menu with the edit, pause and delete options.
    All of which call a function @click.-->
    <v-row justify="center" align="center">
        <v-col cols="12">
            <h1 class="text-h5">Your Current Habits: </h1>
        </v-col>              
        <v-col class="dropdown" v-for="(habit, index) in habits.list" :key="habit.habitName"
            cols="12" sm="6" md="4" lg="3">            
            <v-card class="py-2 d-flex align-stretch flex-column habitEntry" elevation="3" 
                max-width="100%" :id="'habitEntry' + index"
                :class="{'disabled': habit.disabled, 'enabled': !habit.disabled}">
                <v-card-text v-if="editingHabit !== habit">
                    {{ habit.habitName }}                    
                </v-card-text>                
                <v-text-field v-else :id="habit.habitName" v-model="editingHabitName"
                    @blur="updateHabit(index)" @keydown.enter="updateHabit(index)" auto-grow>
                </v-text-field>                
                <v-card-actions class="justify-center">
                    <v-btn class="bg-white" variant="outlined">Click Me
                        <v-menu activator="parent">                
                            <v-list>
                                <v-list-item @click="editHabit(habit)">
                                    <v-list-item-title>Edit</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="pauseHabit(habit)">
                                    <v-list-item-title>Pause</v-list-item-title>                            
                                </v-list-item>
                                <v-list-item @click="deleteHabit(index)">
                                    <v-list-item-title>Delete</v-list-item-title>                            
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>    
                
</template>

<style scoped>
.habitEntry {
  user-select: none;
  font-family: 'Roboto', sans-serif;  
}
.disabled {
    background-color: red;
}
.enabled {
    background-color: green;
}
</style>