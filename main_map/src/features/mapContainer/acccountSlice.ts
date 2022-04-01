import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../../app/store'
import {AccountState, FragmentMsg, LoginMsg, MapInfoMsg} from "../../common";

const initialState: AccountState = {
    access: undefined,
    area: undefined,
    authorizedFlag: false,
    boxPoint: {point0: {Y: 53, X: 44}, point1: {Y: 55, X: 46}},
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
        setLogged: (state, action: PayloadAction<LoginMsg>) => {
            state.authorizedFlag = action.payload.authorizedFlag
        },
        setFragments: (state, action: PayloadAction<FragmentMsg>) => {
            state.fragments = action.payload.fragment
        },
        fillAccountData: (state, action: PayloadAction<MapInfoMsg>) => {
            if (action.payload.authorizedFlag) {
                state.access = action.payload.access
                state.area = action.payload.area
                state.description = action.payload.description
                state.fragments = action.payload.fragments
                state.region = action.payload.region
                state.role = action.payload.role
            }
            state.authorizedFlag = action.payload.authorizedFlag
            state.boxPoint = action.payload.boxPoint
            state.license = action.payload.license

        }
    }
})

export const {setLogged, setFragments, fillAccountData} = accountSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAccess = (state: RootState) => state.account.access

export default accountSlice.reducer