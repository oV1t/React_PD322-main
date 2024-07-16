import React from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Initial state for the product slice
const initialState = {
    items: [
        { id: 1, name: 'Товар 1', price: 100 },
        { id: 2, name: 'Товар 2', price: 200 },
        { id: 3, name: 'Товар 3', price: 300 }
    ],
    cart: []
};

// Create a product slice with reducers
const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                state.cart.push(item);
            }
        }
    }
});

const { addToCart } = productsSlice.actions;

// Configure the store with the product slice reducer
const store = configureStore({
    reducer: {
        products: productsSlice.reducer
    }
});

// Component for displaying the cart counter
const CartCounter = () => {
    const cartCount = useSelector((state) => state.products.cart.length);

    return (
        <div>
            <span>Кошик ({cartCount})</span>
        </div>
    );
};

// Header component with cart counter
const Header = () => {
    return (
        <header>
            <h1>Магазин</h1>
            <CartCounter />
        </header>
    );
};

// Component for displaying the list of products
const ProductsList = () => {
    const items = useSelector((state) => state.products.items);
    const dispatch = useDispatch();

    return (
        <div>
            <h1>Список товарів</h1>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.name} - ${item.price}
                        <button onClick={() => dispatch(addToCart(item.id))}>
                            Додати до кошика
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Component for displaying the cart items
const Cart = () => {
    const cart = useSelector((state) => state.products.cart);

    return (
        <div>
            <h2>Кошик</h2>
            <ul>
                {cart.map((item, index) => (
                    <li key={index}>
                        {item.name} - ${item.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Main shop page component
const ShopPage = () => {
    return (
        <Provider store={store}>
            <div>
                <Header />
                <ProductsList />
                <Cart />
            </div>
        </Provider>
    );
};

export default ShopPage;
