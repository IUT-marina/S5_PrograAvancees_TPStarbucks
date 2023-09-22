"use client";

import {ProductAttribute} from "@/types";
import {ProductRating} from "tp-kit/components";
import styles from './productAttributesTable.module.css';

interface ProductAttributes {
    attributes: ProductAttribute[]
}
export default function ProductAttributesTable({attributes}: ProductAttributes) {
    return (
        <table>
            <tbody>

                    {attributes.map((attribute, i) => {
                            return (
                                <tr key={i} className={styles.attributesTable}>
                                    <td>
                                        {attribute.label}
                                    </td>
                                    <td>
                                        <ProductRating
                                            value={attribute.rating}
                                            icon={"circle"}
                                        ></ProductRating>
                                    </td>
                                </tr>
                            )
                        }
                    )}
            </tbody>
        </table>
    )
}