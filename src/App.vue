<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import Draggable from 'vuedraggable'
import type { Card, List } from '@/types'
import BaseModalDialog from './components/UI/BaseModalDialog.vue'

const lists = reactive<List[]>([
  {
    id: 1,
    title: 'To Do',
    cards: [
      {
        id: 1,
        title: 'Task 1',
        description: 'Description for Task 1',
      },
      {
        id: 2,
        title: 'Task 2',
        description: 'Description for Task 2',
      },
      {
        id: 3,
        title: 'Task 3',
        description: 'Description for Task 3',
      },
    ],
  },
  {
    id: 2,
    title: 'In Progress',
    cards: [
      {
        id: 4,
        title: 'Task 4',
        description: 'Description for Task 4',
      },
    ],
  },
  {
    id: 3,
    title: 'Done',
    cards: [
      {
        id: 5,
        title: 'Task 5',
        description: 'Description for Task 5',
      },
      {
        id: 6,
        title: 'Task 6',
        description: 'Description for Task 6',
      },
    ],
  },
])

const isModalOpen = ref<boolean>(false)
const editingCard = ref<Card | null>(null)
const editingListIndex = ref<number | null>(null)
const modalMode = computed(() => (editingCard.value === null ? 'add' : 'edit'))

const openModal = (listIndex: number, card?: Card) => {
  editingListIndex.value = listIndex
  isModalOpen.value = true
  editingCard.value = card === undefined ? null : card
}

const closeModal = () => {
  isModalOpen.value = false
  editingListIndex.value = null
  editingCard.value = null
}

const saveCard = (card: Card) => {
  if (editingListIndex.value === null) return
  if (modalMode.value === 'add') {
    //Adding
    const newId: number = Math.max(...lists.flatMap((list) => list.cards.map((c) => c.id))) + 1
    lists[editingListIndex.value].cards.push({
      ...card,
      id: newId,
    })
  } else {
    //editing
    const cardIndex = lists[editingListIndex.value].cards.findIndex(
      (cardOnList) => cardOnList.id === card.id,
    )
    if (cardIndex !== -1) {
      lists[editingListIndex.value].cards[cardIndex] = card
    }
  }
  closeModal()
}
</script>

<template>
  <main class="bg-gray-50 min-h-screen">
    <div class="font-sans p-5 container max-w-6xl mx-auto">
      <BaseModalDialog
        :isOpen="isModalOpen"
        @close="closeModal"
        :card="editingCard"
        @save="saveCard"
        :mode="modalMode"
      />
      <h1 class="text-4xl font-bold">Trello Clone</h1>
      <div class="flex gap-4 py-5 overflow-x-auto justify-between">
        <!-- Start The list -->
        <div
          class="p-4 bg-gray-200 rounded-lg flex flex-col gap-3 min-w-[350px]"
          v-for="(list, listIndex) in lists"
          :key="list.id"
        >
          <h1 class="font-bold">{{ list.title }}</h1>

          <!-- Start The Draggable list -->
          <Draggable :list="list.cards" group="cards" item-key="id">
            <template #item="{ element }">
              <div
                class="py-2.5 mb-3 px-2 bg-white rounded-md shadow-md flex flex-col gap-[0.5]"
                @click="openModal(listIndex, element)"
              >
                {{ element.id }}
                <h2 class="font-semibold text-sm">{{ element.title }}</h2>
                <p class="text-sm text-gray-400">{{ element.description }}</p>
              </div>
            </template>
          </Draggable>
          <!-- End The Draggable list -->
          <button
            class="text-gray-500 text-start p-2 hover:bg-white rounded-md font-medium text-sm mt-2 -mb-1 hover:cursor-pointer"
            @click="openModal(listIndex)"
          >
            + Add Card
          </button>
        </div>
        <!-- End The list -->
      </div>
    </div>
  </main>
</template>

<style scoped></style>
