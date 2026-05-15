// src/context/CartContext.tsx

"use client";

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    ReactNode,
} from "react";

import { Product } from "@/types/product";

export type CartItem = {
    product: Product;

    quantity: number;

    size: string;
};

type CartContextType = {
    cartItems: CartItem[];

    addToCart: (
        product: Product,
        size: string
    ) => void;

    removeFromCart: (
        productId: number,
        size: string
    ) => void;

    increaseQuantity: (
        productId: number,
        size: string
    ) => void;

    decreaseQuantity: (
        productId: number,
        size: string
    ) => void;

    clearCart: () => void;

    cartCount: number;

    subtotal: number;
};

const CartContext =
    createContext<CartContextType | null>(
        null
    );

export function CartProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [cartItems, setCartItems] =
        useState<CartItem[]>([]);

    // LOAD LOCALSTORAGE
    useEffect(() => {
        const storedCart =
            localStorage.getItem(
                "voxeleven-cart"
            );

        if (storedCart) {
            setCartItems(
                JSON.parse(storedCart)
            );
        }
    }, []);

    // SAVE LOCALSTORAGE
    useEffect(() => {
        localStorage.setItem(
            "voxeleven-cart",
            JSON.stringify(cartItems)
        );
    }, [cartItems]);

    // ADD
    const addToCart = (
        product: Product,
        size: string
    ) => {
        setCartItems((prev) => {
            const existingItem =
                prev.find(
                    (item) =>
                        item.product.id ===
                            product.id &&
                        item.size === size
                );

            // JA EXISTE
            if (existingItem) {
                return prev.map((item) =>
                    item.product.id ===
                        product.id &&
                    item.size === size
                        ? {
                              ...item,

                              quantity:
                                  item.quantity +
                                  1,
                          }
                        : item
                );
            }

            // NOVO ITEM
            return [
                ...prev,
                {
                    product,
                    quantity: 1,
                    size,
                },
            ];
        });
    };

    // REMOVE
    const removeFromCart = (
        productId: number,
        size: string
    ) => {
        setCartItems((prev) =>
            prev.filter(
                (item) =>
                    !(
                        item.product.id ===
                            productId &&
                        item.size === size
                    )
            )
        );
    };

    // INCREASE
    const increaseQuantity = (
        productId: number,
        size: string
    ) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.product.id ===
                    productId &&
                item.size === size
                    ? {
                          ...item,

                          quantity:
                              item.quantity + 1,
                      }
                    : item
            )
        );
    };

    // DECREASE
    const decreaseQuantity = (
        productId: number,
        size: string
    ) => {
        setCartItems((prev) =>
            prev
                .map((item) =>
                    item.product.id ===
                        productId &&
                    item.size === size
                        ? {
                              ...item,

                              quantity:
                                  item.quantity -
                                  1,
                          }
                        : item
                )
                .filter(
                    (item) =>
                        item.quantity > 0
                )
        );
    };

    // CLEAR
    const clearCart = () => {
        setCartItems([]);
    };

    // TOTAL ITENS
    const cartCount = useMemo(() => {
        return cartItems.reduce(
            (acc, item) =>
                acc + item.quantity,
            0
        );
    }, [cartItems]);

    // SUBTOTAL
    const subtotal = useMemo(() => {
        return cartItems.reduce(
            (acc, item) =>
                acc +
                item.product.price *
                    item.quantity,
            0
        );
    }, [cartItems]);

    return (
        <CartContext.Provider
            value={{
                cartItems,

                addToCart,

                removeFromCart,

                increaseQuantity,

                decreaseQuantity,

                clearCart,

                cartCount,

                subtotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context =
        useContext(CartContext);

    if (!context) {
        throw new Error(
            "useCart must be used inside CartProvider"
        );
    }

    return context;
}