"use client";

import { useState } from "react";
import Link from "next/link";

type Order = {
  id: string;
  productName: string;
  status: string;
  price: number;
  createdAt: string;
};

export default function CekTransaksiPage() {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">(
    "idle"
  );
  const [order, setOrder] = useState<Order | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!orderId.trim()) {
      setErrorMessage("Masukkan Order ID terlebih dahulu.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage(null);

    try {
      const response = await fetch(`/api/orders/${orderId.trim()}`);
      if (!response.ok) {
        throw new Error("Order not found");
      }
      const data = (await response.json()) as Order;
      setOrder(data);
      setStatus("ready");
    } catch (error) {
      setOrder(null);
      setStatus("error");
      setErrorMessage("Order tidak ditemukan. Cek kembali ID kamu.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">Cek Transaksi</h1>
          <p className="text-slate-400">
            Masukkan Order ID untuk melihat status pesanan kamu.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
        >
          <label className="block text-sm">
            <span className="text-slate-200">Order ID</span>
            <input
              type="text"
              value={orderId}
              onChange={(event) => setOrderId(event.target.value)}
              placeholder="Contoh: ORD-123456-ABCDEF"
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 focus:border-orange-500 focus:outline-none"
            />
          </label>

          {errorMessage && (
            <div className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-orange-500 py-3 text-black font-semibold hover:bg-orange-400"
          >
            Cari Transaksi
          </button>
        </form>

        {status === "idle" && (
          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-center text-sm text-slate-400">
            Belum ada pencarian. Masukkan Order ID di atas.
          </div>
        )}

        {status === "loading" && (
          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-center">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="mt-4 text-slate-300">Memuat data transaksi...</p>
          </div>
        )}

        {status === "ready" && order && (
          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-400">Order ID</p>
                <p className="text-lg font-semibold text-orange-300">{order.id}</p>
              </div>
              <span className="rounded-full bg-yellow-500/20 px-4 py-1 text-xs font-semibold uppercase text-yellow-200">
                {order.status}
              </span>
            </div>
            <div className="mt-6 space-y-3 text-sm text-slate-300">
              <div className="flex justify-between">
                <span>Produk</span>
                <span className="text-slate-100 font-medium">
                  {order.productName}
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
            <div className="mt-6 flex gap-3">
              <Link
                href={`/invoice/${order.id}`}
                className="rounded-full border border-orange-500/60 px-5 py-2 text-sm text-orange-300 hover:bg-orange-500/10"
              >
                Lihat Invoice
              </Link>
              <Link
                href="/products"
                className="rounded-full border border-slate-700 px-5 py-2 text-sm text-slate-300 hover:border-orange-500/60"
              >
                Top up lagi
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
