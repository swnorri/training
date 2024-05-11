import { useEffect, useState, useContext } from 'react';
import { fetchData } from '../fetch/http.js';
import { CartContext } from "../utils/shopping-cart-context.jsx";

import FoodTile from "./FoodTile.jsx";

export default function FoodTileContainer() {
    const { addToCart } = useContext(CartContext);
    const [mealsData, setMealsData] = useState([]);

    useEffect(() => {
        async function getMeals() {
            const meals = await fetchData('meals');
            if (meals.length) {
                setMealsData(meals);
            }
        }
        getMeals();
    }, []);

    return (
        <ul id="meals">
            {mealsData.map((meal) => {
                return <FoodTile
                    key={meal.id}
                    handleAddToCart={addToCart}
                    {...meal}
                />
            })}
        </ul>
    )
}