"use client";

import { useState } from "react";
import { useDataContext } from "../context";

export default function ChooseCategory() {

    const { categories } = useDataContext();

    const [selectedValue, setSelectedValue] = useState<string>();

    return (
        <>
            <h2>Using select with option</h2>
            <select className="pick" onChange={(e) => {
                Object.values(e.target.children).map(node => {
                    const currentNode = node as HTMLOptionElement;
                    if (currentNode.selected) {
                        setSelectedValue(currentNode.value);
                    }
                });
            }}>
                {
                    categories.map(category => {
                        return <option
                            key={category.key}
                        >
                            {category.name}
                        </option>
                    })
                }
            </select>

            <h2>Using input with datalist</h2>
            <input type="text" list="categories" />
            <datalist id="categories">
                {
                    categories.map(category => {
                        return <option
                            key={category.key}
                        >
                            {category.name}
                        </option>
                    })
                }
            </datalist>
        </>
    );
}