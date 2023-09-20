import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import {
    Footer,
    Heading
} from "tp-kit/components";
import ProductList from "@/components/productList";
import Image from "next/image";

export default function Home() {
  return (
      <main>
          <Heading
              as="h1"
              size="lg"
              weight="bold"
              className={"bg-vertsb text-white flex flex-col items-center justify-between text-6xl p-14"}
          >
              <Image src="/starbucks-logo-opacity-coffee-light.svg"
                     width={100} height={100}
                     alt={'logo starbucks'}
              />
              <h1 className={"p-4"}>Starbuucks</h1>
          </Heading>

          <ProductList />


          <Footer />
    </main>
  )
}
