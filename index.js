function getCurrentCategory() {
  const value = document.getElementById("category-selector").value;
  return categories.find((c) => c.id === Number(value));
}

function getCurrentProduct() {
  const value = document.getElementById("product-selector").value;
  return products.find((p) => p.id === Number(value));
}

function getCurrentBrand() {
  const value = document.getElementById("brand-selector").value;
  return brands.find((b) => b.id === Number(value));
}

const renderProductOptions = () =>
  renderOptions(
    document.getElementById("product-selector"),
    products.filter((p) => p.category_id === getCurrentCategory().id),
    renderBrandOptions
  );

const renderBrandOptions = () =>
  renderOptions(
    document.getElementById("brand-selector"),
    brands.filter((b) => b.product_id === getCurrentProduct()?.id)
  );

function renderOptions(selectorElement, filteredItems, callback) {
  selectorElement.querySelectorAll("option").forEach((node) => {
    if (node.value !== "") selectorElement.removeChild(node);
  });

  for (let item of filteredItems) {
    const option = document.createElement("option");
    option.value = String(item.id);
    option.text = item.name;

    selectorElement.appendChild(option);
  }

  if (callback) callback();
}

let chart = null;

function onSelectChange(event) {
  const name = event.target.name;
  switch (name) {
    case "category":
      renderProductOptions();
      renderChart();
      break;
    case "product":
      renderBrandOptions();
      renderChart();
      break;
    case "brand":
      renderChart();
      break;
  }
}

function renderChart() {
  const salesByProduct = {};

  sales
    .filter((sale) => sale.product_id === getCurrentProduct().id)
    .forEach((sale) => {
      salesByProduct[sale.reference] = salesByProduct[sale.reference]
        ? salesByProduct[sale.reference] + sale.total
        : sale.total;
    });

  const datasets = [];
  const currentBrand = getCurrentBrand();

  datasets.push({
    type: "line",
    label: currentBrand ? `Total of ${currentBrand.name}` : "",
    data: Object.entries(salesByProduct).map((sale) => sale[1]),
    borderWidth: 1,
  });

  if (!getCurrentBrand()) {
    const filteredBrands = brands.filter(
      (b) => b.product_id === getCurrentProduct().id
    );

    for (let brand of filteredBrands) {
      datasets.push({
        type: "bar",
        label: `Total of ${brand.name}`,
        data: sales.filter((s) => s.brand_id === brand.id).map((s) => s.total),
        borderWidth: 1,
      });
    }
  }

  const ctx = document.getElementById("chart");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    data: {
      labels: months,
      datasets,
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      responsive: true,
    },
  });
}

function main() {
  renderOptions(
    document.getElementById("category-selector"),
    categories,
    renderProductOptions
  );

  renderChart();
}

document.addEventListener("DOMContentLoaded", () => main());
// window.addEventListener("resize", (e) => {
//   const height = window.innerHeight;
//   const width = window.innerWidth;

//   if (chart) {
//     // chart.canvas.parentNode.style.height = `${Math.floor(height * 0.8)}px`;
//     chart.canvas.parentNode.style.width = `${Math.floor(width * 0.8)}px`;
//   }
// });
