"use client"

import { Provider } from "react-redux"
import { createStore } from ".";

export function StoreProvider({ children }: {
    children: React.ReactNode
}) {
    const store = createStore()
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}