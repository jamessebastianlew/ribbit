import React, { createContext, useReducer } from 'react';
import globalReducer from '../reducers/global-reducer.js';


const initialValue = {};
const GlobalContext = createContext(initialValue);

const initGlobalState = {
};

const GlobalProvider = ({ children }) => {
    const [globalState, globalDispatch] = useReducer(globalReducer, initGlobalState);
    return <GlobalContext.Provider value={{ globalState, globalDispatch }}>{children}</GlobalContext.Provider>
}

export default GlobalProvider;
export { GlobalContext };
