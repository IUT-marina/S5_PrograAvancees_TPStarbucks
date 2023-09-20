import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import {
    Footer,
    Heading
} from "tp-kit/components";
import ProductList from "@/components/ProductList";

export default function Home() {
  return (
      <main>
          <Heading
              as="h1"
              size="lg"
              variant="brand"
              weight="bold"
              className={"flex flex-col items-center justify-between p-24"}
          >
              Starbuucks
          </Heading>

          <ProductList />


          <Footer />
    </main>
  )
}
