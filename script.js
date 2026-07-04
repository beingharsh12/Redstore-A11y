const ProductsGrid = document.querySelector(".main");
const navLinks = document.querySelector(".navLinks");
const menu = document.querySelector(".menu-icon");

menu.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("active");

  menu.setAttribute("aria-expanded", isOpen);

  menu.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu",
  );
});

let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

async function addProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    products = await res.json();

    ProductsGrid.innerHTML = products
      .map((obj, index) => {
        const title = obj.title;
        const shortTitle = obj.title.split(" ").slice(0, 6).join(" ");
        const shortDescription = obj.description
          .split(" ")
          .slice(0, 15)
          .join(" ");

        return `
          <article class="prod" data-aos="zoom-in">
            <div class="image">
              <img src="${obj.image}" alt="${title}">
            </div>
            <div class="description">
              <h3 class="productTitle">${shortTitle}</h3>
              <p>${shortDescription}</p>
              <div class="price">
                <p class="current-price">$${obj.price}</p>
              </div>
              <button class="addCart btn" data-index="${index}" aria-label="Add ${title} to cart">Add To Cart</button>
            </div>
          </article>
        `;
      })
      .join("");
  } catch (error) {
    ProductsGrid.innerHTML =
      '<p role="status">Products are unavailable right now. Please try again later.</p>';
  } finally {
    ProductsGrid.setAttribute("aria-busy", "false");
  }
}

if (ProductsGrid) {
  addProducts();
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("addCart")) {
    const product = products[e.target.dataset.index];

    if (!product) {
      return;
    }

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  if (e.target.classList.contains("addCart")) {
    // alert(`product added to cart!`);
  }
});
