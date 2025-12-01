import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import { homeSlice } from './home'
import { flightsSlice } from './flights'
import { hotelsSlice } from './hotels'
import { userSlice } from './user.ts'

export const store = configureStore({
    reducer: {
        home: homeSlice.reducer,
        flights: flightsSlice.reducer,
        hotels: hotelsSlice.reducer,
        user: userSlice.reducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();