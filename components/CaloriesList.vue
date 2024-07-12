<script setup lang="ts">
import { useGroceryListsStore } from '@/stores/groceryLists';

const store = useGroceryListsStore();


</script>

<template>
	<div class="flex-grow bg-gray-100">
		<ULandingGrid
			v-if="store.groceryLists.length > 0"
			class="p-8 mx-auto max-w-[1280px]"
		>
				<CalorieCard />
		</ULandingGrid>
		<div
			v-else
			class="flex-grow flex items-center justify-center gap-2  bg-gray-100"
		>
			<div class="text-xs md:text-md lg:text-xl text-gray-300">
				Empty List
			</div>
		</div>
	</div>
</template>