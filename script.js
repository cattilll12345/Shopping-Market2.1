/*=========================PRODUCT DATA=========================*/
const products = {"Mobile Phone 1": 15000,"Mobile Phone 2": 20000,"Headphone 1": 1499,"Headphone 2": 2499,"Rice": 450,"Curd": 90,"Milk": 60,"Chicken": 250,"Eggs": 100,"Dark Chocolate": 150,"Cricket Kit": 3999,"Chess Kit": 799,"Carroms Kit": 2499,"T Shirt 1": 799,"T Shirt 2": 999};
/*=========================SHOPPING CART=========================*/
let cart = [];
/*=========================ADD TO CART=========================*/
function addToCart(productName, price)
{
  const existingProduct = cart.find(item => item.name === productName);
  if (existingProduct)
  {
    existingProduct.quantity++;
  }
  else
  {
    cart.push({name: productName,price: price,quantity: 1});
    displayCart();
  }
}
/*=========================DISPLAY CART=========================*/
function displayCart()
{
  const cartItems = document.getElementById("cartItems");
  const totalItems = document.getElementById("totalItems");
  const totalAmount = document.getElementById("totalAmount");
  if (cart.length === 0)
  {
    cartItems.innerHTML = "Your cart is empty.";
    totalItems.innerText = "0";
    totalAmount.innerText = "0";
    return;
  }
  let html = "";
  let itemsCount = 0;
  let total = 0;
  cart.forEach((item, index) => {const itemTotal =item.price *item.quantity;itemsCount += item.quantity;total +=itemTotal;
    html += `<div class="cart-item">
    <div>
    <strong>${item.name}</strong>
    <br>
    ₹${item.price}
    ×
    ${item.quantity}
    =
   ₹${itemTotal}
   <div><button onclick="decreaseQuantity(${index})">−</button>${item.quantity}
   <button onclick="increaseQuantity(${index})">+</button>
   <button onclick="removeProduct(${index})">Remove</button>
   </div>`;
  }
);
cartItems.innerHTML = html;
totalItems.innerText = itemsCount;
totalAmount.innerText = total.toLocaleString("en-IN");
}
/*=========================INCREASE QUANTITY=========================*/
function increaseQuantity(index)
{
  cart[index].quantity++;
  displayCart();
}
/*=========================DECREASE QUANTITY=========================*/
function decreaseQuantity(index)
{
  if
  (
    cart[index].quantity > 1
  )
  {
    cart[index].quantity--;
  }
  else
  {
    cart.splice(index, 1);
  }
  displayCart();
}
/* =========================REMOVE PRODUCT=========================*/
function removeProduct(index)
{
  cart.splice(index, 1);
  displayCart();
}
/* =========================ORDER FORM========================= */
const productType = document.getElementById("productType");
const orderQuantity =document.getElementById("orderQuantity");
const orderTotal =document.getElementById("orderTotal");
/* =========================
   CALCULATE ORDER TOTAL
========================= */
function calculateOrderTotal()
{
  const selectedProduct =productType.value;
  const quantity =Number(orderQuantity.value);
  if
  (
    selectedProduct === ""||!products[selectedProduct]
  )
  {
    orderTotal.value ="₹0";
    return;
  }
  const price =products[selectedProduct];
  const total =price * quantity;
  orderTotal.value ="₹" +total.toLocaleString("en-IN");
}
/* =========================
   PRODUCT CHANGE
========================= */
productType.addEventListener("change",calculateOrderTotal);
/* =========================
   QUANTITY CHANGE
========================= */
orderQuantity.addEventListener("input",calculateOrderTotal);
/* =========================
   SUBMIT ORDER
========================= */
document.getElementById("orderForm")
.addEventListener("submit",function(event)
{
  event.preventDefault();
  const customerName =document.getElementById("customerName").value;
  const phone =document.getElementById("phone").value;
  const customerType =document.getElementById("customerType").value;
  const selectedProduct =productType.value;
  const quantity =Number(orderQuantity.value);
  const address =document.getElementById("deliveryAddress").value;
  const price =products[selectedProduct];
  const total =price * quantity;
  /* Display success message */
  const successMessage =document.getElementById("successMessage");
  successMessage.style.display ="block";
  successMessage.innerHTML = `<h3>✓ Order Received Successfully!</h3>
  <p>Thank you,</p>
  <strong>${customerName}</strong>.
  <p>Product:${selectedProduct}</p>
  <p>Quantity:${quantity}</p>
  <p>Total Amount:₹${total.toLocaleString("en-IN")}</p>
  <p>Delivery Address:${address}</p>`;
  /* Show order in browser console */
  console.log("Customer Name:",customerName);
  console.log("Phone:",phone);
  console.log("Customer Type:",customerType);
  console.log("Product:",selectedProduct);
  console.log("Quantity:",quantity);
  console.log("Total Amount:",total);
  console.log("Delivery Address:",address);
  /* Scroll to success message */
  successMessage.scrollIntoView({behavior: "smooth"});
}
);
/* =========================INITIAL CART========================= */
displayCart();