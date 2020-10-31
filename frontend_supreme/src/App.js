import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

import AppProvider from './store/store';
import NavBar from './components/NavBar/NavBar';
import SalesListContainer from './containers/SalesListContainer';
import AddSalesContainer from './containers/AddSalesContainer';
import ProductListContainer from './containers/ProductListContainer';
import CustomerListContainer from './containers/CustomerListContainer';
import RootComponents from './components/RootComponents/RootComponents';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <NavBar />
        <RootComponents />
        <Switch>
          <Route exact path="/sales">
            <SalesListContainer />
          </Route>
          <Route exact path="/add-sales">
            <AddSalesContainer />
          </Route>
          <Route exact path="/crackers">
            <ProductListContainer />
          </Route>
          <Route exact path="/customers">
            <CustomerListContainer />
          </Route>
          <Route exact path="">
            <Redirect to="/sales" />
          </Route>
        </Switch>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
