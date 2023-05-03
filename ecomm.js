
/*
const bar=document.getElementById('bar');
const close=document.getElementById('close');
const menu=document.getElementById('menubar');

if (bar){
    bar.addEventListener('click', ()=> {
        menu.classList.add('active');
    })
}

if (close){
    close.addEventListener('click', ()=> {
        menu.classList.remove('active');
    })
}*/

/*const scriptURL = "https://script.google.com/macros/s/AKfycbxbnCAq2Ox2DJaOe0b7MOPo18C-NLy-MqKLyXDwypRVKdfjGwzHovWKSPrdlKWs_OeJ/exec"
const form = document.forms['submit-to-google-sheet']
const msg= document.getElementById("msg")

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
      msg.innerHTML="Received!!"
      setTimeout(function(){
          msg.innerHTML=""
      },1000)
      form.reset()
  })
    .catch(error => console.error('Error!', error.message))
})*/

//cart

var cartIcon=document.querySelector("#cart-icon");
var cart=document.querySelector('.cart');
var closeCart=document.querySelector('#close-cart');

//cart open
cartIcon.onclick=()=>{
    cart.classList.add("active");
};

//cart close
closeCart.onclick=()=>{
    cart.classList.remove("active");
};

//cart work
if (document.readyState=="loading"){
    document.addEventListener("DOMContentLoaded", ready);
} else{
    ready();
}

function ready(){
    //remove items from cart
    var removeCartButtons= document.getElementsByClassName("cart-remove");
    console.log(removeCartButtons);
    for (var i=0; i<removeCartButtons.length;i++){
        var button=removeCartButtons[i];
        button.addEventListener("click", removeCartItems);
    }
    //change item numbers
    var quantityIn=document.getElementsByClassName("cart-quantity");
    for (var i=0; i<quantityIn.length; i++ ){
        var inputt=quantityIn[i];
        inputt.addEventListener("change", quantChange);
    }

    //add items to cart
    var addCart= document.getElementsByClassName("add-cart");
    for (var i=0; i< addCart.length; i++){
        var button=addCart[i];
        button.addEventListener("click", addCartClicked);
    }

    //buy btn
    document.getElementsByClassName(".btn-buy")[0].addEventListener("click", buyButton);


}

//remove items
function removeCartItems(event){
    var buttonClicked=event.target;
    buttonClicked.parentElement.remove();
    Uptotal();
}

//Quantity add/drop
function quantChange(event){
    var inputt= event.target;
    if (isNaN(inputt.value)|| inputt.value <= 0){
        inputt.value=1;
    }
    Uptotal();
}

//add
function addCartClicked(event){
    var button=event.target;
    var shopProd=button.parentElement;
    var title= shopProd.getElementsByClassName ("desc")[0].innerText;
    var price= shopProd.getElementsByClassName("price")[0].innerText;
    var prodImg= shopProd.getElementsByClassName("prod-img")[0].src;
    addProdToCart(title, price, prodImg);
    Uptotal();
}


//buy button
function buyButton(){
    alert("Your Order is placed");
    var cartContent=document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    Uptotal();
}

function addProdToCart(title, price, prodImg){
    var cartShopBox= document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems=document.getElementsByClassName("cart-content")[0];
    var cartItemNames=cartItems.getElementsByClassName("cart-prod-title");
    for (var i=0; i< cartItemNames.length; i++){
        if (cartItemNames[i].innerText==title){
            alert("Already added to cart");
            return;
        }
        
    } 

    var cartBoxContent=`
                    <img src="${prodImg}" class="cart-img">
                    <div class="detail-box">
                        <div class="cart-prod-title">${title}</div>
                        <div class="cart-price">${price}</div>
                        <input type="number" value="1" class="cart-quantity">
                    </div>
                    <i class="fa fa-duotone fa-trash cart-remove"></i>`;           

    cartShopBox.innerHTML=cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItems);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantChange);
    
}

//Total

function Uptotal(){
    var cartContent=document.getElementsByClassName("cart-content")[0];
    var cartBoxes=cartContent.getElementsByClassName('cart-box');
    var sumTotal=0;
    for (var i=0; i< cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement= cartBox.getElementsByClassName("cart-price")[0];
        var quantElement= cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("₹",""));
        var quantity= quantElement.value;
        sumTotal= sumTotal+ (price * quantity);
    }
        sumTotal=Math.round(sumTotal*100) / 100;

        document.getElementsByClassName("total-price")[0].innerText="₹"+sumTotal;
    
}

//local storage

function display(){
    localStorage.setItem("cart-content", ready);
}