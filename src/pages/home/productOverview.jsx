import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ImageSlider from "../../components/imageSlider";
import { addToCart, loadCart } from "../../utils/cart";
import toast from "react-hot-toast";

export default function ProductOverview() {

    const params = useParams();
    const key = params.key;
    const [loadingStatus, setLoadingStatus] = useState("loading");
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${key}`).then((res) => {
            setProduct(res.data);
            setLoadingStatus("loaded");
            console.log(res.data);
        }).catch((err) => {
            console.error(err);
            setLoadingStatus("error");
        })
    }, [])

    return (
        <div className="w-full h-full flex justify-center">
            {
                loadingStatus == "loading" && <div className="w-full h-full flex items-center justify-center">
                    <div className="w-[60px] h-[60px] rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin"></div>
                </div>
            }
            {
                loadingStatus == "loaded" && (
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="w-[49%] h-full">
                            <ImageSlider images={product.image} />
                        </div>



                        <div className="w-[49%] h-full flex flex-col items-center justify-center text-center px-8">
                            <h1 className="text-3xl font-bold text-accent">
                                {product.name}
                            </h1>

                            <h2 className="text-xl text-gray-800 mt-2">
                                {product.category}
                            </h2>

                            <p className="text-md text-gray-700 mt-4 max-w-[600px]">
                                {product.description}
                            </p>

                            <p className="text-lg text-green-700 font-bold mt-4">
                                Rs. {product.price}
                            </p>

                            <div className="text-gray-500 my-4">
                                <span className="font-medium">Dimensions:</span> {product.dimensions}
                            </div>

                            {/* <button className="w-[200px] h-[50px] bg-green-400 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 mt-4">
                                Buy Now
                            </button> */}

                            <button className="w-[200px] h-[50px] bg-blue-400 text-white rounded-lg hover:bg-green-400 transition-colors duration-300 mt-4" onClick={()=>{
                                addToCart(product.key, 1);
                                toast.success("Added to cart");
                                console.log(loadCart());
                            }}>
                                Add to Cart
                            </button>
                        </div>

                    </div>
                )
            }
            {
                loadingStatus == "error" && <div className="w-full h-full flex items-center justify-center">
                    <p className="text-3xl font-bold text-red-500">Error Occured</p>
                </div>
            }
        </div>
    )
}