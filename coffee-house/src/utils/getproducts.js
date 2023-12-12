import { showModal } from "./popup.js";
const menuButtons = Array.from(document.querySelector(".tabs").children);
const menuBlock = document.querySelector(".menu-block");
const loadingButton = document.querySelector(".loading-btn");
const titleMenu=document.querySelector(".title-menu");
let cardsFlag = false;
menuButtons.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    menuButtons.forEach((otherBtn, index) => {
      if (index !== i) {
        otherBtn.classList.remove("active-btn");
      }
    });
    btn.classList.add("active-btn");
    if (i === 0) {
      createCardBlock(8, 0);
      hideLoadingBtn();
    } else if (i === 1) {
      createCardBlock(12, 8);
      loadingButton.classList.add("hidden");
    } else {
      createCardBlock(20, 12);
      hideLoadingBtn();
    }
  });
});

function hideLoadingBtn() {
  window.innerWidth > 868
    ? loadingButton.classList.add("hidden")
    : loadingButton.classList.remove("hidden");
}

function checkContainsClass() {
  const cardBlocks = document.querySelectorAll(".card-block");
  const hasHiddenClass = Array.from(cardBlocks).some((card) =>
    card.classList.contains("hidden")
  );
  cardsFlag=hasHiddenClass?true:false;
}

function addClassHidden() {
  const cardBlocks = document.querySelectorAll(".card-block");
  cardBlocks.forEach((btn, n) => {
    if (n >= cardBlocks.length - 4) cardBlocks[n].classList.add("hidden");
  });
}

async function createCardBlock(n, j) {
  const res = await fetch("./utils/menu.json");
  const data = await res.json();
  menuBlock.innerHTML = "";
  for (let i = j; i < n; i++) {
    const cardBlock = document.createElement("div");
    cardBlock.className = "card-block";

    cardBlock.setAttribute("data-mydata", `${i}`);

    const cardImg = document.createElement("div");
    cardImg.className = "card-img-container";
    cardImg.innerHTML = `<img class="card-img" src="${data[i].img}" data-mydata="${i}" width="310" height="310">`;
    cardImg.setAttribute("data-mydata", `${i}`);
    const cardBlockText = document.createElement("div");
    cardBlockText.className = "card-block-text";
    cardBlockText.setAttribute("data-mydata", `${i}`);
    const cardName = document.createElement("h5");
    cardName.className = "card-name";
    cardName.setAttribute("data-mydata", `${i}`);
    cardName.textContent = data[i].name;

    const cardDescription = document.createElement("p");
    cardDescription.className = "card-description";
    cardDescription.setAttribute("data-mydata", `${i}`);
    cardDescription.textContent = data[i].description;

    const price = document.createElement("h5");
    price.className = "card-cost";
    price.setAttribute("data-mydata", `${i}`);
    price.textContent = `$${data[i].price}`;

    cardBlock.append(cardImg);
    cardBlockText.append(cardName);
    cardBlockText.append(cardDescription);
    cardBlockText.append(price);
    cardBlock.append(cardBlockText);

    menuBlock.append(cardBlock);

    document.querySelectorAll(".card-block").forEach((btn, n) => {
      btn.addEventListener("click", showModal);
    });
  }
  if ((window.innerWidth <= 868) && (n - j > 4)) addClassHidden();
}

createCardBlock(8, 0);

function getLoadProducts() {
  loadingButton.addEventListener("click", () => {
    document.querySelectorAll(".card-block").forEach(btn => {
      btn.classList.remove("hidden");
      loadingButton.classList.add("hidden");
    });
    checkContainsClass();
  });
}

getLoadProducts();

// change width----------------------------------------------------------------------------------------------

if(window.innerWidth<=868) {
  (!menuButtons[1].classList.contains("active-btn"))?loadingButton.classList.remove("hidden"):loadingButton.classList.add("hidden");
}

window.addEventListener("resize", () => changeCountCards(window.innerWidth));

function changeCountCards(width) {
  const cardBlocks = document.querySelectorAll(".card-block");
  // const hasHiddenClass = Array.from(cardBlocks).some((card) =>
  //   card.classList.contains("hidden")
  // );
  cardBlocks.forEach((btn, i) => {
    if (width <= 868) {
      if (cardBlocks.length > 4 && i >= cardBlocks.length - 4)
        btn.classList.add("hidden");
      // if (i < cardBlocks.length - 4) btn.classList.remove("hidden");
      (!menuButtons[1].classList.contains("active-btn"))?loadingButton.classList.remove("hidden"):loadingButton.classList.add("hidden")
      checkContainsClass();
    } else if (width > 868) {
      btn.classList.remove("hidden");
      loadingButton.classList.add("hidden");
      checkContainsClass();
    }
  });
}
