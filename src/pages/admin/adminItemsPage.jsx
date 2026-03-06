import axios from "axios";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

const sampleArr = [
  {
    key: "AUD-001",
    name: "JBL PartyBox 310",
    price: 185000,
    category: "Audio",
    dimensions: "32cm x 69cm x 36cm",
    availability: true
  }
];

export default function AdminItemsPage() {
  const [items, setItems] = useState(sampleArr);
  const [itemsLoaded, setItemsLoaded] = useState(false);

  useEffect(() => {
    
    if(!itemsLoaded){
      const token = localStorage.getItem("token");
      axios.get("http://localhost:3000/api/products", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        setItems(res.data);
        setItemsLoaded(true);
      })
      .catch((err) => {
        console.error(err)
      });
    }

  }, [itemsLoaded]);  

  const handleDelete = (key) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    setItems(items.filter((item) => item.key !== key));

    const token = localStorage.getItem("token");
    axios.delete(`http://localhost:3000/api/products/${key}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(
      (res) => {
        console.log(res.data);
        setItemsLoaded(false);
      }
    ).catch(
      (err) => {
        console.error(err);
      }
    )
  };

  return (
    <div className="w-full h-full p-6 bg-gray-50 relative flex items-center flex-col">

      {!itemsLoaded && <div className="border-4 my-4 border-b-green-500 rounded-full animate-spin w-[50px] h-[50px]"></div>}
      <h1 className="text-2xl font-semibold mb-6">📦 Products</h1>

      {itemsLoaded && <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="px-4 py-3 text-left">Key</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Price (LKR)</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Dimensions</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {items.map((product, index) => (
              <tr
                key={product.key}
                className={`border-t hover:bg-gray-50 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-4 py-3 font-medium">{product.key}</td>
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">
                  {product.price.toLocaleString()}
                </td>
                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3">{product.dimensions}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.availability
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.availability ? "In Stock" : "Out of Stock"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-3">
                    <Link
                      to={`/admin/items/edit/${product.key}`}
                      className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                    >
                      <FiEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(product.key)}
                      className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>}

      {/* Floating Add Button */}
      <Link to="/admin/items/add">
        <CiCirclePlus className="text-[70px] fixed right-10 bottom-10 text-blue-600 hover:text-green-500 transition" />
      </Link>
    </div>
  );
}