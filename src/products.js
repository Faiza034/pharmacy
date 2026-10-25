import front from "./assets/yumvit-front.png";
import back from "./assets/yumvit-back.png";
import { PRICE_PKR } from "./config";

// Add more products here and they appear in the shop automatically.
export const PRODUCTS = [
  {
    id: "yumvit-strawberry",
    name: "Yumvit Kids Multivitamin Gummies",
    flavor: "Strawberry",
    size: "30 gummies",
    price: PRICE_PKR,
    images: [front, back],
    short: "Pectin-based, halal certified strawberry gummies for children 4+.",
    points: [
      "Strawberry flavor kids look forward to",
      "30-gummy bottle, pectin-based and halal certified",
      "Free from gelatin, gluten, dairy, nuts and soy",
      "Directions and age guidance printed on the pack",
      "Made by MEDSOL Pharmaceutical, Lahore",
    ],
  },
];

export const getProduct = (id) => PRODUCTS.find((p) => p.id === id);
export const money = (n) => `Rs ${Number(n).toLocaleString("en-PK")}`;
