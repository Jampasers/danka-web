import { NextResponse } from "next/server";
import { readOrders } from "@/app/lib/orders";

export async function GET(
  _request: Request,
  { params }: { params: { orderId: string } }
) {
  const { orderId } = params;
  const orders = await readOrders();
  const order = orders.find((item) => item.id === orderId);

  if (!order) {
    return NextResponse.json({ message: "Order not found." }, { status: 404 });
  }

  return NextResponse.json(order, { status: 200 });
}
