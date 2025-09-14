"use client";

import axios from "axios";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function useDebounce(value: string, delay: number) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}

export default function Dashboard() {
  const [buyers, setBuyers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [status, setStatus] = useState("");
  const [timeline, setTimeline] = useState("");

  const debouncedSearch = useDebounce(search, 500);


  useEffect(() => {
    const fetchBuyers = async () => {
      setLoading(true);

      const params = new URLSearchParams({
        search: debouncedSearch,
        city,
        propertyType,
        status,
        timeline,
      });

      const response = await axios(`/api/buyers?${params.toString()}`);
      setBuyers(response.data);
      setLoading(false);
    };

    fetchBuyers();
  }, [debouncedSearch, city, propertyType, status, timeline]);

  return (
    <div className="flex min-h-screen bg-gray-50">

      <aside className="w-64 text-black border-slate-300 bg-white border-r shadow-sm">
        <div className="p-6 font-bold text-xl">Buyer CRM</div>
        <nav className="space-y-2 px-4">
          <Link
            href="/dashboard"
            className="block px-3 py-2 rounded-md hover:bg-gray-100"
          >
            Dashboard
          </Link>
          <Link
            href="/createbuyer"
            className="block px-3 py-2 rounded-md hover:bg-gray-100"
          >
            Create Buyer
          </Link>
        </nav>
      </aside>


      <main className="flex-1 p-8">

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Buyers</h1>
          <div className="flex gap-3">
            <Link
              href="/createbuyer"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              + Create Buyer
            </Link>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 hover:cursor-pointer"
              onClick={() => signOut()}
            >
              Log Out
            </button>
          </div>
        </div>

  
        <div className="flex flex-wrap gap-4 mb-4 text-black">
          <input
            type="text"
            placeholder="Search by name, phone, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
          />
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value="">All Cities</option>
            <option value="Chandigarh">Chandigarh</option>
            <option value= "Mohali">Mohali</option>   
            <option value="Zirakpur">Zirakpur</option>
            <option value= "Panchkula">Panchkula</option>
            <option value="Other">Other</option>
          </select>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value="">All Property Types</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Plot">Plot</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value="">All Status</option>
            <option value="New">New</option>
            <option value="Qualified">Qualified</option>
            <option value="Contacted">Contacted</option>
            <option value="Visited">Visited</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Converted">Converted</option>
            <option value="Dropped">Dropped</option>
          </select>
          <select
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value="">All Timelines</option>
            <option value="ZerotoThree">0-3 months</option>
            <option value="ThreetoSix">3-6 months</option>
            <option value="GreaterthanSix">{`>6 months`}</option>
            <option value="Exploring">Exploring</option>
          </select>
        </div>

       
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-6 text-center text-gray-500">Loading...</div>
          ) : buyers.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No buyers found.</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    City
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Property Type
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Budget
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Purpose
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Timeline
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Updated At
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {buyers.map((buyer) => (
                  <tr
                    key={buyer.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      router.push(`/buyer/${buyer.id}`)
                    }
                    }
                  >
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {buyer.fullName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {buyer.phone}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {buyer.city}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {buyer.propertyType}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      ₹{buyer.budgetMin.toLocaleString()} – ₹
                      {buyer.budgetMax.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {buyer.purpose}
                    </td>
                    <td className="px-9 py-4 text-sm text-gray-600">
                      {
                      buyer.timeline === "ZerotoThree" ? "0-3" : 
                      buyer.timeline === "Threetosix" ? "3-6" :
                      buyer.timeline === "Greaterthansix" ? ">6" :
                      buyer.timeline
                      }
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full text-slate-700 bg-slate-100`}>
                        {buyer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(buyer.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-blue-600">
                      View
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
