import {BreadCrumbs, Footer, Heading} from "tp-kit/components";
import ProductList from "@/components/productList";
import Image from "next/image";

import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
const categories = PRODUCTS_CATEGORY_DATA;

export default function Home() {
  return (
      <main>
          <Heading
              as="h1"
              size="lg"
              weight="bold"
              className={"bg-vertsb text-white flex flex-col items-center justify-between text-6xl p-12"}
          >
              <Image src="/starbucks-logo-opacity-coffee-light.svg"
                     width={100} height={100}
                     alt={'logo starbucks'}
              />
              <h1 className={"p-2"}>Starbuucks</h1>
          </Heading>

          <BreadCrumbs className={"p-10 px-40"} items={[
              {
                  "label": "Accueil",
                  "url": "/"
              }
          ]}></BreadCrumbs>
          <ProductList categoriesToDisplay={categories} showFilters={true} />

          <Footer />
    </main>
  )
}
