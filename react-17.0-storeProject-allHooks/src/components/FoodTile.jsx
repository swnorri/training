import { memo } from 'react';
import { BASE_PATH } from "../utils/basePath.js";

const FoodTile = memo(function FoodTile({
    id,
    image,
    name,
    price,
    description,
    handleAddToCart
}) {
    return (
        <li className="meal-item">
            <article>
                <img src={`${BASE_PATH}/${image}`} alt="" />
                <div>
                    <h3>{name}</h3>
                    <p className="meal-item-price">${price}</p>
                    <p className="meal-item-description">{description}</p>
                </div>
                <p className="meal-item-actions">
                    <button
                        type="button"
                        className="button"
                        onClick={() => handleAddToCart({
                            id,
                            name,
                            price
                        })}
                    >Add to Cart</button>
                </p>
            </article>
        </li>
    )
});
export default FoodTile;