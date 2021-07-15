const reducers = [
    (state, action) => {
        switch(action.type) {
            case 'SET_KEY':
                const newState = { ...state };
                const { key, value } = action.payload;
                newState[key] = value;
                return newState;
            default:
                break;
        }

        return { ...state };
    },
]

const globalReducer = (state, action) => {
    const { state: newState } = reducers.reduce(({state, action}, currReducer) => {
        return { action, state: currReducer(state, action) };
    }, {state, action});

    return newState;
}

export default globalReducer;
