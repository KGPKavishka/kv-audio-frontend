import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddItemPage() {

    const [productKey, setProductKey] = useState("");
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productDimensions, setProductDimensions] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const navigate = useNavigate();

    async function handleAddItem() {
        console.log(productKey, productName, productPrice, productCategory, productDimensions, productDescription)

        const token = localStorage.getItem("token");

        if (token) {
            try {

                const result = await axios.post("http://localhost:3000/api/products", {
                    key: productKey,
                    name: productName,
                    price: productPrice,
                    category: productCategory,
                    dimensions: productDimensions,
                    description: productDescription
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                toast.success(result.data.message);
                navigate("/admin/items");

            } catch (err) {
                toast.error(err.response.data.message);
            }
        } else {
            toast.error("You must be logged in to add an item.");
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">

            <h1 className="text-2xl font-semibold">Add Items</h1>

            <div className="w-[400px] border rounded-lg p-4 flex flex-col gap-3">

                <input
                    type="text"
                    placeholder="Product Key"
                    value={productKey}
                    onChange={(e) => setProductKey(e.target.value)}
                    className="border p-2 rounded"
                />

                <input
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="border p-2 rounded"
                />

                <input
                    type="number"
                    placeholder="Product Price"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="border p-2 rounded"
                />

                <select
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="" disabled>
                        Select Category
                    </option>
                    <option value="Audio">Audio</option>
                    <option value="Lighting">Lighting</option>
                </select>

                <input
                    type="text"
                    placeholder="Product Dimensions"
                    value={productDimensions}
                    onChange={(e) => setProductDimensions(e.target.value)}
                    className="border p-2 rounded"
                />

                <input
                    type="text"
                    placeholder="Product Description"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="border p-2 rounded"
                />

                <button onClick={handleAddItem} className="bg-blue-500 text-white py-2 rounded hover:opacity-90">
                    Add Item
                </button>
                <button onClick={() => navigate("/admin/items")} className="bg-gray-500 text-white py-2 rounded hover:opacity-90">
                    Cancel
                </button>
            </div>
        </div>
    );
}
