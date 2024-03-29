import {CartData, ProductLineData} from "@/types";
import {ProductData} from "tp-kit/types";
import { create } from 'zustand'
import {wait} from "tp-kit/utils/wait";

export const useCart = create<CartData>(function() {
    return {
        lines: [],
        count: 0
    }
})

/**
 * Ajoute une nouvelle ligne au panier.
 * Si le produit est déjà dans le panier, augmente la quantité de 1.
 *
 * @param product
 */
export async function addLine(product: ProductData) {
    await wait(300);
    useCart.setState((panier: CartData) => {
        let produitDejaPresent = panier.lines.find(prdt => prdt.product.name == product.name);
        if (produitDejaPresent != undefined)
            produitDejaPresent.qty += 1;
        else {
            const newProduct: ProductLineData = {product: product, qty: 1}
            panier.lines.push(newProduct);
        }
        return {...panier, lines:[...panier.lines], count: (panier.lines.length)};
    })
}

/**
 * Modifie une ligne produit du panier
 *
 * @param line
 */
export function updateLine(line: ProductLineData) {
    useCart.setState((panier: CartData) => {
        let produitDejaPresent = panier.lines.find(prdt => prdt.product.name == line.product.name);
        if (produitDejaPresent != undefined)
            produitDejaPresent.qty = line.qty;
        return {...panier, lines:[...panier.lines]};
    })
}

/**
 * Supprime la ligne produit du panier
 *
 * @param productId
 * @returns
 */
export function removeLine(productId: number) {
    useCart.setState((panier: CartData) => {
        return {...panier, lines: panier.lines.filter(prdt => prdt.product.id != productId), count: (panier.lines.length - 1)};
    })
}

/**
 * Vide le contenu du panier actuel
 */
export function clearCart() {
    useCart.setState((panier: CartData) => {
        return {...panier, lines:[], count: 0};
    })
}

/**
 * Calcule le total d'une ligne du panier
 */
export function computeLineSubTotal(line: ProductLineData): number {
    return line.product.price * line.qty;
}

/**
 * Calcule le total du panier
 */
export function computeCartTotal(lines: ProductLineData[]): number {
    let sum = 0
    lines.forEach((line) => sum += computeLineSubTotal(line));
    return sum;
}