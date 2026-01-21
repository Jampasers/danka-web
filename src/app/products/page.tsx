import Link from "next/link";
import { products } from "@/src/data/products";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-orange-400 text-sm uppercase tracking-[0.2em]">
              Product Catalog
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold">Pilih Game</h1>
            <p className="text-slate-300 mt-2 max-w-xl">
              Temukan game favoritmu dan mulai top up hanya dalam beberapa
              langkah.
            </p>
          </div>
          <div className="text-sm text-slate-400">
            Total produk: {products.length}
          </div>
        </div>

        {products.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/60 p-10 text-center">
            <p className="text-lg font-semibold">Belum ada produk.</p>
            <p className="text-slate-400 mt-2">
              Silakan kembali lagi nanti untuk daftar game terbaru.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-orange-500/60 hover:bg-slate-900"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold group-hover:text-orange-400">
                      {product.name}
                    </h2>
                    <p className="text-sm text-slate-400 mt-2">
                      {product.description}
                    </p>
                  </div>
                  <span className="text-xs rounded-full border border-orange-500/40 px-3 py-1 text-orange-300">
                    {product.denominations.length} pilihan
                  </span>
                </div>
                <div className="mt-6 text-sm text-slate-400">
                  Isi data: {product.fieldsNeeded.map((field) => field.label).join(", ")}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
