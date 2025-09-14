"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function BuyerDetailsPage() {
  const [buyer, setBuyer] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const params = useParams<{ id: string }>();
  const id = params?.id;

  useEffect(() => {
    async function getBuyer() {
      try {
        setLoading(true);
        const response = await axios.get(`/api/buyers/${id}`);
        setBuyer(response.data.buyer);
        setHistory(response.data.buyerhistory);
      } catch (err) {
        console.error("Error fetching buyer:", err);
      } finally {
        setLoading(false);
      }
    }
     getBuyer();
  }, []);

  if (loading) {
    return <p className="p-6">Loading buyer details...</p>;
  }

  if (!buyer) {
    return <p className="p-6 text-red-600">Buyer not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex text-black">
   
      <aside className="w-64 bg-white border-r border-gray-200 shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">Buyer CRM</h2>
        <nav className="space-y-2">
          <a href="/dashboard" className="block px-3 py-2 rounded-md hover:bg-gray-100">
            Dashboard
          </a>
          <a href="/createbuyer" className="block px-3 py-2 rounded-md hover:bg-gray-100">
            Create Buyer
          </a>
        </nav>
      </aside>


      <main className="flex-1 p-8 text-black">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Buyer Details – {buyer.fullName}
          </h1>
          <Link
            href={`/buyer/${id}/edit`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Edit
          </Link>
        </div>

   
        <div className="bg-white shadow rounded-lg p-6 grid grid-cols-2 gap-6">
          {[
            { label: "Full Name", value: buyer.fullName },
            { label: "Email", value: buyer.email },
            { label: "Phone", value: buyer.phone },
            { label: "City", value: buyer.city },
            { label: "Property Type", value: buyer.propertyType },
            { label: "BHK", value: buyer.bhk },
            { label: "Budget Min", value: buyer.budgetMin },
            { label: "Budget Max", value: buyer.budgetMax },
            { label: "Timeline", value: buyer.timeline },
            { label: "Status", value: buyer.status },
            { label: "Source", value: buyer.source },
          ].map((field, i) => (
            <div key={i}>
              <p className="text-sm font-medium text-gray-700">{field.label}</p>
              <p className="mt-1 text-gray-900">{field.value || "-"}</p>
            </div>
          ))}

          <div className="col-span-2">
            <p className="text-sm font-medium text-gray-700">Notes</p>
            <p className="mt-1 text-gray-900">{buyer.notes || "No notes provided."}</p>
          </div>
        </div>


        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Change History</h2>
          <ul className="space-y-3">
            {!history || history.length === 0 ? (
              <p className="text-gray-500">No history created</p>
            ) : (
              history.map((h: any, index: number) => {
                const diffs = typeof h.diff === "string" ? JSON.parse(h.diff) : h.diff;
                return (
                  <li key={h.id || index} className="text-sm text-gray-600">
                    {Object.entries(diffs).map(([field, change]: any) => (
                      <div key={field}>
                        <span className="font-medium">{field}</span>: {change.old} → {change.new}{" "}
                        <span className="text-gray-400">
                          ({new Date(h.changedAt).toLocaleString()} by {h.changedBy})
                        </span>
                      </div>
                    ))}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}
