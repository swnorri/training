import { BASE_PATH } from "../utils/basePath.js";

export async function fetchData(path, dataset) {
    switch (path) {
        case 'meals': {
            const resp = await fetch(`${BASE_PATH}/meals`);
            const data = await resp.json();
            if (!resp.ok) {
                throw new Error('Failed to fetch meals');
            }
            return data;
        }
            break;
        case 'orders': {
            const resp = await fetch(`${BASE_PATH}/orders`, {
                method: 'POST',
                body: JSON.stringify({
                    order: dataset
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            var data = await resp.json();
            if (!resp.ok) {
                throw new Error('Failed to fetch meals');
            }
            return data;
        }
            break;
    }
}