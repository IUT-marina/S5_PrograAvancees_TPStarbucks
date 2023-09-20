import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import {
    BreadCrumbs,
    Button,
    Footer,
    Heading,
    ProductCardLayout,
    ProductGridLayout,
    SectionContainer
} from "tp-kit/components";
const categories = PRODUCTS_CATEGORY_DATA;
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

          <div className="flex min-h-screen flex-col justify-between p-10">
              
              <BreadCrumbs items={[
                  {
                      "label": "Accueil",
                      "url": "#"
                  }
              ]}></BreadCrumbs>

              {categories.map(category =>
                  <SectionContainer key={category.id}>
                      <Heading
                          as="h1"
                          size="md"
                          variant="brand"
                          weight="bold"
                          className={"p-5"}
                      >
                          {category.name} ({category.products.length})
                      </Heading>

                      <ProductGridLayout key={category.id} products={category.products} >
                          {product =>
                              <ProductCardLayout
                                  key={product.id}
                                  button={<Button fullWidth variant="ghost">Ajouter au panier</Button>}
                                  product={product}
                              />}
                      </ProductGridLayout>
                  </SectionContainer>)}
          </div>

          <Footer />
    </main>
  )
}
