let products = JSON.parse(localStorage.getItem("products")) || [
  { id: 1, name: "Premium Sneakers", price: 3200, image: "images/sneakers.jpg", color: "#000" },
  { id: 2, name: "Smart Watch", price: 5999, image: "images/watch.jpg", color: "#ff9900" },
  { id: 3, name: "Bluetooth Speaker", price: 2199, image: "images/speaker.jpg", color: "#00bcd4" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display products on the page
function showProducts() {
  const productList = document.getElementById("product-list");
  if (!productList) return;
  productList.innerHTML = "";
  products.forEach(p => {
    productList.innerHTML += `
      <div class="card" style="border-color: ${p.color}">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>PKR ${p.price}</p>
        <p>Color: <span style="color:${p.color}">${p.color}</span></p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(product.name + " added to cart!");
}

// Show cart
function showCart() {
  const cartItems = document.getElementById("cart-items");
  if (!cartItems) return;
  let total = 0;
  cartItems.innerHTML = "";
  cart.forEach((item, index) => {
    total += item.price;
    cartItems.innerHTML += `
      <div class="card">
        <h4>${item.name}</h4>
        <p>PKR ${item.price}</p>
        <button onclick="removeItem(${index})">Remove</button>
      </div>`;
  });
  document.getElementById("total").innerText = "Total: PKR " + total;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

// Admin panel logic
function handleAdminForm() {
  const adminForm = document.getElementById("admin-form");
  if (!adminForm) return;
  adminForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("product-name").value;
    const price = parseInt(document.getElementById("product-price").value);
    const imageInput = document.getElementById("product-image");
    const color = document.getElementById("product-color").value;

    const reader = new FileReader();
    reader.onload = function () {
      const newProduct = {
        id: Date.now(),
        name,
        price,
        image: reader.result,
        color: color
      };
      products.push(newProduct);
      localStorage.setItem("products", JSON.stringify(products));
      alert("Product Added!");
      location.reload();
    };
    reader.readAsDataURL(imageInput.files[0]);
  });
}

// Show products in the admin panel
function showAdminProducts() {
  const adminList = document.getElementById("admin-product-list");
  if (!adminList) return;
  adminList.innerHTML = "";
  products.forEach((p, index) => {
    adminList.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>PKR ${p.price}</p>
        <p>Color: <span style="color:${p.color}">${p.color}</span></p>
        <button onclick="deleteProduct(${index})">Delete</button>
      </div>
    `;
  });
}

function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  location.reload();
}

window.addEventListener("DOMContentLoaded", () => {
  showProducts();
  showCart();
  handleAdminForm();
  showAdminProducts();
});
