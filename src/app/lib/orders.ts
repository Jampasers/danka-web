import { promises as fs } from "fs";
import path from "path";

export type OrderStatus = "pending" | "paid" | "failed";

export type Order = {
  id: string;
  productSlug: string;
  productName: string;
  userId: string;
  serverId?: string | null;
  denominationId: string;
  denominationLabel: string;
  price: number;
  paymentMethod?: string | null;
  status: OrderStatus;
  createdAt: string;
};

const dataDir = path.join(process.cwd(), "data");
const ordersFile = path.join(dataDir, "orders.json");

const ensureOrdersFile = async () => {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(ordersFile);
  } catch {
    await fs.writeFile(ordersFile, "[]", "utf-8");
  }
};

export const readOrders = async (): Promise<Order[]> => {
  await ensureOrdersFile();
  const raw = await fs.readFile(ordersFile, "utf-8");
  if (!raw.trim()) {
    return [];
  }
  try {
    return JSON.parse(raw) as Order[];
  } catch {
    return [];
  }
};

export const writeOrders = async (orders: Order[]) => {
  await ensureOrdersFile();
  await fs.writeFile(ordersFile, JSON.stringify(orders, null, 2), "utf-8");
};
