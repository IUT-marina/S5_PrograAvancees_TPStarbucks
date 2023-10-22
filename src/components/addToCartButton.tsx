"use client";

import {ProductData} from "tp-kit/types";
import {addLine} from "@/hooks/use-cart";
import {Button} from "tp-kit/components";
import {useState} from "react";
import { Loader } from '@mantine/core';

interface ProductProps {
    product: ProductData
}
export default function AddToCartButton({product}: ProductProps) {

    const [waiting, setWaiting] = useState(false);
    async function addingToCart() {
        setWaiting(true);
        await addLine(product);
        setWaiting(false)
    }

    return (
        <Button
            fullWidth
            onClick={addingToCart}
            className={"flex justify-center bg-stGreen"}
        >
            {waiting &&
                <Loader color="gray" variant="dots" />
            }
            {!waiting &&
                "Ajouter au panier"
            }

        </Button>
    )
}