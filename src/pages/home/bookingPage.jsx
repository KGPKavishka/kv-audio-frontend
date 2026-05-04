import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import { formatDate, loadCart } from "../../utils/cart";
import BookingItem from "../../components/bookingItem";

export default function BookingPage() {

    const [cart, setCart] = useState(loadCart());

    const today = formatDate(new Date());
    const tomorrow = formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000));

    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(tomorrow);

    const [total, setTotal] = useState(0);

    function reloadCart() {
        setCart(loadCart());
        calculateTotal();
    }

    useEffect(() => {
        calculateTotal();
    }, [startDate, endDate]);

    function calculateTotal() {
        const cartInfo = loadCart();
        cartInfo.startDate = startDate;
        cartInfo.endDate = endDate;
        cartInfo.days = totalDays;
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/quote`,
            cartInfo
        )
        .then((res) => {
            console.log(res.data);
            setTotal(res.data.total);
        })
        .catch((err) => {
            console.error(err);
        });
    }

    // ✅ FIXED date calculation
    const totalDays = useMemo(() => {
        if (!startDate || !endDate) return 0;

        const start = new Date(startDate + "T00:00:00");
        const end = new Date(endDate + "T00:00:00");

        const diffTime = end.getTime() - start.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays > 0 ? diffDays : 0;
    }, [startDate, endDate]);

    // ✅ FIXED booking handler
    function handleBookingCreation() {

        // Validation
        if (cart.orderedItems.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        if (totalDays <= 0) {
            toast.error("Please select a valid date range");
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Please login first");
            return;
        }

        const bookingData = {
            ...loadCart(),
            startingDate: startDate,
            endingDate: endDate,
            days: totalDays
        };

        const url = `${import.meta.env.VITE_BACKEND_URL}/api/orders`;

        console.log("Sending booking:", bookingData);
        console.log("API URL:", url);

        axios.post(url, bookingData, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            console.log("SUCCESS:", res.data);
            localStorage.removeItem("cart");
            toast.success("Booking created successfully!");
            setCart(loadCart());
        })
        .catch((err) => {
            console.error("ERROR:", err);
            console.error("RESPONSE:", err?.response);
            toast.error(
                err?.response?.data?.message || "Failed to create booking"
            );
        });
    }

    return (
        <div className="w-full h-full flex flex-col items-center gap-6">
            <h1 className="text-xl font-semibold">Create Booking</h1>

            {/* Date Section */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-5 flex flex-col gap-5">

                <h2 className="text-lg font-semibold text-gray-800">
                    Select Dates
                </h2>

                <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-500 font-medium">
                        Start Date
                    </label>
                    <input
                        type="date"
                        value={startDate}
                        min={today}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="bg-gray-100 px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-primary transition"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-500 font-medium">
                        End Date
                    </label>
                    <input
                        type="date"
                        value={endDate}
                        min={startDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="bg-gray-100 px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-primary transition"
                    />
                </div>

                {/* Duration */}
                <div className="w-full flex justify-center items-center bg-gray-50 px-4 py-3 rounded-xl font-medium">
                    <span className={totalDays > 0 ? "text-blue-600" : "text-gray-400"}>
                        {totalDays > 0
                            ? `${totalDays} day${totalDays > 1 ? "s" : ""} selected`
                            : "Select valid dates"}
                    </span>
                </div>
            </div>

            {/* Cart Items */}
            <div className="w-full flex flex-col items-center">
                {
                    cart.orderedItems?.map((item) => (
                        <BookingItem
                            itemkey={item.key}
                            key={item.key}
                            qty={item.qty}
                            refresh={reloadCart}
                        />
                    ))
                }
            </div>

            <div className="w-full max-w-md flex justify-center items-center px-5 py-3">
                <span className="text-sm text-gray-600">Total : </span>
                <span className="text-lg font-bold text-accent">Rs.{total}</span>
            </div>

            {/* Button */}
            <div className="w-full flex justify-center mt-4">
                <button
                    onClick={handleBookingCreation}
                    disabled={totalDays <= 0 || cart.orderedItems.length === 0}
                    className={`w-[200px] h-[50px] rounded-lg transition duration-300 
                    ${totalDays > 0 && cart.orderedItems.length > 0
                        ? "bg-accent text-white hover:bg-blue-400"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                    Create Booking
                </button>
            </div>
        </div>
    );
}