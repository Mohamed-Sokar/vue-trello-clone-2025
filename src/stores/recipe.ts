import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface Recipe {
  id: string | number
  name: string
  description: string
}
type NewRecipe = Omit<Recipe, 'id'>

export const useCounterStore = defineStore('recipe', () => {
  const recipes = ref<Recipe[]>([
    { id: 1, name: 'Recipe 1', description: 'description 1' },
    { id: 2, name: 'Recipe 2', description: 'description 2' },
    { id: 3, name: 'Recipe 3', description: 'description 3' },
  ])

  const count = computed(() => recipes.value.length)

  function addRecipe(recipe: NewRecipe) {
    recipes.value.push({
      id: recipes.value.length + 1,
      name: recipe.name,
      description: recipe.description,
    })
  }

  const editRecipe = (updatedRecipe: Recipe) => {
    const index = recipes.value.findIndex((recipe) => recipe.id === updatedRecipe.id)
    if (index !== -1) {
      recipes.value[index] = updatedRecipe
    }
  }

  return { recipes, count, addRecipe, editRecipe }
})
