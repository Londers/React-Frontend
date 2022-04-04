import {configureStore} from '@reduxjs/toolkit'
import {accountSlice} from "../features/mapContainer/acccountSlice";
import {WebSocketListenerMiddleware} from "../common/Middleware";
import {mapContentSlice} from "../features/mapContainer/mapContentSlice";
// import {WebSocketMiddleware} from "../common/Middleware";

export const store = configureStore({
    reducer: {
        account: accountSlice.reducer,
        // webSocket: webSocketReducer,
        // regions: regionsReducer,
        mapContent: mapContentSlice.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(WebSocketListenerMiddleware.middleware),
    // middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(
    //     untypedMiddleware as Middleware<
    //         (action: Action<'specialAction'>) => number,
    //         RootState
    //         >
    // ).concat(),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// export type AccountState = ReturnType<typeof accountSlice.reducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch