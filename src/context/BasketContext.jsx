import React, { createContext, useState, useContext, useEffect } from "react";

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
    const [basketItems, setBasketItems] = useState(() => {
        const storedItems = localStorage.getItem('basket');
        return storedItems ? JSON.parse(storedItems) : [];
    });

    useEffect(() => {
        localStorage.setItem('basket', JSON.stringify(basketItems));
    }, [basketItems]);

    const addToBasket = (product) => {
        // console.log(product);
        const productNumber = `${product.name}_${product.size || "Grande"}`;

        setBasketItems(prev => {
            const existing = prev.find(item => item.productNumber === productNumber);

            if (existing) {
                return prev.map(item =>
                    item.productNumber === productNumber
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prev, { ...product, productNumber, quantity: 1 }];
            }
        });
    };


    // Funksiyalar name üzrə

    const increaseQuantityByName = (name) => {
        setBasketItems(prev =>
            prev.map(item =>
                item.name === name ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantityByName = (name) => {
        setBasketItems(prev =>
            prev
                .map(item =>
                    item.name === name ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    const removeByName = (name) => {
        setBasketItems(prev => prev.filter(item => item.name !== name));
    };

    // Əlavə olaraq productNumber ilə işləyən funksiyalar (əgər ehtiyac varsa)

    const increaseQuantity = (productNumber) => {
        setBasketItems(prev =>
            prev.map(item =>
                item.productNumber === productNumber
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decreaseQuantity = (productNumber) => {
        setBasketItems(prev =>
            prev
                .map(item =>
                    item.productNumber === productNumber
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    const removeFromBasket = (productNumber) => {
        setBasketItems(prev => prev.filter(item => item.productNumber !== productNumber));
    };
    const editFromBasket = (productNumber, updateProduct) => {
        setBasketItems(prev => (
            prev.map(item => (
                item.productNumber === productNumber
                    ? { ...item, ...updateProduct }
                    : item))
        ))
    }

    return (
        <BasketContext.Provider
            value={{
                basketItems,
                addToBasket,
                increaseQuantity,
                decreaseQuantity,
                removeFromBasket,
                increaseQuantityByName,
                decreaseQuantityByName,
                removeByName,
                editFromBasket
            }}
        >
            {children}
        </BasketContext.Provider>
    );
};

export const useBasket = () => useContext(BasketContext);
