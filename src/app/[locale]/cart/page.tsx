"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaShoppingCart, FaTrash, FaPlus, FaMinus, FaArrowLeft, FaCreditCard } from "react-icons/fa";
import Image from "next/image";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export default function CartPage() {
  const t = useTranslations("cart");

  // Mock cart items - có thể tích hợp với state management sau
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: "Sản phẩm 1", price: 100000, quantity: 2, image: "/img/product1.jpg" },
    { id: 2, name: "Sản phẩm 2", price: 250000, quantity: 1, image: "/img/product2.jpg" },
    { id: 3, name: "Sản phẩm 3", price: 50000, quantity: 3, image: "/img/product3.jpg" },
  ]);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 30000; // Mock shipping fee
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 mb-4 hover:text-blue-600 transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>{t("continueShopping")}</span>
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {t("title")}
          </h1>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border-2 border-blue-200 shadow-xl p-12 text-center">
            <FaShoppingCart className="w-24 h-24 mx-auto mb-6 text-gray-300" />
            <h2 className="text-2xl font-bold mb-4">{t("emptyCart")}</h2>
            <p className="text-gray-600 mb-8">{t("emptyCartDescription")}</p>
            <Link
              href="/products"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 hover:scale-105"
            >
              <FaShoppingCart className="w-4 h-4" />
              <span>{t("startShopping")}</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/80 backdrop-blur-md rounded-2xl border-2 border-blue-200 shadow-lg p-6 hover:shadow-xl transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <div className="w-full sm:w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FaShoppingCart className="w-12 h-12 text-gray-400" />
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                      <p className="text-xl font-bold text-blue-600 mb-4">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.price)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium">{t("quantity")}:</span>
                        <div className="flex items-center space-x-2 border-2 border-gray-300 rounded-lg">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 transition-colors rounded-l-lg"
                            aria-label="Decrease quantity"
                          >
                            <FaMinus className="w-3 h-3" />
                          </button>
                          <span className="px-4 py-2 min-w-[3rem] text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg"
                            aria-label="Increase quantity"
                          >
                            <FaPlus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button & Total */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Remove item"
                      >
                        <FaTrash className="w-5 h-5" />
                      </button>
                      <p className="text-lg font-bold text-gray-900 mt-auto">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl border-2 border-blue-200 shadow-xl p-6 sticky top-6">
                <h2 className="text-xl font-bold mb-6">{t("orderSummary")}</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>{t("subtotal")}</span>
                    <span className="font-medium">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("shipping")}</span>
                    <span className="font-medium">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(shipping)}
                    </span>
                  </div>
                  <div className="border-t-2 border-gray-200 pt-4 flex justify-between">
                    <span className="text-lg font-bold">{t("total")}</span>
                    <span className="text-lg font-bold text-blue-600">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(total)}
                    </span>
                  </div>
                </div>

                <button
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 hover:scale-105 font-semibold"
                >
                  <FaCreditCard className="w-5 h-5" />
                  <span>{t("checkout")}</span>
                </button>

                <Link
                  href="/products"
                  className="block text-center mt-4 text-blue-600 hover:text-blue-700 hover:underline text-sm"
                >
                  {t("continueShopping")}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

