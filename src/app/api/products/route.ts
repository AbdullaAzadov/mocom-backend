import { products } from "@/data/products";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  let result = products;

  const { searchParams } = new URL(req.url);
  const priceFrom = searchParams.get("price_from");
  const priceTo = searchParams.get("price_to");

  if (priceFrom) {
    result = result.filter(
      (product) => product.price_for_item >= Number(priceFrom)
    );
  }

  if (priceTo) {
    result = result.filter(
      (product) => product.price_for_item <= Number(priceTo)
    );
  }

  const title = searchParams.get("title");
  const sortBy = searchParams.get("sort");
  const sort_order = searchParams.get("sort_order") === "DESC" ? "DESC" : "ASC";

  if (title) {
    result = result.filter((product) =>
      product.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  if (sortBy === "PRICE") {
    result = result.sort((a, b) => {
      if (sort_order === "DESC") {
        return b.price_for_item - a.price_for_item;
      } else {
        return a.price_for_item - b.price_for_item;
      }
    });
  }

  return NextResponse.json(result);
}
