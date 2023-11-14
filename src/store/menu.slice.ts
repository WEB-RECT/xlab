import { createSlice } from "@reduxjs/toolkit";

interface IMenuSlice {
    activePanelMenuMobile: boolean;
}

const initialState: IMenuSlice = {
    activePanelMenuMobile: false,
};

export const menuSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        changeActivePanelMenuMobileACTION: (state, action) => {
            state.activePanelMenuMobile = !state.activePanelMenuMobile;
        },
    },
});

export const menuSliceActions = menuSlice.actions;
export const menuSliceReducer = menuSlice.reducer;
