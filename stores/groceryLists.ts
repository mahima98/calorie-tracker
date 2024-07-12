import { defineStore } from 'pinia';
import type { GroceryItem, GroceryList } from '@/utils/type.ts';

export const useGroceryListsStore = defineStore('groceryList', {
	state: () => ({
		groceryLists: [] as GroceryList[],
		nextListId: 1,
	}),
	getters: {
		// calculates and return the total calories for a given grocery list ID
		getTotalCalories: state => (groceryListId: number) => {
			const list = state.groceryLists.find(list => list.id === groceryListId);
			return list ? list.items.reduce((total, item) => total + item.food.nutrients.ENERC_KCAL, 0) : 0;
		},
	},
	actions: {
		createList(name: string) {
			this.groceryLists.push({
				id: this.nextListId++,
				name,
				items: [],
			});
		},
		//  adding an item to a grocery list with a specified ID
		addItem(groceryListId: number, item: GroceryItem) {
			const groceryLists = this.groceryLists.find(list => list.id === groceryListId);
			if (groceryLists) {
				groceryLists.items.push(item);
			}
		},

		// delete a grocery list with a specified ID
		deleteList(groceryListId: number) {
			const index = this.groceryLists.findIndex(list => list.id === groceryListId);
			if (index !== -1) {
				this.groceryLists.splice(index, 1);
			}
		},
	},
	persist: true,
});
