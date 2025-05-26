import type { PiniaPluginContext } from 'pinia'

export const localStoragePlugin = (context: PiniaPluginContext) => {
  const { store } = context
  const storedState = localStorage.getItem(store.$id)

  // mutation to alter the state
  if (storedState) {
    store.$patch(JSON.parse(storedState))
  }

  //watch state
  store.$subscribe((mutation, state) => {
    localStorage.setItem(store.$id, JSON.stringify(state))
  })
}
