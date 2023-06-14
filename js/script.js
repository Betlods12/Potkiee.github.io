const header = document.getElementById("header");

window.addEventListener("scroll", function() {
	header.classList.toggle("sticky", window.scrollY > 80);
});

let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let cartClose = document.querySelector('#close-cart')

cartIcon.onclick = () => 
{
  cart.classList.add("active");
};

cartClose.onclick = () => 
{
  cart.classList.remove("active");
};


if (document.readyState == "loading")
{
  document.addEventListener("DOMContentLoaded", ready);
}
else {
  ready();
}

function ready() {
    var removeCartButton = document.getElementsByClassName("cart-remove");

    for (var i = 0; i < removeCartButton.length; i++) {
      removeCartButton[i].addEventListener("click", removeItem);
    }

    var qtyInputs = document.getElementsByClassName("cart-qty");
     for (var i = 0; i < qtyInputs.length; i++) 
     {
        var inputs = qtyInputs[i];
        inputs.addEventListener("change", qtyChanged);
     }

     var AddtoCart = document.getElementsByClassName("add-cart");
     for (var i = 0; i < AddtoCart.length; i++) 
    {
      var button = AddtoCart[i];
      button.addEventListener("click", AddtoCartClicked);
    }

    document.getElementsByClassName("btn-checkout")[0].addEventListener("click", checkoutBtn);
  }


  function checkoutBtn() {
  var cartDetails = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartDetails.getElementsByClassName("cart-box");
  var total = 0;

  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceEl = cartBox.getElementsByClassName("cart-price")[0];
    var qtyEl = cartBox.getElementsByClassName("cart-qty")[0];
    var price = parseFloat(priceEl.innerText.replace("₱", ""));
    var qty = qtyEl.value;
    total = total + price * qty;
  }

    total = Math.round(total * 100) / 100;
  var cartDetails = document.getElementsByClassName("cart-content")[0];
  if (cartDetails.children.length === 0) {
    alert("Add to cart first");
    return;
  }

  alert("Your order is placed "+"\n"+"Total: ₱"+total);

  while (cartDetails.hasChildNodes()) {
    cartDetails.removeChild(cartDetails.firstChild);
  }

  updateTotal();
}

function removeItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal(); 
}

function qtyChanged(event)
{
  var inputs = event.target
  if (isNaN (inputs.value) || inputs.value <= 0) 
  {
    inputs.value = 1 
  }
  updateTotal();
}

var cartProductTitles = [];

function AddtoCartClicked(event) {
  var button = event.target;
  var shopping = button.parentElement;
  var title = shopping.getElementsByClassName("product-title")[0].innerText;
  var price = shopping.getElementsByClassName("price")[0].innerText;
  var imgProd = shopping.getElementsByClassName("img-product")[0].src;
  addProductinCart(title, price, imgProd);
  updateTotal();
}

var addToCartButtons = document.getElementsByClassName("add-cart");
for (var i = 0; i < addToCartButtons.length; i++) {
  addToCartButtons[i].addEventListener("click", AddtoCartClicked);
}

function addProductinCart(title, price, imgProd) {
  if (cartProductTitles.includes(title)) {
    alert("Product already exists");
    return;
  }

  cartProductTitles.push(title);

  var cartBoxShop = document.createElement("div");
  cartBoxShop.classList.add("cart-box");
  var Itemscart = document.getElementsByClassName("cart-content")[0];

  var cartContentBox = `
    <img src="${imgProd}" alt="" class="cart-img"> 
    <div class="box-details"> 
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-qty">
    </div>
    <i class="bx bxs-trash-alt cart-remove"></i> 
  `;

  cartBoxShop.innerHTML = cartContentBox;
  Itemscart.appendChild(cartBoxShop);

  cartBoxShop.getElementsByClassName("cart-remove")[0].addEventListener("click", removeItem);
  cartBoxShop.getElementsByClassName("cart-qty")[0].addEventListener("change", qtyChanged);

  alert("Product added");
}

function updateTotal() {
  var cartDetails = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartDetails.getElementsByClassName("cart-box");
  var total = 0;

  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceEl = cartBox.getElementsByClassName("cart-price")[0];
    var qtyEl = cartBox.getElementsByClassName("cart-qty")[0];
    var price = parseFloat(priceEl.innerText.replace("₱", ""));
    var qty = qtyEl.value;
    total = total + price * qty;
  }

    total = Math.round(total * 100) / 100;

    document.getElementsByClassName("total-price")[0].innerText = "₱" + total;
}

 document.getElementById("contactForm").addEventListener("submit", function(event) {
        event.preventDefault(); 

        // Get form data
        var fullName = document.getElementsByName("fullName")[0].value;
        var email = document.getElementsByName("email")[0].value;
        var message = document.getElementsByName("message")[0].value;

        // Check if any required field is empty
        if (fullName === "" || email === "" || message === "") {
            alert("Please fill in all required fields.");
        } else {
            alert("Form submitted!\n\nFull Name: " + fullName + "\nEmail: " + email + "\nMessage: " + message);

            
            // To Clear form fields
            document.getElementById("contactForm").reset();
        }
    });