import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function AdminItemsPage() {
    return(
        <div className="w-full h-full relative">
            <Link to = "/admin/items/add">
            <CiCirclePlus className="text-[70px] absolute right-10 bottom-10 hover:text-green-500" />
            </Link>

        </div>
    )
}