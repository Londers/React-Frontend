import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import {AccountState, Fragment, MapInfo} from "../../common";

const initialState: AccountState = {
    access: undefined,
    area: undefined,
    authorizedFlag: false,
    boxPoint: undefined,
    description: "",
    fragments: [],
    license: "",
    region: "",
    role: ""
}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setLogged: (state, action: PayloadAction<boolean>) => {
            state.authorizedFlag = action.payload
        },
        setFragments: (state, action: PayloadAction<Fragment[]>) => {
            state.fragments = action.payload
        },
        fillAccountData: (state, action: PayloadAction<MapInfo>) => {
            state.access = action.payload.access
            state.area = action.payload.area
            state.authorizedFlag = action.payload.authorizedFlag
            state.boxPoint = action.payload.boxPoint
            state.description = action.payload.description
            state.fragments = action.payload.fragments
            state.license = action.payload.license
            state.region = action.payload.region
            state.role = action.payload.role
        }
    }
})

export const { setLogged, setFragments, fillAccountData } = accountSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAccess = (state: RootState) => state.account.access

export default accountSlice.reducer