import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import AppProvider from './store/store';
import NavBar from './components/NavBar/NavBar';
import AddSales from './components/AddSales/AddSales';
import ProductListContainer from './containers/ProductListContainer';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/sales">
            <AddSales />
          </Route>
          <Route exact path="/products">
            <ProductListContainer />
          </Route>
        </Switch>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
