import {BreadCrumbs, Footer, Heading} from "tp-kit/components";
import ProductList from "@/components/productList";

import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import {Metadata} from "next";
const categories = PRODUCTS_CATEGORY_DATA;

export const metadata: Metadata = {
    description: "Commandez de délicieuses boissons préparées avec sois par nos baristas"
}

export default function Home() {
  return (
      <main>
          <BreadCrumbs  className={"p-10 px-40 bg-cream"} items={[
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
