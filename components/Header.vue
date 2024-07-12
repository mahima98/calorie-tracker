<script setup lang="ts">
import { useGroceryListsStore } from '@/stores/groceryLists';

const isOpen = ref(false);
const newListName = ref('');

const groceryStore = useGroceryListsStore();

function createNewList() {
	if (newListName.value) {
		groceryStore.createList(newListName.value);
		isOpen.value = false;
		newListName.value = '';
	}
};

</script>

<template>
  <UHeader >
    <template #logo>
       CalorieTracker
    </template>

    <template #center>
      <div>
				<UButton
					class="hidden md:flex justify-center items-center gap-2"
					@click="isOpen = true"
				>
          <UIcon
						class="text-base cursor-pointer"
						name="i-heroicons-plus"
					/>
          <span>Create new list</span>
        </UButton>

				<div class="sm:block md:hidden">
					<UIcon
						class="text-base cursor-pointer"
						name="i-heroicons-plus"
						@click="isOpen = true"
					/>
				</div>

				<UModal
					v-model="isOpen"
				>
					<div class="p-8 space-y-4">
						<div class="flex justify-between item-center">
							<div class="text-sm md:text-base">
								Create new list
							</div>
							<UIcon
								class="text-base cursor-pointer"
								name="i-heroicons-x-mark"
								@click="isOpen = false"
							/>
						</div>
						<UInput
							v-model="newListName"
							color="primary"
							variant="outline"
							placeholder="Type a name for your list"
							class="text-xs md:text-base"
							required
						/>
						<div class="flex justify-end">
							<UButton
								color="primary"
								variant="solid"

								size="sm"
								@click="createNewList"
							>
								Create
							</UButton>
						</div>
					</div>
				</UModal>
			</div>
    </template>

    <template #right>
      <UColorModeButton />
      <UButton to="https://github.com/nuxt/ui" target="_blank" icon="i-simple-icons-github" color="gray" variant="ghost" />
    </template>

  </UHeader>
</template>