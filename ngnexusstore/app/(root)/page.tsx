import ProductList from "@/components/ui/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";

export default async function HomePage() {
  const latestProducts = await getLatestProducts();

  return (
    <div>
      HomePage
      <ProductList data={latestProducts} title={"Products"} limit={4} />
    </div>
  );
}
