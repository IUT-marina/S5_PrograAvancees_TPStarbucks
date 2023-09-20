"use client";

import {ProductsCategoryData} from "tp-kit/types";
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
const categories = PRODUCTS_CATEGORY_DATA;
import {ProductFilterResult} from "@/types";

import { MagnifyingGlass } from '@phosphor-icons/react';

import { TextInput, Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';
import {Button} from "tp-kit/components";

interface CategoriesToFilter {
    categories: ProductsCategoryData[]
    onChange? : (filters: ProductFilterResult) => void
}
export default function ProductFilters({}: CategoriesToFilter) {

    return (
        <form>
           <TextInput
               id={"search"}
               placeholder={"Rechercher une boisson"}
               icon={<MagnifyingGlass/>}
               className={"p-3 min-w-fit"}
           ></TextInput>
            {categories.map(category => {
                return (
                    <Checkbox.Group key={category.id} className={"flex flex-col"}>
                        <Checkbox id={'checkbox' + category.id}
                                  value={category.slug}
                                  label={category.name + ' (' + category.products.length + ')'}
                                  className={"p-1 font-semibold"}
                        />
                    </Checkbox.Group>
                )
            })}
            <Button type={"submit"} variant="primary" className={"min-w-fit text-black"}>Filtrer</Button>
        </form>
    )
}
