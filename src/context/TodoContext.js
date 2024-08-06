// TodoContext.js

import React, { createContext, useContext, useReducer } from "react";
import reducer, { initialState } from "./reducer";  // Import initialState

export const TodoLayerContext = createContext();

export const TodoLayer = ({ children }) => (
    <TodoLayerContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </TodoLayerContext.Provider>
);

export const useTodoLayerValue = () => useContext(TodoLayerContext);
