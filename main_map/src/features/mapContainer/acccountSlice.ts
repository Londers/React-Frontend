import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../../app/store'
import {
    Access,
    AccountState,
    Area,
    AreaZone,
    Fragment,
    FragmentMsg,
    LoginMsg,
    LogoutMsg,
    MapInfoMsg
} from "../../common";

const initialState: AccountState = {
    access: undefined,
    area: undefined,
    authorizedFlag: localStorage.getItem("login") !== '',
    boxPoint: {point0: {Y: 53, X: 44}, point1: {Y: 55, X: 46}},
    description: "",
    fragments: [],
    license: "",
    region: "",
    role: "",
    login: localStorage.getItem("login") ?? "",
    status: false,
    message: undefined
}

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
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
        },
        setLogged: (state, action: PayloadAction<LoginMsg>) => {
            if (action.payload.status) {
                state.authorizedFlag = action.payload.authorizedFlag
                state.access = action.payload.access
                state.area = action.payload.area
                state.description = action.payload.description
                state.fragments = action.payload.fragments
                state.region = action.payload.region
                state.role = action.payload.role
                state.status = false
                state.message = undefined
                state.login = action.payload.login
                localStorage.setItem("login", state.login)
                document.cookie = ('Authorization=Bearer ' + action.payload.token);
            } else {
                state.status = true
                state.message = action.payload.message
            }
        },
        setLogouted: (state, action: PayloadAction<LogoutMsg>) => {
            localStorage.setItem("login", "")
            Object.assign(state, {...initialState, boxPoint: state.boxPoint, license: state.license, authorizedFlag: false})
        },
        setFragments: (state, action: PayloadAction<FragmentMsg>) => {
            state.fragments = action.payload.fragment
        },
        clearLoginError: (state, action: PayloadAction<undefined>) => {
            state.status = false
            state.message = undefined
        },
    }
})

export const {fillAccountData, setLogged, setLogouted, setFragments, clearLoginError} = accountSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAccess = (state: RootState) => state.account.access
export const selectAuthorized = (state: RootState) => state.account.authorizedFlag
export const selectError = (state: RootState) => [state.account.status, state.account.message]

export default accountSlice.reducer