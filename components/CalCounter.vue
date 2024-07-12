<script setup lang="ts">
import { useGroceryListsStore } from '@/stores/groceryLists';
import type { GroceryList } from '@/utils/type.ts';

const groceryListsStore = useGroceryListsStore();

const props = defineProps<{
	item: GroceryList ;
}>();
</script>

<template>
	<div class="flex spcae-x-2 text-sm font-bold divide-x-2 divide-gray-200 gap-2">
		<div v-if="props.item.items">
			{{ props.item.items.length }} items
		</div>
		<div v-else>
			0 items
		</div>
		<div class="px-2">
			{{ groceryListsStore.getTotalCalories(props.item.id) }} kcal
		</div>
	</div>
</template>
