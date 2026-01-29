import { GoGraph } from "react-icons/go";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { LuSpeaker } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";

export default function AdminPage() {
    return (
        <div className="w-full h-screen flex">
      <div className="w-[400px] h-full bg-green-200">

        <button className="w-full h-[40px] text-[25px] font-bold bg-red-300 flex justify-center items-center">
          <GoGraph />
          Dashboard 
        </button>
        <button className="w-full h-[40px] text-[25px] font-bold bg-red-300 flex justify-center items-center">
          <MdOutlineBookmarkBorder />
          Booking 
        </button>
        <button className="w-full h-[40px] text-[25px] font-bold bg-red-300 flex justify-center items-center">
          <LuSpeaker />
          Items 
        </button>
        <button className="w-full h-[40px] text-[25px] font-bold bg-red-300 flex justify-center items-center">
          <FaRegUser />
          Users 
        </button>

      </div>
      <div className="w-full bg-blue-200">

      </div>

    </div>
    )
}