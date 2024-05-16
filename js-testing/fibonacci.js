export const fibonacci = (n, rec = {}) => {
    if (rec[n]) {
        return rec[n];
    }
    if (n <= 1) {
        return n;
    } else {
        rec[n] = fibonacci(n - 1, rec) + fibonacci(n - 2, rec);
        return rec[n];
    }
};
export const fibonacciRecursive = (n) => {
    if (n > 1) {
        var x = 0;
        var y = 1;
        var z = 0;
        for (let index = 2; index < n; index++) {
            z = x + y;
            x = y;
            y = z;
        }
        return x + y;
    } else {
        return n;
    }
};