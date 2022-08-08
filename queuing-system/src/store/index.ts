import { configureStore } from "@reduxjs/toolkit";
import deviceReducer from './reducers/deviceSlice';
import serviceReducer from "./reducers/serviceSlice";
import giveNumberReducer from "./reducers/giveNumberSlice";
import userReducer from "./reducers/userSlice";
import roleReducer from "./reducers/roleSlice";
import diaryReducer from "./reducers/diarySlice";
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

const store = configureStore({
    reducer: {
        userReducer,
        roleReducer,
        diaryReducer,
        serviceReducer,
        deviceReducer,
        giveNumberReducer,
    }
})

export type RootState  = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState > = useSelector

export default store