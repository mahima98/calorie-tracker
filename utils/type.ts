export interface Item {
	name: string;
	calories: number;
}

export interface GroceryList {
	id: number;
	name: string;
	items: GroceryItem[];
}

export interface List {
	id: number;
	name: string;
}

export interface GroceryItem {
	food: {
		label: string;
		nutrients: {
			ENERC_KCAL: number;
		};
	};
}
