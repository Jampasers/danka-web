import { NextResponse } from "next/server";
import { products } from "@/src/data/products";
import { readOrders, writeOrders, Order } from "@/app/lib/orders";

const createOrderId = () => {
  const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `ORD-${Date.now()}-${randomPart}`;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      productSlug?: string;
      userId?: string;
      serverId?: string;
      denominationId?: string;
      paymentMethod?: string;
    };

    if (!body.productSlug || !body.userId || !body.denominationId) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    const product = products.find((item) => item.slug === body.productSlug);
    if (!product) {
      return NextResponse.json({ message: "Product not found." }, { status: 404 });
    }

    const denomination = product.denominations.find(
      (item) => item.id === body.denominationId
    );
    if (!denomination) {
      return NextResponse.json(
        { message: "Denomination not found." },
        { status: 404 }
      );
    }

    const order: Order = {
      id: createOrderId(),
      productSlug: product.slug,
      productName: product.name,
      userId: body.userId,
      serverId: body.serverId ?? null,
      denominationId: denomination.id,
      denominationLabel: denomination.label,
      price: denomination.price,
      paymentMethod: body.paymentMethod ?? null,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    const orders = await readOrders();
    orders.push(order);
    await writeOrders(orders);

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create order." },
      { status: 500 }
    );
  }
}
