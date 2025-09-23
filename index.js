async function loadProducts() {
  try {
    const res = await fetch("http://localhost:3000/products");
    const products = await res.json();

    // Group by category
    const categories = {};
    products.forEach((product) => {
      if (!categories[product.category]) {
        categories[product.category] = [];
      }
      categories[product.category].push(product);
    });

    // Render categories & products
    const container = document.getElementById("products-container");
    container.innerHTML = "";

    Object.keys(categories).forEach((category) => {
      const section = document.createElement("section");
      section.classList.add("product-category");

      section.innerHTML = `
        <h2>${category}</h2>
        <ul class="products">
          ${categories[category]
            .map(
              (p) => `
            <li>
              <span class="product-name">${p.name}</span>
              <span class="product-price">Ksh ${p.price}</span>
              <p>${p.description}</p>
              <button>Add to Cart</button>
            </li>
          `
            )
            .join("")}
        </ul>
      `;

      container.appendChild(section);
    });
  } catch (err) {
    console.error("Error loading products:", err);
  }
}

loadProducts();
