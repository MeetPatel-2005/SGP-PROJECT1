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




