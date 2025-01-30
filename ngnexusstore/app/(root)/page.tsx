import ProductList from "@/components/ui/shared/product/product-list";
import data from "@/db/sample-data";
export default async function HomePage() {
  return (
    <div>
      HomePage
      <ProductList data={data.products} title={"Products"} limit={4} />
    </div>
  );
}
