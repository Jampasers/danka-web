"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { products } from "@/src/data/products";

const paymentOptions = ["QRIS", "Virtual Account", "E-Wallet"];

type CheckoutSummary = {
  productName: string;
  productSlug: string;
  denominationId: string;
  denominationLabel: string;
  price: number;
  userId: string;
  serverId?: string;
};

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );
  const [summary, setSummary] = useState<CheckoutSummary | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [submitState, setSubmitState] = useState<
    "idle" | "submitting" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const queryData = useMemo(() => {
    return {
      productSlug: searchParams.get("product"),
      userId: searchParams.get("userId"),
      serverId: searchParams.get("serverId"),
      denominationId: searchParams.get("denomination"),
    };
  }, [searchParams]);

  useEffect(() => {
    setStatus("loading");

    if (!queryData.productSlug || !queryData.userId || !queryData.denominationId) {
      setStatus("error");
      setSummary(null);
      return;
    }

    const product = products.find((item) => item.slug === queryData.productSlug);
    const denomination = product?.denominations.find(
      (item) => item.id === queryData.denominationId
    );

    if (!product || !denomination) {
      setStatus("error");
      setSummary(null);
      return;
    }

    setSummary({
      productName: product.name,
      productSlug: product.slug,
      denominationId: denomination.id,
      denominationLabel: denomination.label,
      price: denomination.price,
      userId: queryData.userId,
      serverId: queryData.serverId ?? undefined,
    });
    setStatus("ready");
  }, [queryData]);

  const handleSubmit = async () => {
    if (!summary) {
      return;
    }
    if (!paymentMethod) {
      setErrorMessage("Pilih metode pembayaran terlebih dahulu.");
      return;
    }

    setErrorMessage(null);
    setSubmitState("submitting");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productSlug: summary.productSlug,
          userId: summary.userId,
          serverId: summary.serverId,
          denominationId: summary.denominationId,
          paymentMethod,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal membuat pesanan.");
      }

      const order = (await response.json()) as { id: string };
      router.push(`/invoice/${order.id}`);
    } catch (error) {
      setSubmitState("error");
      setErrorMessage("Tidak bisa membuat pesanan. Coba lagi nanti.");
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-slate-300">Memuat ringkasan checkout...</p>
        </div>
      </div>
    );
  }

  if (status === "error" || !summary) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-semibold">Checkout tidak tersedia</h1>
          <p className="text-slate-400 mt-3">
            Data transaksi belum lengkap. Silakan pilih produk terlebih dahulu.
          </p>
          <Link
            href="/products"
            className="inline-flex mt-6 px-5 py-3 rounded-full bg-orange-500 text-black font-semibold"
          >
            Pilih Produk
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex flex-col gap-2">
          <Link href="/products" className="text-sm text-orange-400">
            ← Ubah pilihan produk
          </Link>
          <h1 className="text-3xl font-semibold">Checkout</h1>
          <p className="text-slate-400">
            Konfirmasi detail pesanan sebelum melanjutkan pembayaran.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h2 className="text-xl font-semibold">Ringkasan Pesanan</h2>
            <div className="mt-6 space-y-4 text-sm text-slate-300">
              <div className="flex justify-between">
                <span>Produk</span>
                <span className="text-slate-100 font-medium">
                  {summary.productName}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Nominal</span>
                <span className="text-slate-100 font-medium">
                  {summary.denominationLabel}
                </span>
              </div>
              <div className="flex justify-between">
                <span>User ID</span>
                <span className="text-slate-100 font-medium">
                  {summary.userId}
                </span>
              </div>
              {summary.serverId ? (
                <div className="flex justify-between">
                  <span>Server</span>
                  <span className="text-slate-100 font-medium">
                    {summary.serverId}
                  </span>
                </div>
              ) : null}
              <div className="flex justify-between text-base font-semibold text-orange-300">
                <span>Total</span>
                <span>Rp {summary.price.toLocaleString("id-ID")}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h2 className="text-xl font-semibold">Metode Pembayaran</h2>
            <p className="text-sm text-slate-400 mt-2">
              Pilih metode pembayaran yang tersedia.
            </p>
            <div className="mt-4 space-y-3">
              {paymentOptions.map((option) => (
                <label
                  key={option}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 cursor-pointer transition ${
                    paymentMethod === option
                      ? "border-orange-500 bg-orange-500/10"
                      : "border-slate-800 bg-slate-950 hover:border-orange-500/60"
                  }`}
                >
                  <span className="text-sm font-medium">{option}</span>
                  <input
                    type="radio"
                    name="payment"
                    value={option}
                    checked={paymentMethod === option}
                    onChange={() => setPaymentMethod(option)}
                    className="accent-orange-500"
                  />
                </label>
              ))}
            </div>

            {errorMessage && (
              <div className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {errorMessage}
              </div>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitState === "submitting"}
              className="mt-6 w-full rounded-full bg-orange-500 py-3 text-black font-semibold hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitState === "submitting"
                ? "Memproses..."
                : "Buat Pesanan"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
