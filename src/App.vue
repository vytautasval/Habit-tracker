<script setup>
import { RouterView } from 'vue-router'

</script>

<template>
  <header>
    
    <v-container class="text-center">
      <nav justify="center">        
        <v-btn variant="plain" to="/">Home</v-btn>
        <v-btn variant="plain" to="/habits">Edit Habits</v-btn>
      </nav>
    </v-container>
    
  </header>

  <RouterView />
</template>

