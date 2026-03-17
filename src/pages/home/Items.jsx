import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard";
import toast from "react-hot-toast";

export default function Items() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [state, setState] = useState("loading");
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (state === "loading") {
      axios
        .get(`${backendUrl}/api/products`)
        .then((res) => {
          console.log(res.data);
          setItems(res.data);
          setState("success");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error || "An error occurred while fetching items.");
          setState("error");
        });
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-wrap justify-center pt-[50px]">
      {state === "loading" && (
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[50px] h-[50px] border-4 rounded-full border-t-green-300 animate-spin"></div>
        </div>
      )}

      {state === "success" &&
        items.map((item) => {
          return <ProductCard key={item.key} item={item} />;
        })}
    </div>
  );
}