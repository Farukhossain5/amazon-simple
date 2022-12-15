import React, { useEffect, useState } from 'react';
import Cart from '../cart/Cart';
import Product from '../Product/Product';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import './Shop.css'
const Shop = () => {
    const [products, setProducts] = useState([]);

    const [cart, setCart] = useState([]);

    useEffect(() => {
        console.log('product fast before fetch')
        fetch('products.json')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                console.log('product lodeded')

            });
    }, [])

    useEffect(() => {
        console.log('lacal storage first line')
        const storedCart = getStoredCart();
        for (const id in storedCart) {
            const addedProduct = products.find(product => product.id === id);
            console.log(addedProduct);
        }
        console.log('local store finish')
    }, [])
    const handleAddToCart=(product)=>{
        // console.log(product);
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id)
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
           </div>
            <div className="cart-container">
               <Cart cart={cart}></Cart>
           </div>
        </div>
    );
};

export default Shop;