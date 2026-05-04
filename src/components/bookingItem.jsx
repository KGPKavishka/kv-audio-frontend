import axios from "axios";
import { useEffect, useState } from "react";
import { removeFromCart, addToCart } from "../utils/cart";
import { FaTrash } from "react-icons/fa";

export default function BookingItem(props) {
  const { itemkey, qty, refresh } = props;
  const [item, setItem] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (status === "loading") {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${itemkey}`)
        .then((res) => {
          setItem(res.data);
          setStatus("success");
        })
        .catch((err) => {
          console.error(err);
          setStatus("error");
          removeFromCart(itemkey);
          refresh();
        });
    }
  }, [status, itemkey, refresh]);

  if (status === "loading") return null;
  if (!item) return null;

  const imageSrc =
    item.image?.length > 0
      ? item.image[0]
      : "https://via.placeholder.com/150";

  return (
<div className="w-full max-w-3xl mx-auto my-2 bg-primary border border-accent/10 rounded-xl p-4 shadow-sm hover:shadow-md transition relative">
      <FaTrash className="absolute top-[45px] right-[-25px] text-gray-400 hover:text-red-500 cursor-pointer transition" onClick={() => {
        removeFromCart(itemkey);
        refresh();
      }} />
      
      <div className="flex items-center gap-4">

        {/* Image */}
        <img
          src={imageSrc}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-lg bg-secondary"
        />

        {/* Info */}
        <div className="flex-1">
          <h2 className="text-md font-semibold text-accent">
            {item.name}
          </h2>
          <p className="text-xs text-gray-500">{item.category}</p>

          <p className="text-sm font-semibold text-accent mt-1">
            Rs. {item.price.toLocaleString()}
          </p>
        </div>

        {/* Quantity Controls (UPDATED) */}
        <div className="flex items-center gap-2">
          <button
            className="w-7 h-7 rounded-md bg-secondary text-accent font-bold hover:bg-accent hover:text-white transition"
            onClick={() => {
              if (qty === 1) {
                removeFromCart(itemkey);
              } else {
                addToCart(itemkey, - 1);
              }
              refresh();
            }}
          >
            -
          </button>

          <span className="text-sm font-semibold w-6 text-center">
            {qty}
          </span>

          <button
            className="w-7 h-7 rounded-md bg-secondary text-accent font-bold hover:bg-accent hover:text-white transition"
            onClick={() => {
              addToCart(itemkey, 1);
              refresh();
            }}
          >
            +
          </button>
        </div>

        {/* Total */}
        <div className="text-right min-w-[100px]">
          <p className="text-sm font-semibold text-accent">
            Rs. {(item.price * qty).toLocaleString()}
          </p>

          <span
            className={`text-[10px] px-2 py-1 rounded-full ${
              item.availability
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {item.availability ? "Available" : "Unavailable"}
          </span>
        </div>
      </div>
    </div>
  );
}