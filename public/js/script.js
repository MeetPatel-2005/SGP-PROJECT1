// DOM

console.log("hi")
const swiper = document.querySelector('#swiper');
const like = document.querySelector('#like');
const dislike = document.querySelector('#dislike');

// constants
// const urls = [
//   'https://source.unsplash.com/random/1000x1000/?sky',
//   'https://source.unsplash.com/random/1000x1000/?landscape',
//   'https://source.unsplash.com/random/1000x1000/?ocean',
//   'https://source.unsplash.com/random/1000x1000/?moutain',
//   'https://source.unsplash.com/random/1000x1000/?forest'
// ];


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


// variables
let cardCount = 0;
console.log(urls[cardCount % urls.length]);
// functions
function appendNewCard() {
  const card = new Card({
    imageUrl: urls[cardCount % 10],
    onDismiss: appendNewCard,
    onLike: () => {
      like.style.animationPlayState = 'running';
      like.classList.toggle('trigger');
    },
    onDislike: () => {
      dislike.style.animationPlayState = 'running';
      dislike.classList.toggle('trigger');
    }
    
  });
  
  swiper.append(card.element);
  cardCount++;

  const cards = swiper.querySelectorAll('.card:not(.dismissing)');
  cards.forEach((card, index) => {
    card.style.setProperty('--i', index);
  });
}

// first 5 cards
for (let i = 0; i < 5; i++) {
  appendNewCard();
}




//heiroufdeairhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
// DOM elements

const cartContainer = document.querySelector('.cart');
const cartInfoContainer = document.querySelector('.cartinfo');

let cartItems = {};

// Update cart display function
function updateCartDisplay() {
  cartInfoContainer.innerHTML = ''; // Clear current items

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

    // Attach event listeners for increment, decrement, delete
    itemDiv.querySelector('.increment').onclick = () => {
      cartItems[name].quantity++;
      updateCartDisplay();
    };
    itemDiv.querySelector('.decrement').onclick = () => {
      if (cartItems[name].quantity > 1) {
        cartItems[name].quantity--;
      } else {
        delete cartItems[name];
      }
      updateCartDisplay();
    };
    itemDiv.querySelector('.delete').onclick = () => {
      delete cartItems[name];
      updateCartDisplay();
    };

    cartInfoContainer.appendChild(itemDiv);
  });
}

// Function to add item to cart on "like" action
function addItemToCart(name, price) {
  if (cartItems[name]) {
    cartItems[name].quantity++;
  } else {
    cartItems[name] = { price, quantity: 1 };
  }
  updateCartDisplay();
}

// Modify the appendNewCard function to pass the image name
function appendNewCard() {
  const imageUrl = urls[cardCount % 10]; // Get the current image URL
  const imageName = `Item ${cardCount % 10 + 1}`; // You can extract a custom name from the URL if preferred
  
  const card = new Card({
    imageUrl: imageUrl,
    onDismiss: appendNewCard,
    onLike: () => {
      like.style.animationPlayState = 'running';
      like.classList.toggle('trigger');

      // Pass the image name as the item name
      const itemPrice = 4543; // Set a fixed or dynamic price
      addItemToCart(imageName, itemPrice); // Add item to cart with extracted name
    },
    onDislike: () => {
      dislike.style.animationPlayState = 'running';
      dislike.classList.toggle('trigger');
    }
  });

  swiper.append(card.element);
  cardCount++;
}


