import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/all`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(res.data);
                setUsers(res.data);
            } catch (err) {
                console.error("Error fetching users:", err);
            } finally {
                setLoading(false);
            }
        };
        if (loading) {
            fetchUsers();
        }
    }, [loading]);

    function handleBlockUser(email) {
        const token = localStorage.getItem("token");

        axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/users/block/${email}`,
            {}, // empty body
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then(() => {
                setLoading(true);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Users</h1>

            {loading ? (
                <p className="text-gray-500">Loading users...</p>
            ) : (
                <div className="overflow-x-auto bg-white shadow-md rounded-xl">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                            <tr>
                                <th className="px-4 py-3">User</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Phone</th>
                                <th className="px-4 py-3">Address</th>
                                <th className="px-4 py-3">Role</th>
                                <th className="px-4 py-3">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user) => (
                                <tr
                                    key={user._id}
                                    className="border-b hover:bg-gray-50 transition"
                                >
                                    {/* User info with image */}
                                    <td className="px-4 py-3 flex items-center gap-3">
                                        <img
                                            src={
                                                user.profilePicture ||
                                                user.image ||
                                                "https://via.placeholder.com/40"
                                            }
                                            alt="profile"
                                            className="w-10 h-10 rounded-full object-cover border"
                                            onError={(e) =>
                                            (e.target.src =
                                                "https://via.placeholder.com/40")
                                            }
                                        />
                                        <div>
                                            <p className="font-medium">
                                                {user.firstName} {user.lastName}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                ID: {user._id.slice(-6)}
                                            </p>
                                        </div>
                                    </td>

                                    <td className="px-4 py-3">{user.email}</td>
                                    <td className="px-4 py-3">{user.phone}</td>
                                    <td className="px-4 py-3">{user.address}</td>

                                    {/* Role Badge */}
                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full font-medium
                        ${user.role === "admin"
                                                    ? "bg-red-100 text-red-600"
                                                    : user.role === "customer"
                                                        ? "bg-blue-100 text-blue-600"
                                                        : "bg-gray-100 text-gray-600"
                                                }`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>

                                    <td onClick={() => { handleBlockUser(user.email) }} className="px-4 py-3 cursor-pointer">
                                        {user.isBlocked ? "Blocked" : "Active"}
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}