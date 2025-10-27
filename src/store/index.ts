import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import { homeSlice } from './home'
import { optionsSlice } from './options'
import { headerSlice } from './header'
import { footerSlice } from './footer'
import { flightsSlice } from './flights'
import { hotelsSlice } from './hotels'

export const store = configureStore({
    reducer: {
        home: homeSlice.reducer,
        options: optionsSlice.reducer,
        header: headerSlice.reducer,
        footer: footerSlice.reducer,
        flights: flightsSlice.reducer,
        hotels: hotelsSlice.reducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();