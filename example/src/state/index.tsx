import { configureStore } from '@reduxjs/toolkit'
import { save, load } from 'redux-localstorage-simple'
import application from './application/reducer'
import user from './user/reducer'
import { gelatoReducers, GELATO_PERSISTED_KEYS } from 'soulswap-limit-orders-react'
import { gelatoReducers as gelatoStopReducers, GELATO_PERSISTED_KEYS as GELATO_STOP_PERSISTED_KEYS } from '@gelatonetwork/stop-limit-orders-react'

const PERSISTED_KEYS: string[] = ['user', ...GELATO_PERSISTED_KEYS, ...GELATO_STOP_PERSISTED_KEYS]

const store = configureStore({
  reducer: {
    application,
    user,
    ...gelatoReducers,
    ...gelatoStopReducers,
  },
  middleware: [
    // ...getDefaultMiddleware({ thunk: false }),
    save({ states: PERSISTED_KEYS, debounce: 1000 }),
  ],
  preloadedState: load({ states: PERSISTED_KEYS }),
})

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch