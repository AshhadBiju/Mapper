"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DynamicMap = dynamic(
  () => import("@/app/components/leafletMap/leafletMap"),
  {
    ssr: false,
  }
);

export default function Map() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return null;
  }

  return (
    <main className="h-full flex md:flex-row flex-col gap-x-4 gap-y-4">
      <div className="w-full">
        <DynamicMap />
      </div>
      <ToastContainer />
    </main>
  );
}
