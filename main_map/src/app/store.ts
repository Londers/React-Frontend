import {configureStore} from '@reduxjs/toolkit'
import {accountSlice} from "../features/mapContainer/acccountSlice";

export const store = configureStore({
    reducer: {
        account: accountSlice.reducer,
        // webSocket: webSocketReducer,
        // regions: regionsReducer,
        // trafficLights: trafficLightsReducer,
    },
    // middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(
    //     untypedMiddleware as Middleware<
    //         (action: Action<'specialAction'>) => number,
    //         RootState
    //         >
    // ).concat(),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch