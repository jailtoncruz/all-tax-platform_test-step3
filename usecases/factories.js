/**
 * @param  {...string} names
 * @returns {{ id: number, name: string }[]}
 */
function categoryFacotory(...names) {
  return names.map((name) => {
    return {
      id: randomId(),
      name,
    };
  });
}

/**
 * @param {string} category_name
 * @param  {...string} product_names
 * @returns {{ id: number, name: string, category_id: number }[]}
 */
function productsFacotory(category_name, ...product_names) {
  const category = categories.find((c) => c.name === category_name);
  if (!category) throw new Error(`Category name [${category_name}] not found.`);

  return product_names.map((name) => {
    return {
      id: randomId(),
      name,
      category_id: category.id,
    };
  });
}

/**
 * @param {string} product_name
 * @param  {...string} brands
 * @returns {{ id: number, name: string, product_id: number }[]}
 */
function brandsFactory(product_name, ...brands) {
  const product = products.find((p) => p.name === product_name);
  if (!product) throw new Error(`Product name [${product_name}] not found.`);

  return brands.map((name) => {
    return {
      id: randomId(),
      name,
      product_id: product.id,
    };
  });
}

/**
 * @typedef {{ id: number, product_id: number, brand_id: string, reference: Month, total: number }} Sales
 *
 * @param {string} product_name
 * @param {string} brand_name
 * @param  {{ reference: Month, total_sales: number }[]} sales
 * @returns {Sales[]}
 *
 * E.g.: salesFactory("Product", "Brand", { reference: "April", total_sales: 10 });
 */
function salesFactory(product_name, brand_name, sales) {
  const product = products.find((p) => p.name === product_name);
  if (!product) throw new Error(`Product name [${product_name}] not found.`);

  const brand = brands.find(
    (b) => b.name === brand_name && b.product_id === product.id
  );
  if (!brand) throw new Error(`Brand name [${brand_name}] not found.`);

  return sales.map((sale) => {
    return {
      id: randomId(),
      product_id: product.id,
      brand_id: brand.id,
      reference: sale.reference,
      total: sale.total_sales,
    };
  });
}
