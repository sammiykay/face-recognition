"use client";

import { useEffect, useState } from "react";

interface User {
  id: number;
  email: string;
  fullName: string;
  department: string;
  faculty: string;
  course: string;
  receipt: string;
  faceData: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true);

  // Fetch data from API when the component is mounted
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("/api/userinfo");
        const data = await response.json();
        setUsers(data.users || []); // Safeguard: Ensure users is an array
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) return <div>Loading users...</div>;

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">User List</h1>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Full Name</th>
              <th className="py-2 px-4 border-b"></th>
              <th className="py-2 px-4 border-b">Department</th>
              <th className="py-2 px-4 border-b">Faculty</th>
              <th className="py-2 px-4 border-b">Course</th>
              <th className="py-2 px-4 border-b">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b">{user.id}</td>
                <td className="py-2 px-4 border-b">{user.fullName}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.department}</td>
                <td className="py-2 px-4 border-b">{user.faculty}</td>
                <td className="py-2 px-4 border-b">{user.course}</td>
                <td className="py-2 px-4 border-b">{user.receipt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
