# Online Fruit Product Ordering Application

## Project Description

This is an online fruit product ordering application that allows customers to browse a catalog of products, add them to a cart, review their order, and complete the checkout process. 
The application is designed to provide a seamless and user-friendly experience for customers to select and purchase products.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)
- [Credits](#credits)

Features
Catalog
Customers can browse a catalog of products available for purchase.
Each product displays its name, price (in cents), and quantity (in kilograms).
Customers can add products to their cart, specifying the desired quantity.
The application supports adding multiple instances of the same product without summing their quantities.
Cart
Customers can review their selected products in the cart.
The cart displays a list of selected items, including the product name, quantity, price for the selected quantity, and a "Remove" button to remove items from the cart.
Customers can apply voucher codes for discounts:
HAPPYBIRTHDAY: 20% off the total price.
SUMMER: 200 cents off the total price.
ILIKEAPPLES: 60% off all apple products.
ILIKEPEARS: 40% off all pear products.
GREEN: 30% off all avocados and pears.
The total price and a counter of selected items are displayed in the cart.
Customers can add or remove voucher codes to apply or remove discounts.
Checkout
In the checkout step, customers provide payment information.
Required fields for payment include:
Card number (digits and spaces only).
Expiration date (future dates only).
CVV (3 or 4 digits).
Card Name (letters and spaces only).
Validation ensures that customers provide accurate and complete payment information.
After clicking the "Pay" button, a generic success message is displayed.
