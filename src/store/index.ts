import { configureStore } from "@reduxjs/toolkit";
import { addressAPI } from "../services/AddressServices";
import { menuSliceReducer } from "./menu.slice";

export const store = configureStore({
    reducer: {
        menuSliceReducer,
        [addressAPI.reducerPath]: addressAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(addressAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
