<script setup lang="ts">
const props = defineProps<{
	name?: string;
	calories?: number;
}>();
</script>

<template>
	<li class="flex p-2 justify-between items-center">
		<div class="text-xs md:text-base">
			{{ props.name }}
		</div>
		<div class="text-xs md:text-base">
			{{ props.calories }}kcal
		</div>
	</li>
</template>
