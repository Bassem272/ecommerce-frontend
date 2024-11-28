import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import { ApolloClientProvider } from './ApolloClient'; // Import Apollo Client Provider
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import Header from './components/shared/Header';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: JSON.parse(localStorage.getItem('cart')) || [],
      activeCategory: 'All', // New state for active category
    };
  }

  componentDidMount() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    this.setState({ cartItems });
  }

  addToCart = (product) => {
    // const { cartItems } = this.state;

    const cartItems = JSON.parse(localStorage.getItem('cart'))
    console.log('add_tocart_before_cart', cartItems)
    const updatedCart = [...cartItems, product];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    console.log('add_tocart', updatedCart)
    this.setState({ cartItems: updatedCart });
    console.log('added_setstate', updatedCart)
  };

  handleCategoryChange = (category) => {
    this.setState({ activeCategory: category }); // Update active category state
  }; 

  render() {
    const { cartItems, activeCategory } = this.state;
    return (
      <ApolloClientProvider>
         <BrowserRouter>
        {/* <Router> */}
          <Header cartItems={cartItems} onCategoryChange={this.handleCategoryChange} />
          <div>
            
            <Routes>
            <Route path="/" element={<ProductListPage addToCart={this.addToCart} activeCategory={activeCategory} />} />
              <Route path="/product/:id" element={<ProductDetailPage/>} />
              
            </Routes>
          </div>
        {/* </Router> */}
         </BrowserRouter>
      </ApolloClientProvider>
    );
  }
}

export default App;
