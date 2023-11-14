import { RootState } from "./index";

// menuSlice
export const menuSliceReducer = (state: RootState) => state.menuSliceReducer;

export const activePanelMenuMobileGET = (state: RootState) =>
    menuSliceReducer(state).activePanelMenuMobile;
// menuSlice close
