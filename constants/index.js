/**
 * @typedef {'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December'} Month
 *
 **/

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const categories = categoryFacotory("Electronics", "Clothes", "Cars");

const products = [
  ...productsFacotory("Electronics", "Phones", "Laptops", "Cameras"),
  ...productsFacotory("Clothes", "T-Shirts", "Pants", "Underwear"),
  ...productsFacotory("Cars", "Compact", "SUV", "Sedan"),
];

const brands = [
  ...brandsFactory("Phones", "Apple", "Samsung", "Xiomi"),
  ...brandsFactory("Laptops", "Apple", "Lenovo", "Dell"),
  ...brandsFactory("Cameras", "Sony", "Canon", "GoPro"),

  ...brandsFactory("T-Shirts", "Reserva", "Tommy Hilfiger", "Lacoste"),
  ...brandsFactory("Pants", "Tommy Hilfiger", "Balenciaga", "Armani"),
  ...brandsFactory("Underwear", "Lupo", "Calvin Klein", "Versace"),

  ...brandsFactory("Compact", "Fiat", "BMW", "General Motors"),
  ...brandsFactory("SUV", "Jeep", "BMW", "Land Rover"),
  ...brandsFactory("Sedan", "Ferrari", "Honda", "Hyundai"),
];

/**
 * @type {Sales[]}
 */
const sales = [];

products.forEach((product) => {
  sales.push(...getRandomSalesByProduct(product.name));
});
