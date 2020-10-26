import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from '../reducers';

const store = createStore(rootReducer);

export function AppProvider({ children }) {

    return <Provider store={store}>
        {children}
    </Provider>
}

export default store;
