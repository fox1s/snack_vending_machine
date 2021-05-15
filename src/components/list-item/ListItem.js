import React from "react";

export default function ListItem({category, onClickBuy}) {
    return (
        <div>
            {category.name} - {category.price} - {category.count}
            <button onClick={() => onClickBuy(category)}>Buy</button>
        </div>
    );
}
