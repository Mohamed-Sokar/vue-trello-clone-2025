<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import type { Card } from '@/types'

const props = defineProps<{
  isOpen: boolean
  card: Card | null
  mode: 'add' | 'edit'
}>()

const emit = defineEmits<{
  // close: []
  // save: [card:Card]
  (e: 'close'): void
  (e: 'save', card: Card): void
}>()

const titleInput = ref<HTMLInputElement | null>(null)
const modalElement = ref<HTMLElement | null>(null)
const { activate, deactivate } = useFocusTrap(modalElement)
const localCard = ref<Card>({ id: 0, title: '', description: '' })

watch(
  () => props.isOpen,
  async (isOpen) => {
    if (isOpen) {
      await nextTick()
      activate()
      titleInput.value?.focus()
    } else {
      deactivate()
    }
  },
)

watch(
  () => props.card,
  (newCard) => {
    if (newCard) {
      localCard.value = { ...newCard }
    } else {
      localCard.value = { id: 0, title: '', description: '' }
    }
  },
  { immediate: true },
)
</script>

<template>
  <div
    v-if="isOpen"
    @keydown.esc="emit('close')"
    class="fixed inset-0 bg-black/[0.3] backdrop-blur-xs flex items-center justify-center"
    role="dialog"
    aria-modal="true"
    ref="modalElement"
    @click.self="emit('close')"
  >
    <div class="bg-white p-5 rounded max-w-md w-full">
      <h2 class="text-xl font-bold mb-4">
        {{ mode === 'add' ? 'Add New Card' : 'Edit Card' }}
      </h2>
      <input
        v-model="localCard.title"
        type="text"
        placeholder="Card Title"
        aria-label="Card Title"
        class="w-full p-2 mb-4 border rounded border-gray-200"
        ref="titleInput"
      />

      <textarea
        v-model="localCard.description"
        class="w-full p-2 mb-4 border rounded border-gray-200"
        placeholder="Description"
        aria-label="Card Description"
      ></textarea>

      <div class="flex justify-end gap-2">
        <button
          class="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded cursor-pointer"
          @click="emit('close')"
        >
          Cancel
        </button>

        <button
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer font-semibold"
          @click="emit('save', localCard)"
        >
          {{ mode === 'add' ? 'Add' : 'Save' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
