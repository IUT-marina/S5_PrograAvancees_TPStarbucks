import {NextRequest, NextResponse} from "next/server";
import prisma from "@/utils/prisma";
import {ProductsCategoryData} from "tp-kit/types";

export async function GET(request: NextRequest)
{
    let search: string = request.nextUrl.searchParams.get("search") ?? ''.trim();
    const cat: string[] = request.nextUrl.searchParams.getAll('cat');

    let categories: ProductsCategoryData[];
    let paramsQuery = {
        "where": "",
        "search": ""
    };

    if (cat.length > 0)
        paramsQuery.where = "category";
    if (search != '')
        paramsQuery.search = search;

    if (paramsQuery.where != "" && paramsQuery.search != "") {
        categories = await prisma.productCategory.findMany({
            where: {
                slug: {
                    in: cat
                }
            },
            include: {
                products: {
                    where: {
                        slug: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    }
                }
            }
        });
    }
    // Pas de catégories filtrées mais un search
    else if (paramsQuery.where == "" && paramsQuery.search != "") {
        categories = await prisma.productCategory.findMany({
            include: {
                products: {
                    where: {
                        name: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    }
                }
            }
        });
    }
    // Des catégories filtrées mais pas de search
    else if (paramsQuery.where != "" && paramsQuery.search == "") {
        categories = await prisma.productCategory.findMany({
            where: {
                slug: {
                    in: cat
                }
            },
            include: {
                products: {}
            }
        });
    }
    else {
        categories = await prisma.productCategory.findMany({
            include: {
                products: {}
            }
        });
    }

    return NextResponse.json(
        {
            "params": {
                "categoriesSlugs": cat,
                "search": search,
            },
            "categories": categories
        }
    );

}