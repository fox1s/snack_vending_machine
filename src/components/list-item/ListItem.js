import React from "react";

export default function ListItem({category, onClickBuy}) {
    return (
        <div>
            {category.name} - {category.price} - {category.count}
            <button onClick={() => onClickBuy(category)} disabled={category.count <= 0}>Buy</button>
        </div>
    );
}
