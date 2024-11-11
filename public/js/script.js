// DOM Elements
console.log("hi")
const swiper = document.querySelector('#swiper');
const like = document.querySelector('#like');
const dislike = document.querySelector('#dislike');

// URLs of images
const urls = [
  "https://github.com/MeetPatel-2005/SGP-PROJECT1/blob/main/public/images/1.png?raw=true",
  "https://github.com/MeetPatel-2005/SGP-PROJECT1/blob/main/public/images/2.png?raw=true",
  "https://github.com/MeetPatel-2005/SGP-PROJECT1/blob/main/public/images/3.png?raw=true",
  "https://github.com/MeetPatel-2005/SGP-PROJECT1/blob/main/public/images/4.png?raw=true",
  "https://github.com/MeetPatel-2005/SGP-PROJECT1/blob/main/public/images/5.png?raw=true",
  "https://github.com/MeetPatel-2005/SGP-PROJECT1/blob/main/public/images/6.png?raw=true",
  "https://github.com/MeetPatel-2005/SGP-PROJECT1/blob/main/public/images/7.png?raw=true",
  "https://github.com/MeetPatel-2005/SGP-PROJECT1/blob/main/public/images/8.png?raw=true",
  "https://github.com/MeetPatel-2005/SGP-PROJECT1/blob/main/public/images/9.png?raw=true",
  "https://github.com/MeetPatel-2005/SGP-PROJECT1/blob/main/public/images/10.png?raw=true"
];

// Item prices for each shoe
const itemPrices = [9695, 10795, 11495, 7495, 6999, 3249, 11999, 12999, 11999, 5999];

// Item names for each shoe
const itemNames = [
  "Nike Ishod", "Nike TR 1", "Freak 5 EP", "Nike SB", "Suede Sneakers", 
  "Puma Amaze", "Puma X Kidsuper", "Gazelle 85", "Supernova Stride", "Breaknet 2.0"
];

// Variables
let cardCount = 0;
let cartTotal = 0; // Track the total price of items in the cart

// Update the cart display
const cartContainer = document.querySelector('.cart');
const cartInfoContainer = document.querySelector('.cartinfo');
const totalDisplay = document.querySelector('.buy span'); // Total price display element

let cartItems = {};

function updateCartDisplay() {
  cartInfoContainer.innerHTML = ''; // Clear current items

  // Reset the cart total to 0
  cartTotal = 0;

  Object.entries(cartItems).forEach(([name, { price, quantity }]) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');
    itemDiv.innerHTML = `
      <p>${name}</p>
      <p>Rs.${price}</p>
      <p>${quantity}</p>
      <button class="increment">+</button>
      <button class="decrement">-</button>
      <button class="delete">Delete</button>
    `;

    // Update the total price based on current quantity
    cartTotal += price;

    // Set up the event listeners
    itemDiv.querySelector('.increment').onclick = () => {
      cartItems[name].quantity++;
      cartItems[name].price = itemPrices[itemNames.indexOf(name)] * cartItems[name].quantity; // Update price based on quantity
      updateCartDisplay();
    };

    itemDiv.querySelector('.decrement').onclick = () => {
      if (cartItems[name].quantity > 1) {
        cartItems[name].quantity--;
      } else {
        delete cartItems[name];
      }
      cartItems[name].price = itemPrices[itemNames.indexOf(name)] * cartItems[name].quantity; // Update price based on quantity
      updateCartDisplay();
    };

    itemDiv.querySelector('.delete').onclick = () => {
      delete cartItems[name];
      updateCartDisplay();
    };

    cartInfoContainer.appendChild(itemDiv);
  });

  // Update the total price in the cart
  totalDisplay.innerText = `Rs.${cartTotal}`;
}

// Function to add item to the cart
function addItemToCart(name, price) {
  if (cartItems[name]) {
    cartItems[name].quantity++;
  } else {
    cartItems[name] = { price, quantity: 1 };
  }

  // Update price based on quantity
  cartItems[name].price = itemPrices[itemNames.indexOf(name)] * cartItems[name].quantity;
  
  console.log(`Added ${name} to cart with price: Rs.${cartItems[name].price}`);
  updateCartDisplay();
}

// Function to append a new card
function appendNewCard() {
  const imageUrl = urls[cardCount % 10]; // Get the current image URL
  const imageName = itemNames[cardCount % 10]; // Use the name from the itemNames array
  const itemPrice = itemPrices[cardCount % 10]; // Get price from itemPrices array

  const card = new Card({
    imageUrl: imageUrl,
    onDismiss: appendNewCard,
    onLike: () => {
      console.log(`Liked: ${imageName} with price Rs.${itemPrice}`); // Debugging log
      like.style.animationPlayState = 'running';
      like.classList.toggle('trigger');

      // Add item to cart with its name and price
      addItemToCart(imageName, itemPrice); 
    },
    onDislike: () => {
      dislike.style.animationPlayState = 'running';
      dislike.classList.toggle('trigger');
    }
  });

  swiper.append(card.element);
  cardCount++;
}

// Initial cards
for (let i = 0; i < 5; i++) {
  appendNewCard();
}
