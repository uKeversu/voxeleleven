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

    size: string;

    quantity: number;
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

    totalItems: number;

    totalPrice: number;
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

    const getEstoqueDisponivel = (
        product: Product,
        size: string
    ) => {
        return product.stock[size] ?? 0;
    };

    const isNoLimiteEstoque = (
        item: CartItem
    ) => {
        return (
            item.quantity >=
            getEstoqueDisponivel(
                item.product,
                item.size
            )
        );
    };

    /*
     =========================
     LOAD LOCALSTORAGE
     =========================
    */
    useEffect(() => {
        const storedCart =
            localStorage.getItem("voxel-cart");

        if (!storedCart) return;

        const parsed: CartItem[] =
            JSON.parse(storedCart);

        const carrinhoValido =
            parsed.filter((item) => {
                const estoque =
                    item.product.stock[item.size] ?? 0;

                return estoque > 0;
            });

        setCartItems(carrinhoValido);
    }, []);

    /*
     =========================
     SAVE LOCALSTORAGE
     =========================
    */
    useEffect(() => {
        localStorage.setItem(
            "voxel-cart",
            JSON.stringify(cartItems)
        );
    }, [cartItems]);

    /*
     =========================
     ADD
     =========================
    */
    const addToCart = (
        product: Product,
        size: string
    ) => {
        setCartItems((prev) => {

            const estoqueDisponivel =
                product.stock[size] ?? 0;

            const existingItem = prev.find(
                (item) =>
                    item.product.id === product.id &&
                    item.size === size
            );

            if (existingItem) {

                if (
                    existingItem.quantity >=
                    estoqueDisponivel
                ) {
                    return prev;
                }

                return prev.map((item) =>
                    item.product.id === product.id &&
                        item.size === size
                        ? {
                            ...item,
                            quantity:
                                item.quantity + 1,
                        }
                        : item
                );
            }

            if (estoqueDisponivel <= 0) {
                return prev;
            }

            return [
                ...prev,
                {
                    product,
                    size,
                    quantity: 1,
                },
            ];
        });
    };

    /*
     =========================
     REMOVE
     =========================
    */
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

    /*
     =========================
     INCREASE
     =========================
    */
    const increaseQuantity = (
        productId: number,
        size: string
    ) => {
        setCartItems((prev) =>
            prev.map((item) => {

                if (
                    item.product.id === productId &&
                    item.size === size
                ) {

                    const estoqueDisponivel =
                        item.product.stock[size] ?? 0;

                    if (
                        item.quantity >=
                        estoqueDisponivel
                    ) {
                        return item;
                    }

                    return {
                        ...item,
                        quantity:
                            item.quantity + 1,
                    };
                }

                return item;
            })
        );
    };

    /*
     =========================
     DECREASE
     =========================
    */
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

    /*
     =========================
     CLEAR
     =========================
    */
    const clearCart = () => {
        setCartItems([]);
    };

    /*
     =========================
     TOTAL ITEMS
     =========================
    */
    const totalItems = useMemo(() => {
        return cartItems.reduce(
            (acc, item) =>
                acc + item.quantity,
            0
        );
    }, [cartItems]);

    /*
     =========================
     TOTAL PRICE
     =========================
    */
    const totalPrice = useMemo(() => {
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

                totalItems,

                totalPrice,
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