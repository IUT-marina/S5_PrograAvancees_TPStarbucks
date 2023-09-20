"use client";

import {ProductsCategoryData} from "tp-kit/types";
import {Button} from "tp-kit/components";
import {ProductFiltersResult} from "@/types";

import { MagnifyingGlass } from '@phosphor-icons/react';

import { TextInput, Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';

interface CategoriesToFilter {
    categories: ProductsCategoryData[]
    onChange? : (filters: ProductFiltersResult) => void
}
export default function ProductFilters({categories, onChange}: CategoriesToFilter) {

    const form = useForm({
        initialValues: {
            categoriesSlugs: [],
            search: ''
        }
    })

    return (
        <form onSubmit={form.onSubmit((values) => onChange!(values))}>
           <TextInput
               id={"search"}
               placeholder={"Rechercher une boisson"}
               icon={<MagnifyingGlass/>}
               className={"p-3 min-w-fit"}
               {...form.getInputProps("search")}
           ></TextInput>
            {categories.map(category => {
                return (
                    <Checkbox.Group key={category.id}
                                    className={"flex flex-col"}
                                    {...form.getInputProps("categoriesSlugs")}
                    >
                        <Checkbox id={'checkbox' + category.id}
                                  label={category.name + ' (' + category.products.length + ')'}
                                  className={"p-1 font-semibold"}
                                  value={category.slug}
                        />
                    </Checkbox.Group>
                )
            })}
            <Button type={"submit"} variant="primary" className={"min-w-fit text-black"}>Filtrer</Button>
        </form>
    )
}
