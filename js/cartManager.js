// setup event Listeners 
var setupListeners = function () {
    var addProduct_btn_list = document.getElementsByClassName("addProduct_btn");
    if (addProduct_btn_list != null) {
        for (let i = 0; i < addProduct_btn_list.length; i++) {
            addProduct_btn_list[i].addEventListener('click', addProduct);
        }
    }

    var insertProduct_btn = document.getElementById('insertProduct_btn');
    if (insertProduct_btn != null) {
        insertProduct_btn.addEventListener('click', insertProduct);
        insertProduct_btn.addEventListener('click',addProduct);
        
    
    }

    var checkout_btn_1 = document.getElementById("checkout_btn1");
    if(checkout_btn_1!=null){
        checkout_btn_1.addEventListener('click', checkout);
    }
    
    var checkout_btn_2 = document.getElementById("checkout_btn2");
    if(checkout_btn_2!=null){
        checkout_btn_2.addEventListener('click', checkout);
    }
}
//load listeners on page Load
window.addEventListener('load', setupListeners);

// variables
var totalStore=document.querySelector("#totalStore");
var totalDisplay=document.querySelector("#totalDisplay");
var  tbody = document.querySelector("tbody");


var prodCountStore = document.getElementById('prodCountStore');
var prodCountDisplay = document.getElementById('prodCountDisplay');
var currentCount = parseInt(prodCountStore.value);



// adds product count display (when initial count = 0) on the navBar's Link to the cart in both artefacts.html and cauldron.html
// updates the count value on subsequent calls
var addProduct = function () {
    if (currentCount == 0) {
        document.getElementById('cauldronImg').src = "img/cauldron_full.png";
        prodCountDisplay.classList.remove('d-none');
    }
    currentCount++;
    prodCountStore.value = currentCount;
    prodCountDisplay.innerHTML = currentCount.toString();
}

// reduces product count on  the navbar's icon
// removes the product count display if current count = 0 
function removeProduct(){
    if (currentCount>0){
        currentCount--;
    }
    
    if (currentCount == 0) {
        document.getElementById('cauldronImg').src = "img/cauldron_empty.png";
        prodCountDisplay.classList.add('d-none');
    }
    
    prodCountStore.value = currentCount;
    prodCountDisplay.innerHTML = currentCount.toString();

}

//inserts a Product to the Product Table in cauldron.html
var insertProduct =function(){

    //document elements 
    let totalrow=document.querySelector("tbody #totalrow");

    let prodSelector = document.querySelector("#prodSelector");
    let priceInput=document.querySelector("#priceInput");
    let qtyInput=document.querySelector("#qtyInput");

    //values 
    let currentTotal = parseFloat(totalStore.value);

    let prod  = prodSelector.value;
    let price = parseFloat(priceInput.value);
    let qty   = parseInt(qtyInput.value);
        
    let subtotal = price*qty;
    let del_btn = "<button class=\"invisible-btn deleteProduct_btn\" onclick=\"deleteProduct(this)\"><i class=\"far fa-trash-alt\"></i></button>"
    let data = [prod, qty,price,subtotal, del_btn];

    //Create a new line in the table 
    let newTR = document.createElement("TR");

    //insert newTR in Table
    tbody.insertBefore(newTR, totalrow);

    //Create a new TD for every Data element
    for (let i  = 0; i<data.length; i++){

        //create newTD
        let newTD=document.createElement("TD");
        //insert newTD in newTR
        newTR.appendChild(newTD);
        //newTD's content:
        if(i==4){
            newTD.innerHTML=data[i];
        }
        else{
            newTD.appendChild(document.createTextNode(data[i]));
        }
        
    }
    
    // update total: 
    
    if (currentTotal==0){
        totalDisplay.classList.remove("d-none");
    }
    currentTotal+=subtotal;
    totalStore.value=currentTotal;
    
    totalDisplay.innerHTML=currentTotal.toString()+" TND";

    //input Cleaup: 
     prodSelector.selectedIndex=0;
     priceInput.value="";
     qtyInput.value="";

    // disable button 
    insertProduct_btn.disabled=true;

}

//removes a product line from the table
function deleteProduct(btn){
    let currentTotal = parseFloat(totalStore.value);

    let parentTD = btn.parentNode;
    let parentTR = parentTD.parentNode;

    
    let linePrice=parseFloat(parentTD.previousSibling.innerHTML);
    
    currentTotal -= linePrice;
    
    // update Total
    totalStore.value=currentTotal;
    if (currentTotal>0){
        totalDisplay.innerHTML=currentTotal.toString()+" TND";
    }
    else{
        totalDisplay.classList.add("d-none");
    }
    
    //remove the line from the table
    parentTR.remove();

    // reduce product count on navbar Icon
    removeProduct();
}

var checkout= function(){
    let  tbody = document.querySelector("tbody");
    let listTR = tbody.childNodes;
    let currentTotal = parseFloat(totalStore.value);

    while(listTR.length>2){
        removeProduct();
        listTR[0].remove();
    }

    currentTotal = 0;
    totalStore.value=currentTotal;
    totalDisplay.classList.add("d-none");
}

var activateBtn = function(){
    let prod = document.querySelector("#prodSelector").value;
    let price=parseFloat(document.querySelector("#priceInput").value);
    let qty=parseInt(document.querySelector("#qtyInput").value);
    let insertProduct_btn = document.getElementById('insertProduct_btn');
    
    if (!(prod=="Select a Product" ||isNaN(price)|| isNaN(qty))){
        if (price>0){
            if(qty>0){
                insertProduct_btn.disabled=false;
            }
            else{
                alert("Please enter a valid Quantity!");
                insertProduct_btn.disabled=true;
            }
        }
        else{
            alert("Please enter a valid price!");
            insertProduct_btn.disabled=true;
        }
        
    }
    else{
        insertProduct_btn.disabled=true;
    }
}