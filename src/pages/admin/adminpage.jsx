import { GoGraph } from "react-icons/go";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { LuSpeaker } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { Link, Route, Routes } from "react-router-dom";
import AdminItemsPage from "./adminItemsPage";
import AddItemPage from "./addItemPage";
import UpdateItemPage from "./updateItemPage";
import AdminUsersPage from "./adminUsersPage";

export default function AdminPage() {
    return (
      <div className="w-full h-screen flex">
      <div className="w-[200px] h-full bg-green-200">

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
        <Link to="/admin/users" className="w-full h-[40px] text-[25px] font-bold bg-red-300 flex justify-center items-center">
          <FaRegUser />
          Users 
        </Link>

      </div>
      <div className="w-[calc(100vw-200px)]">
        <Routes path="/admin/*">

            <Route path="/booking" element={<h1>Booking Page</h1>} />
            <Route path="/users" element={<AdminUsersPage />} />
            <Route path="/items" element={<AdminItemsPage />} />
            <Route path="/items/add" element={<AddItemPage />} />
            <Route path="/items/edit" element={<UpdateItemPage />} />

        </Routes>

      </div>

    </div>
    )
}