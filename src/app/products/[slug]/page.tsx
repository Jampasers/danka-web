"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { products } from "@/src/data/products";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const product = useMemo(
    () => products.find((item) => item.slug === slug),
    [slug]
  );
  const [formValues, setFormValues] = useState({ userId: "", serverId: "" });
  const [selectedDenomination, setSelectedDenomination] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <section className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-semibold">Produk tidak ditemukan</h1>
          <p className="text-slate-400 mt-3">
            Cek kembali pilihan game kamu atau kembali ke katalog.
          </p>
          <Link
            href="/products"
            className="inline-flex mt-6 px-5 py-3 rounded-full bg-orange-500 text-black font-semibold"
          >
            Kembali ke Produk
          </Link>
        </section>
      </div>
    );
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const missingRequired = product.fieldsNeeded.find(
      (field) => field.required && !formValues[field.key].trim()
    );

    if (missingRequired) {
      setError(`Field ${missingRequired.label} wajib diisi.`);
      return;
    }

    if (!selectedDenomination) {
      setError("Pilih nominal top up terlebih dahulu.");
      return;
    }

    const params = new URLSearchParams();
    params.set("product", product.slug);
    params.set("userId", formValues.userId.trim());
    if (formValues.serverId.trim()) {
      params.set("serverId", formValues.serverId.trim());
    }
    params.set("denomination", selectedDenomination);
    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex flex-col gap-2">
          <Link href="/products" className="text-sm text-orange-400">
            ← Kembali ke katalog
          </Link>
          <h1 className="text-3xl sm:text-4xl font-semibold">
            {product.name}
          </h1>
          <p className="text-slate-400 max-w-2xl">{product.description}</p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
          >
            <h2 className="text-xl font-semibold">Masukkan Data Player</h2>
            <p className="text-sm text-slate-400 mt-2">
              Pastikan data yang kamu masukkan sudah sesuai dengan akun game.
            </p>

            <div className="mt-6 space-y-4">
              {product.fieldsNeeded.map((field) => (
                <label key={field.key} className="block text-sm">
                  <span className="text-slate-200">
                    {field.label}
                    {field.required ? " *" : ""}
                  </span>
                  <input
                    type="text"
                    value={formValues[field.key]}
                    onChange={(event) =>
                      setFormValues((prev) => ({
                        ...prev,
                        [field.key]: event.target.value,
                      }))
                    }
                    placeholder={field.placeholder}
                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 focus:border-orange-500 focus:outline-none"
                  />
                </label>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold">Pilih Nominal</h3>
              <div className="mt-4 grid gap-3">
                {product.denominations.map((denomination) => (
                  <button
                    type="button"
                    key={denomination.id}
                    onClick={() => setSelectedDenomination(denomination.id)}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                      selectedDenomination === denomination.id
                        ? "border-orange-500 bg-orange-500/10"
                        : "border-slate-800 bg-slate-950 hover:border-orange-500/60"
                    }`}
                  >
                    <span className="font-medium text-slate-200">
                      {denomination.label}
                    </span>
                    <span className="text-sm text-orange-300">
                      Rp {denomination.price.toLocaleString("id-ID")}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="mt-6 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="mt-8 w-full rounded-full bg-orange-500 py-3 text-black font-semibold hover:bg-orange-400"
            >
              Lanjut ke Checkout
            </button>
          </form>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 h-fit">
            <h2 className="text-xl font-semibold">Tips Top Up</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>✅ Pastikan User ID benar sebelum melanjutkan.</li>
              <li>✅ Pilih nominal sesuai kebutuhan kamu.</li>
              <li>✅ Pembayaran akan diverifikasi otomatis.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
