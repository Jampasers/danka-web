export type ProductField = {
  key: "userId" | "serverId";
  label: string;
  required: boolean;
  placeholder?: string;
};

export type Denomination = {
  id: string;
  label: string;
  price: number;
};

export type Product = {
  name: string;
  slug: string;
  description: string;
  fieldsNeeded: ProductField[];
  denominations: Denomination[];
};

export const products: Product[] = [
  {
    name: "Mobile Legends",
    slug: "mobile-legends",
    description: "Top up diamonds instantly for Mobile Legends.",
    fieldsNeeded: [
      {
        key: "userId",
        label: "User ID",
        required: true,
        placeholder: "Masukkan User ID",
      },
      {
        key: "serverId",
        label: "Server ID",
        required: false,
        placeholder: "Contoh: 1234",
      },
    ],
    denominations: [
      { id: "ml-86", label: "86 Diamonds", price: 20000 },
      { id: "ml-172", label: "172 Diamonds", price: 39000 },
      { id: "ml-257", label: "257 Diamonds", price: 58000 },
    ],
  },
  {
    name: "Free Fire",
    slug: "free-fire",
    description: "Top up diamonds Free Fire dalam hitungan detik.",
    fieldsNeeded: [
      {
        key: "userId",
        label: "User ID",
        required: true,
        placeholder: "Masukkan User ID",
      },
    ],
    denominations: [
      { id: "ff-70", label: "70 Diamonds", price: 10000 },
      { id: "ff-140", label: "140 Diamonds", price: 19500 },
      { id: "ff-210", label: "210 Diamonds", price: 29000 },
    ],
  },
  {
    name: "PUBG",
    slug: "pubg",
    description: "Isi UC PUBG Mobile dengan proses cepat.",
    fieldsNeeded: [
      {
        key: "userId",
        label: "Character ID",
        required: true,
        placeholder: "Masukkan Character ID",
      },
      {
        key: "serverId",
        label: "Server",
        required: false,
        placeholder: "Asia / Global",
      },
    ],
    denominations: [
      { id: "pubg-60", label: "60 UC", price: 15000 },
      { id: "pubg-180", label: "180 UC", price: 42000 },
      { id: "pubg-325", label: "325 UC", price: 75000 },
    ],
  },
];

export const getProductBySlug = (slug: string) =>
  products.find((product) => product.slug === slug);
