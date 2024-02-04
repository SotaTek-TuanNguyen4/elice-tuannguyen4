import { Action, Reducer, combineReducers, configureStore, createAction } from "@reduxjs/toolkit";
import filesSystemReducer from "@/store/filesSystem/filesSystemSlice"

const RESET_STORE_ACTION_KEY = 'rootStore/resetAll';
export const resetStore = createAction(RESET_STORE_ACTION_KEY);

const combinedReducer = combineReducers({
  filesSystem: filesSystemReducer
});

const rootReducer: Reducer = (state: ReturnType<typeof store.getState>, action: Action) => {
  if (action.type === RESET_STORE_ACTION_KEY) {
    return combinedReducer(undefined, action)
  }
  return combinedReducer(state, action)
}


export const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
