import React, { createContext, useContext, useState, useEffect } from "react";

const CurrencyContext = createContext();

export const CURRENCY_RATES = {
  INR: { symbol: "₹", rate: 1.0, name: "Indian Rupee", flag: "🇮🇳" },
  USD: { symbol: "$", rate: 0.012, name: "US Dollar", flag: "🇺🇸" },
  EUR: { symbol: "€", rate: 0.011, name: "Euro", flag: "🇪🇺" },
  GBP: { symbol: "£", rate: 0.0095, name: "British Pound", flag: "🇬🇧" },
  AED: { symbol: "د.إ", rate: 0.044, name: "UAE Dirham", flag: "🇦🇪" }
};

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem("safar_preferred_currency") || "INR";
  });

  useEffect(() => {
    localStorage.setItem("safar_preferred_currency", currency);
  }, [currency]);

  const convertPrice = (priceInInr) => {
    if (typeof priceInInr !== "number" || isNaN(priceInInr)) return 0;
    const rate = CURRENCY_RATES[currency]?.rate || 1.0;
    if (currency === "INR") return Math.round(priceInInr);
    return Math.round(priceInInr * rate * 100) / 100;
  };

  const formatPrice = (priceInInr) => {
    const converted = convertPrice(priceInInr);
    const meta = CURRENCY_RATES[currency] || CURRENCY_RATES.INR;
    if (currency === "INR") {
      return `${meta.symbol}${converted.toLocaleString("en-IN")}`;
    }
    return `${meta.symbol}${converted.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice, formatPrice, currencies: CURRENCY_RATES }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    return {
      currency: "INR",
      setCurrency: () => {},
      convertPrice: (p) => p,
      formatPrice: (p) => `₹${Number(p || 0).toLocaleString("en-IN")}`,
      currencies: CURRENCY_RATES
    };
  }
  return context;
}
