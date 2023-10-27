import { reducer as userReducer } from './user';
import { reducer as profileReducer } from './profile';
import { configureStore } from '@reduxjs/toolkit';

export function createStore(preloadedState = {}) {
    const store = configureStore({
        reducer: {
            user: userReducer,
            profile: profileReducer,
        },
        preloadedState,
    });

    return store;
}

export const store = createStore();
