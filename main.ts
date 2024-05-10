/** @format */

const appDiv = document.querySelector<HTMLDivElement>("#app");

if (appDiv) {
  appDiv.innerHTML = `
    <div id="info">
      <div id="name-wrapper">
        <div class="name">#01 HITOKAGE</div>
        <div class="name">#02 RIZADO</div>
        <div class="name">#03 RIZADONV</div> 
        <div class="name">#04 ZENIGAME</div>
        <div class="name">#05 KAMERU</div>
        <div class="name">#06 KAMEKKUSUEX</div> 
        <div class="name">#07 FUSHIGIDANE</div>
        <div class="name">#08 FUSHIGISOU</div>
        <div class="name">#09 FUSHIGIBANAEX</div> 
      </div>
    </div>
    <ul id="cards"></ul>
  `;
}

const CARDS: string[] = [
  "https://www.pokemon-card.com/assets/images/card_images/large/SV2a/043953_P_HITOKAGE.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SV4a/044997_P_RIZADO.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/S12a/042274_P_RIZADONV.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SV2a/043491_P_ZENIGAME.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SV2a/043492_P_KAMERU.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SV2a/043987_P_KAMEKKUSUEX.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SV2a/043951_P_FUSHIGIDANE.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SV2a/043952_P_FUSHIGISOU.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SV2a/043985_P_FUSHIGIBANAEX.jpg",
];

const INFO_CONTAINER = document.querySelector<HTMLDivElement>("#info");
const CARD_CONTAINER = document.querySelector<HTMLUListElement>("#cards");

const PADDING = 4;

// Add prepadding
for (let pre = 0; pre < PADDING; pre++) {
  const COVER_INDEX = CARDS.length - (PADDING - 1) + pre;
  const ITEM = document.createElement("li");
  ITEM.setAttribute("aria-hidden", "true");
  ITEM.innerHTML = `
    <div class="image-wrapper">
      <img src="${CARDS[COVER_INDEX - 1]}" alt="" />
    </div>
  `;
  CARD_CONTAINER?.appendChild(ITEM);
}

CARDS.map((card) => {
  const ITEM = document.createElement("li");
  ITEM.innerHTML = `
    <div class="image-wrapper">
      <img src="${card}" alt="" />
    </div>
  `;
  CARD_CONTAINER?.appendChild(ITEM);
});

// Add post padding
for (let post = 0; post < PADDING; post++) {
  const COVER_INDEX = post;
  const ITEM = document.createElement("li");
  ITEM.setAttribute("aria-hidden", "true");
  ITEM.innerHTML = `
    <div class="image-wrapper">
      <img src="${CARDS[COVER_INDEX]}" alt="" />
    </div>
  `;
  CARD_CONTAINER?.appendChild(ITEM);
}

const ITEMS = [...(CARD_CONTAINER?.children || [])] as HTMLElement[];


ITEMS.forEach((ITEM, index) => {
  if (index <= 2 || index >= ITEMS.length - 4) ITEM.setAttribute("aria-hidden", "true");
});

let scrollBounds = { max: 0, min: 0 };

const UPDATE = () => {
  if (CARD_CONTAINER!.scrollLeft < scrollBounds.min) {
    CARD_CONTAINER!.scrollLeft = scrollBounds.max;
  } else if (CARD_CONTAINER!.scrollLeft > scrollBounds.max) {
    CARD_CONTAINER!.scrollLeft = scrollBounds.min;
  }
};

const SET_SCROLL_BOUNDS = () => {
  ITEMS[ITEMS.length - 1].scrollIntoView();
  scrollBounds.max = CARD_CONTAINER!.scrollLeft + ITEMS[0].offsetWidth;
  ITEMS[0].scrollIntoView();
  scrollBounds.min = CARD_CONTAINER!.scrollLeft - ITEMS[0].offsetWidth;
};

SET_SCROLL_BOUNDS();

CARD_CONTAINER?.addEventListener("scroll", UPDATE);
