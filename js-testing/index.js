import { fibonacci as fib1, fibonacciRecursive as fib2} from "./fibonacci.js";

window.handleOnClick = (e) => {
    e.preventDefault();

    const byId = (id) => document.getElementById(id);

    switch (e.target.id) {
        case 'fibonacciMem': {
            byId('fibonacci_output').value = fib1(byId('fibonacci_input').value);
        }
        case 'fibonacciRec': {
            byId('fibonacci_output').value = fib2(byId('fibonacci_input').value);
        }
    }
}
