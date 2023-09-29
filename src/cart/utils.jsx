export function calculateTotalPrice() {
    let totalPrice = 0;

    for (const item of cart) {
        totalPrice += item.totalPrice;
    }
    return totalPrice.toFixed(2);
};

