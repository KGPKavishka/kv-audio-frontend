import { GoGraph } from "react-icons/go";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { LuSpeaker } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { Link, Route, Routes } from "react-router-dom";

export default function AdminPage() {
    return (
        <div className="w-full h-screen flex">
      <div className="w-[400px] h-full bg-green-200">

        <button className="w-full h-[40px] text-[25px] font-bold bg-red-300 flex justify-center items-center">
          <GoGraph />
          Dashboard 
        </button>
        <Link to="/admin/booking" className="w-full h-[40px] text-[25px] font-bold bg-red-300 flex justify-center items-center">
          <MdOutlineBookmarkBorder />
          Booking 
        </Link>
        <Link to="/admin/items" className="w-full h-[40px] text-[25px] font-bold bg-red-300 flex justify-center items-center">
          <LuSpeaker />
          Items 
        </Link>
        <button className="w-full h-[40px] text-[25px] font-bold bg-red-300 flex justify-center items-center">
          <FaRegUser />
          Users 
        </button>

      </div>
      <div className="w-[calc(100vw-400px)] bg-blue-200">
        <Routes path="/admin/*">

            <Route path="/booking" element={<h1>Booking Page</h1>} />
            <Route path="/items" element={<h1>Items Page</h1>} />
        
        </Routes>

      </div>

    </div>
    )
}