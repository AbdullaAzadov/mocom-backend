import { products } from "@/data/products";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = products.find((product) => product.id === Number(id));

  if (!product) {
    return new Response("Product not found", { status: 404 });
  }

  return NextResponse.json(product);
}
