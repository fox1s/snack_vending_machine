import React from "react";

export default function ListItem({category}) {
    return (
        <div>
            {category.name} - {category.price} - {category.count}
        </div>
    );
}
