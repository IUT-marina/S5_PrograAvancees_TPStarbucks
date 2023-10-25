import { PrismaClient } from '@prisma/client'
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";

const prisma = new PrismaClient()
async function main() {
    for (const productCategories of PRODUCTS_CATEGORY_DATA) {

        const productCategoriesToCreate = await prisma.productCategory.upsert({
            where: {id: productCategories.id},
            update: {},
            create: {
                id: productCategories.id,
                slug: productCategories.slug,
                name: productCategories.name
            },
        })

        const products = productCategories.products;
        for (const product of products) {
            const productsToCreate = await prisma.product.upsert({
                where: {id: product.id},
                update: { },
                create: {
                    id: product.id,
                    slug: product.slug,
                    name: product.name,
                    img: product.img,
                    path: product.path,
                    price: product.price,
                    desc: product.desc,
                    categoryId: productCategories.id
                }
            })
        }

        /*const products = productCategories.products;
        for (const product of products) {
            const productsToCreate = await prisma.product.create({
               data: {
                       id: product.id,
                       slug: product.slug,
                       name: product.name,
                       img: product.img,
                       path: product.path,
                       price: product.price,
                       desc: product.desc,
                       categoryId: productCategories.id
                   }
            })
        }*/
    }

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
