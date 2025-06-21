import React, { createContext, useState, useContext } from "react";

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
    const [basketItems, setBasketItems] = useState([]);

    // uniqueId yaratmaq: məhsulun id-si və ölçüsünü birləşdiririk
    const getUniqueId = (product) => `${product.id}_${product.size || "Grande"}`;

    const addToBasket = (product) => {
        const uniqueId = getUniqueId(product);

        setBasketItems((prev) => {
            const existing = prev.find((item) => item.uniqueId === uniqueId);
            if (existing) {
                // mövcud məhsul varsa sayını artır
                return prev.map((item) =>
                    item.uniqueId === uniqueId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // yeni məhsul əlavə et
                return [...prev, { ...product, quantity: 1, uniqueId }];
            }
        });
    };

    const increaseQuantity = (uniqueId) => {
        setBasketItems((prev) =>
            prev.map((item) =>
                item.uniqueId === uniqueId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decreaseQuantity = (uniqueId) => {
        setBasketItems((prev) =>
            prev
                .map((item) =>
                    item.uniqueId === uniqueId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const removeFromBasket = (uniqueId) => {
        setBasketItems((prev) => prev.filter((item) => item.uniqueId !== uniqueId));
    };

    return (
        <BasketContext.Provider
            value={{
                basketItems,
                addToBasket,
                increaseQuantity,
                decreaseQuantity,
                removeFromBasket,
            }}
        >
            {children}
        </BasketContext.Provider>
    );
};

export const useBasket = () => useContext(BasketContext);
