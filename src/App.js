import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloClientProvider } from './ApolloClient'; // Import Apollo Client Provider
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import Cart from './components/Cart';

class App extends Component {
  render() {
    return (
      <ApolloClientProvider>
        <Router>
          <div>
            <h1>Hello there is ...... </h1>
            <Cart></Cart>
            <ProductListPage></ProductListPage>
            <Routes>
              <Route path="/" exact component={ProductListPage} />
              <Route path="/product/:id" component={ProductDetailPage} />
              <Route path="/cart" component={Cart} />
            </Routes>
          </div>
        </Router>
      </ApolloClientProvider>
    );
  }
}

export default App;
