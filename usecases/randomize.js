/**
 *
 * @param {Month?} notIn
 */
function getRandomMonth(notIn = []) {
  const filteredMonths = months.filter((month) => !notIn.includes(month));
  return filteredMonths[Math.floor(Math.random() * filteredMonths.length)];
}

/**
 * This function generate a random list of sales by product and brand
 *
 * @param {string} product_name
 * @param {string} brand_name
 *
 * quantity accepts numbers between 1-12
 * @param {number}  quantity
 */
function getRandomSalesByProductBrand(product_name, brand_name, quantity) {
  if (quantity === 0 || quantity > 12)
    throw new Error(`Quantity must be a number between 1 and 12.`);
  const sales = [];

  for (let i = 0; i < quantity; i++) {
    sales.push({
      reference: getRandomMonth(sales.map((sale) => sale.reference)),
      total_sales: Math.ceil(Math.random() * 100),
    });
  }

  return salesFactory(product_name, brand_name, sales);
}

/**
 * This function generate a random list of sales by product including all brands.
 *
 * @param {string} product_name
 * @param {number}  quantity quantity accepts numbers between 1-12
 */
function getRandomSalesByProduct(product_name, quantity = 12) {
  if (quantity === 0 || quantity > 12)
    throw new Error(`Quantity must be a number between 1 and 12`);

  const product = products.find((p) => p.name === product_name);
  if (!product) throw new Error(`Product name [${product_name}] not found.`);

  const randomSales = brands
    .filter((brand) => brand.product_id === product.id)
    .map((brand) => {
      return getRandomSalesByProductBrand(product_name, brand.name, quantity);
    })
    .map((sale) => {
      return sale.sort(sortSalesByMonth);
    });

  return randomSales.reduce(
    (accumulator, current) => [...accumulator, ...current],
    []
  );
}

/**
 *
 * @param {Sales} a
 * @param {Sales} b
 * @returns {(1 | -1 | 0)}
 */
function sortSalesByMonth(a, b) {
  if (months.indexOf(a.reference) > months.indexOf(b.reference)) return 1;
  else if (months.indexOf(a.reference) < months.indexOf(b.reference)) return -1;
  else return 0;
}
