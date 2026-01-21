"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

type Order = {
  id: string;
  productName: string;
  userId: string;
  serverId?: string | null;
  denominationLabel: string;
  price: number;
  paymentMethod?: string | null;
  status: string;
  createdAt: string;
};

export default function InvoicePage() {
  const { orderId } = useParams<{ orderId: string }>();
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setStatus("loading");
        const response = await fetch(`/api/orders/${orderId}`);
        if (!response.ok) {
          throw new Error("Order not found");
        }
        const data = (await response.json()) as Order;
        setOrder(data);
        setStatus("ready");
      } catch (error) {
        setStatus("error");
      }
    };

    fetchOrder();
  }, [orderId]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-slate-300">Memuat invoice...</p>
        </div>
      </div>
    );
  }

  if (status === "error" || !order) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-semibold">Invoice tidak ditemukan</h1>
          <p className="text-slate-400 mt-3">
            Periksa kembali nomor order atau lakukan pengecekan transaksi.
          </p>
          <Link
            href="/cek-transaksi"
            className="inline-flex mt-6 px-5 py-3 rounded-full bg-orange-500 text-black font-semibold"
          >
            Cek Transaksi
          </Link>
        </div>
      </div>
    );
  }

  const badgeColor =
    order.status === "pending"
      ? "bg-yellow-500/20 text-yellow-200"
      : order.status === "paid"
      ? "bg-green-500/20 text-green-200"
      : "bg-red-500/20 text-red-200";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">Invoice</h1>
          <p className="text-slate-400">
            Simpan nomor order kamu untuk cek status transaksi.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-slate-400">Order ID</p>
              <p className="text-lg font-semibold text-orange-300">{order.id}</p>
            </div>
            <span
              className={`rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wide ${badgeColor}`}
            >
              {order.status}
            </span>
          </div>

          <div className="mt-6 space-y-4 text-sm text-slate-300">
            <div className="flex justify-between">
              <span>Produk</span>
              <span className="text-slate-100 font-medium">
                {order.productName}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Nominal</span>
              <span className="text-slate-100 font-medium">
                {order.denominationLabel}
              </span>
            </div>
            <div className="flex justify-between">
              <span>User ID</span>
              <span className="text-slate-100 font-medium">
                {order.userId}
              </span>
            </div>
            {order.serverId ? (
              <div className="flex justify-between">
                <span>Server</span>
                <span className="text-slate-100 font-medium">
                  {order.serverId}
                </span>
              </div>
            ) : null}
            <div className="flex justify-between">
              <span>Metode Pembayaran</span>
              <span className="text-slate-100 font-medium">
                {order.paymentMethod ?? "-"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tanggal</span>
              <span className="text-slate-100 font-medium">
                {new Date(order.createdAt).toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex justify-between text-base font-semibold text-orange-300">
              <span>Total</span>
              <span>Rp {order.price.toLocaleString("id-ID")}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/products"
            className="rounded-full border border-orange-500/60 px-5 py-2 text-sm text-orange-300 hover:bg-orange-500/10"
          >
            Top up lagi
          </Link>
          <Link
            href="/cek-transaksi"
            className="rounded-full border border-slate-700 px-5 py-2 text-sm text-slate-300 hover:border-orange-500/60"
          >
            Cek transaksi
          </Link>
        </div>
      </section>
    </div>
  );
}
