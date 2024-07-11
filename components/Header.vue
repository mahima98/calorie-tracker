<script setup lang="ts">
import type { NavItem } from '@nuxt/content'


</script>

<template>
  <UHeader >
    <template #logo>
       CalorieTracker
    </template>

    <template #center>
        <UButton color="primary" variant="solid" label="Button">
            <i class="i-heroicons-plus"></i>
            <span>Create new list</span>
        </UButton>
    </template>

    <template #right>
      <UColorModeButton />
      <UButton to="https://github.com/nuxt/ui" target="_blank" icon="i-simple-icons-github" color="gray" variant="ghost" />
    </template>

  </UHeader>
</template>