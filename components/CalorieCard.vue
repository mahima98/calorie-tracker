<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { watchDebounced } from '@vueuse/core';
import { useGroceryListsStore } from '@/stores/groceryLists';
import type { GroceryItem } from '@/utils/type.js';

const toast = useToast();

const { fetchFoodList } = useApi();

const store = useGroceryListsStore();
const searchItemName = ref('');
const isOpen = ref(false);
const selectedList = ref<List | null>(null);

const { data: foodList, refetch, isFetching, error, isError } = useQuery({
	queryKey: ['food-list', searchItemName],
	queryFn: async () => await fetchFoodList(searchItemName.value),
	enabled: false,
});

function openSearchItemModal(list: List) {
	isOpen.value = true;
	searchItemName.value = '';
	selectedList.value = list;
};

function selectedItem(item: GroceryItem) {
	if (!selectedList.value) return;

	store.addItem(selectedList.value.id, item);
	toast.add({ title: 'Item added', description: `${item.food.label} added to list ${selectedList.value.name}` });
	isOpen.value = false;
	selectedList.value = null;
};

watchDebounced(
	searchItemName,
	() => { refetch(); },
	{ debounce: 500, maxWait: 1000 },
);
</script>

<template>
	<ULandingCard
		v-for="item in store.groceryLists"
		:key="item.id"
		class="col-span-3 min-h-96"	
		>
			<!-- list header -->
			<div class="flex items-center justify-between">
				<h2 class="text-sm md:text-lg font-semibold text-center border-b border-b-2 pb-4 max-w-[200px] truncate ">
					{{ item.name }}
				</h2>
				<UIcon
					name="i-heroicons-trash"
					class="cursor-pointer hover:text-gray-400 transition duration-150 ease-in-out"
					@click="store.deleteList(item.id)"
				/>
			</div>

			<!-- list items and count -->
			<div class="flex flex-col justify-between text-black h-full ">
				<div
					v-if="item.items.length > 0"
					class="max-h-[250px] overflow-y-auto"
				>
					<TransitionGroup
						name="list"
						tag="ul"
						class="pt-4 overflow-hidden"
					>
						<CalorieCardList
							v-for="(groceryItem, i) in item.items"
							:key="i"
							:name="groceryItem.food.label"
							:calories="groceryItem.food.nutrients.ENERC_KCAL"
						/>
					</TransitionGroup>
				</div>
				<div
					v-else
					class="flex justify-center items-center gap-1 opacity-40 pt-8 text-xs md:text-sm"
				>
					<UIcon
						class="text-base cursor-pointer"
						name="i-heroicons-plus"
						@click="isOpen = true"
					/> Add an item
				</div>
				<div class="flex justify-between items-center py-4">
					<!-- count of items and total calories -->
					<CalCounter :item="item" />
					<!-- Add item button to open modal -->
					<UButton
						label="Add item"
						size="xs"
						@click="openSearchItemModal(item)"
					/>

					<!-- search item modal start -->

					<Teleport to="body">
						<Transition name="fade">
							<div
								v-if="isOpen"
								class="modal-mask z-10 px-8"
							>
								<div class="modal-container">
									<div class=" space-y-4 z-10">
										<div class="flex justify-between">
											<div class="text-sm md:text-base text-black">
												Search item
											</div>
											<Icon
												class="text-base cursor-pointer text-black"
												name="i-heroicons-x-mark"
												@click="isOpen = false"
											/>
										</div>

										<div>
											<UInput
												v-model="searchItemName"
												:loading="isFetching"
												color="primary"
												variant="outline"
												placeholder="Search..."
												class="text-black"
												autofocus
											/>

											<ul

												v-if="foodList && foodList?.length > 0"
												class="bg-white z-20 shadow-md divide-y divide-gray-200 rounded-md"
											>
												<li
													v-for="(result, index) in foodList"
													:key="index"
													class="px-2 p-1 cursor-pointer hover:bg-gray-100 bg-white text-sm text-black"
													@click="selectedItem(result)"
												>
													{{ result.food.label }} - {{ result.food.nutrients.ENERC_KCAL }}kcal
												</li>
											</ul>
											<div
												v-else-if="searchItemName?.length > 0 && foodList?.length === 0"
												class=" text-xs text-red-600 pt-2"
											>
												Item not found.
											</div>
											<div v-else />
											<div
												v-if="isError"
												class=" text-xs text-red-600 pt-2"
											>
												{{ error }}
											</div>
										</div>
									</div>
								</div>
							</div>
						</Transition>
					</Teleport>

					<!-- Search item modal ends -->
				</div>
			</div>
		</ULandingCard>
</template>
<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 500px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}
</style>
