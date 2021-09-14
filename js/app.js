
// for Modal clear  
const clearTitle = document.getElementById("addModal");
const clearImg = document.getElementById("modal-img");

// for modal hidden  button 
const hiddenCart = document.getElementById("hidden-cart");
hiddenCart.classList.remove("d-none");

// for searchfiled by catagory 
const searchFieldData = document.getElementById("search-btn").addEventListener("click", () => {
		const get = document.getElementById("input-field");
		const getData = get.value;
		get.value = "";
		loadProducts(getData, true);
	});


// for fetch url and load data  
const loadProducts = (data, check) => {

	// for condition to is it true or false

	if (check === true) {
		const url = `https://fakestoreapi.com/products/category/${data}`;
		fetch(url)
			.then((res) => res.json())
			.then((json) => showProducts(json));
	} else {
		
		const url = `https://fakestoreapi.com/products`;
		fetch(url)
			.then((response) => response.json())
			.then((data) => showProducts(data));
	}
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  console.log(allProducts);
	const allProductDiv = document.getElementById("all-products");
  //pervios data clean when new data come from searching
	allProductDiv.innerHTML = ""; 
  	// product counting, how many product is found from onload and search load 	
	let count = 0;                 		
    //for doing loop in all products
  for (const product of allProducts) {
    count++;
    const image = product.image;
    const rating = product.rating;
		const starRating = doStarRating(rating.rate);  // function call for creating dynamic rating star
    const div = document.createElement("div");
    div.classList.add("product");
    // div.innerHTML = `<div class="single-product">
    //   <div>
    // <img class="product-image" src=${image}></img>
    //   </div>
    //   <h3>${product.title}</h3>
    //   <p>Category: ${product.category}</p>
    //   <h2>Price: $ ${product.price}</h2>
    //   <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
    //   <button id="details-btn" class="btn btn-danger">Details</button></div>
    //   `;
    // document.getElementById("all-products").appendChild(div);

	//for innerHTML
    div.innerHTML = `
		<div class="single-product shadow-lg rounded-3 mx-2 mb-4">
			<div>
				<img class="product-image" src=${image}></img>
			</div>
      		<h3 class=" mx-5">${product.title}</h3>
      		<p> <span class="fw-bold" >Category:</span> ${product.category}</p>
        <div class="d-flex justify-content-between align-items-center px-5 mx-5">
				<p>
					<span class="fw-bold">Rating:</span> ${rating.rate}
				</p>
				<p> <span class="fw-bold"> Reviews: </span>${rating.count}</p>
		
			</div>

			<p> ${starRating}</p>

      		<h2 >Price: $ ${product.price} </h2>
	  
      
      		<button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-dark">add to cart</button>
     		<button id="details-btn" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadSingleProductsDetails('${product.id}')">Details</button>

      	</div>
      `;
		allProductDiv.appendChild(div);
  }

	//for showing an error message
	if (count === 0) {
		allProductDiv.innerHTML = `
		<h2 class=" text-center bg-danger p-3"style="margin-right:10px">No Items Found</h2>
		<h2 class=" text-center bg-danger p-3 " style="margin-right:10px"> Please Try Again</h2>
		<h2 class=" text-center bg-danger p-3 "style="margin-right:10px">Enter Another keyword</h2>
		`;
		
	}
	
};

// for dynamic star rating function
const doStarRating = (rate) => {
	// console.log("rate", rate);
	let rating = '';
	let i = 0;
	while (i < Math.round(rate)) {
		rating += `<i class="bi bi-star-fill text-warning"></i>`;
		i++;
	}
	return rating;

};
// const doStarRating =(rate,stars)=>{
//     let rating = Math.round(stars);
//     let i = parseInt(rate);
//     if(rating=== 1){
//       document.getElementById(i).innerHTML='<i class="fas fa-star text-danger"></i><i class="fas fa-star text-secondary"></i><i class="fas fa-star text-secondary"></i><i class="fas fa-star text-secondary"></i><i class="fas fa-star text-secondary"></i>';
//     }
//     else if(rating=== 2){
//     document.getElementById(i).innerHTML='<i class="fas fa-star text-danger"></i><i class="fas fa-star text-warning"></i><i class="fas fa-star text-secondary"></i><i class="fas fa-star text-secondary"></i><i class="fas fa-star text-secondary"></i>';
//     }
//     else if(rating=== 3){
//     document.getElementById(i).innerHTML='<i class="fas fa-star text-danger"></i><i class="fas fa-star text-warning"></i><i class="fas fa-star text-danger"></i><i class="fas fa-star text-secondary"></i><i class="fas fa-star text-secondary"></i>';
//     }
//     else if(rating=== 4){
//     document.getElementById(i).innerHTML='<i class="fas fa-star text-danger"></i><i class="fas fa-star text-warning"></i><i class="fas fa-star text-danger"></i><i class="fas fa-star text-danger"></i><i class="fas fa-star text-secondary"></i>';
//     }
//     else if(rating=== 5){
//     document.getElementById(i).innerHTML='<i class="fas fa-star text-danger"></i><i class="fas fa-star text-warning"></i><i class="fas fa-star text-danger"></i><i class="fas fa-star text-danger"></i><i class="fas fa-star text-danger"></i>';
//     }
// }

// single product details function  button 
const loadSingleProductsDetails = (id) => {
	const url = `https://fakestoreapi.com/products/${id}`;
	fetch(url)
		.then((res) => res.json())
		.then((data) => displayModal(data));
};


//single product details view in modal section 
const displayModal = (data) => {

	// console.log("data id ", data);
	hiddenCart.classList.remove("d-none");

	const title = document.getElementById("addModal");
	title.innerText = data.title;
	const imgAdd = document.getElementById("modal-img");
	// const addCart = document.getElementById("addCartFromModal").addEventListener("click", () => {
	// addToCart(data.id, data.price);
	// 	clearTitle.innerText = "";
	// 	clearImg.innerText = "";
	// 	});

	//for innerhtml part
	imgAdd.innerHTML = `
  	<div class="row">
   		<div class="col"><img  style="height:200px;" src="${data.image}" alt="" class="img-fluid"></div>
   		<div class="col"><h5>Description</h5> <p> ${data.description}</p></div>
  	</div>
  
  	<h5>Catagory: ${data.category}</h5>
  	<h5>Rating: ${data.rating.rate}</h5>
  	<h3 class="text-danger">Price: $ ${data.price}</h3>
`;
	document.getElementById("addCartFromModal").addEventListener("click",() => {
		addToCart(data.id, data.price);
	  },
	    { once: true }
   );
};


// for clear data
const clearData = () => {
	clearTitle.innerText = "";
	clearImg.innerText = "";
};


//  for buyNow button
const buyNow = document.getElementById('buy-now').addEventListener('click', () => {

	const title = document.getElementById("addModal");
	const totalProduct = document.getElementById("total-Products");
	const totalProductText = totalProduct.innerText;

	hiddenCart.classList.add("d-none");
	

	const totalPrice = document.getElementById("total");
	const totalPriceText = totalPrice.innerText;
	
	title.innerHTML = `<h1>My Cart</h1>`;
	const price = getInputValue("price");
	const deliverCharge = getInputValue("delivery-charge");
	const totalTax = getInputValue("total-tax");
	const cartPriceDetails = document.getElementById("modal-img");
	cartPriceDetails.innerHTML = `
	<table class="table">
							
			<tbody>
				<tr>
					<th>Total Added-Products:</th>
					<td>${totalProductText}</td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<th>Price:</th>
					<td>$ ${price}</td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<th>Delivery-Charge:</th>
					<td>$ ${deliverCharge}</td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<th>Total-Tax:</th>
					<td>$ ${totalTax}</td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<th scope="row">Total</th>
					<td colspan="2">$ ${totalPriceText} </td>
				</tr>
			</tbody>
	</table>
   
`;
	});
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseInt(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  console.log("old price", convertedOldPrice);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  // document.getElementById(id).innerText = Math.round(total);
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  // document.getElementById(id).innerText = Math.round(value);
  document.getElementById(id).innerText = value;
	console.log("value", value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    // setInnerText("total-tax", priceConverted * 0.2);
    setInnerText("total-tax", (priceConverted * 0.2).toFixed(2));
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    // setInnerText("total-tax", priceConverted * 0.3);
    setInnerText("total-tax", (priceConverted * 0.4).toFixed(2));
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    // setInnerText("total-tax", priceConverted * 0.4);
    setInnerText("total-tax", (priceConverted * 0.4).toFixed(2));
  }
};

//grandTotal update function
const updateTotal = () => {
  console.log("price in ", getInputValue("price"));
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  // document.getElementById("total").innerText = grandTotal;
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
// loadProducts();
