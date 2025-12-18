import { products } from "@/data/products";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("id");
  const product =
    productId && products.find((product) => product.id === Number(productId));

  if (!product) {
    return NextResponse.json([]);
  }

  const similarProducts = products
    .filter((product) => product.id !== Number(productId))
    .sort((a, b) => {
      const diffA = Math.abs(a.price_for_item - product.price_for_item);
      const diffB = Math.abs(b.price_for_item - product.price_for_item);
      return diffA - diffB;
    })
    .slice(0, 4);

  return NextResponse.json(similarProducts);
}
