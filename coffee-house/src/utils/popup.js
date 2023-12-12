const body = document.querySelector(".body");
const cards = document.querySelectorAll(".card-block");
const closePopupBtn = document.querySelector(".close-popup-btn");
const modalPopup = document.querySelector(".modal-popup");
const modalWindow = document.querySelector(".modal-window");
const imgPopup = document.querySelector(".img-popup-block");
const modalName = document.querySelector(".name");
const modalDescription = document.querySelector(".description");
const price = document.querySelector(".total-cost");
const sizeText = document.querySelectorAll(".size-text");
const nameText = document.querySelectorAll(".name-text");
const sizeButtons = Array.from(document.querySelector(".size-block").children);
const additivesButtons = Array.from(
  document.querySelector(".additives-block").children
);
let sizePrice = [];
let additivesPrice = [];
let firstPrice = 0;
let totalPrice = firstPrice;
let sizeCost;
let additivesCost = 0;

async function getCardInfo(cardIndex) {
  const res = await fetch("./utils/products.json");
  const data = await res.json();
  const card = data[cardIndex];

  updatePopupContent(card);
  updateSizeInformation(card.sizes);
  updateAdditivesInformation(card.additives);
  updatePriceInformation(card.price);
}

function updatePopupContent(card) {
  imgPopup.innerHTML = `<img class="img-popup" src=${card.img} width=310 height=310>`;
  modalName.textContent = card.name;
  modalDescription.textContent = card.description;
}

function updateSizeInformation(sizes) {
  sizePrice = [sizes.s["add-price"], sizes.m["add-price"], sizes.l["add-price"]];
  sizeText[0].textContent = sizes.s.size;
  sizeText[1].textContent = sizes.m.size;
  sizeText[2].textContent = sizes.l.size;
}

function updateAdditivesInformation(additives) {
  additivesPrice = [
    additives[0]["add-price"],
    additives[1]["add-price"],
    additives[2]["add-price"],
  ];
  nameText[0].textContent = additives[0].name;
  nameText[1].textContent = additives[1].name;
  nameText[2].textContent = additives[2].name;
}

function updatePriceInformation(cardPrice) {
  price.textContent = `$${cardPrice}`;
  firstPrice = +cardPrice;
  totalPrice = firstPrice;
}


// async function getCardInfo(cardIndex) {
//   const res = await fetch("./utils/products.json");
//   const data = await res.json();
//   const card = data[cardIndex];
//   imgPopup.innerHTML = `<img class="img-popup" src=${card.img} width=310 height=310>`;
//   modalName.textContent = card.name;
//   modalDescription.textContent = card.description;
//   sizePrice = [
//     card.sizes.s["add-price"],
//     card.sizes.m["add-price"],
//     card.sizes.l["add-price"],
//   ];
//   additivesPrice = [
//     card.additives[0]["add-price"],
//     card.additives[1]["add-price"],
//     card.additives[2]["add-price"],
//   ];
//   sizeText[0].textContent = card.sizes.s.size;
//   sizeText[1].textContent = card.sizes.m.size;
//   sizeText[2].textContent = card.sizes.l.size;
//   nameText[0].textContent = card.additives[0].name;
//   nameText[1].textContent = card.additives[1].name;
//   nameText[2].textContent = card.additives[2].name;
//   price.textContent = `$${card.price}`;
//   firstPrice = +card.price;
//   totalPrice = firstPrice;
// }



sizeButtons.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    sizeButtons.forEach((otherBtn) => {
      if (otherBtn !== btn) {
        otherBtn.classList.remove("active-btn");
      }
    });
    btn.classList.add("active-btn");
    sizeCost = +sizePrice[i];
    price.textContent = `$${(firstPrice + sizeCost + additivesCost).toFixed(
      2
    )}`;
    totalPrice = firstPrice + sizeCost;
  });
});

additivesButtons.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active-btn");
    if (additivesButtons[i].classList.contains("active-btn"))
      additivesCost += +additivesPrice[i];
    if (!additivesButtons[i].classList.contains("active-btn"))
      additivesCost -= +additivesPrice[i];
    price.textContent = `$${(totalPrice + additivesCost).toFixed(2)}`;
  });
});

function removeClasslist(buttons) {
  buttons.forEach((btn) => {
    btn.classList.remove("active-btn");
  });
}

getCardInfo(6);

function closeModal(event) {
  event.addEventListener("click", () => {
    modalWindow.style.display = "none";
    removeClasslist(additivesButtons);
    removeClasslist(sizeButtons);
    sizeButtons[0].classList.add("active-btn");
    body.classList.remove("active");
  });
}

export function showModal(event) {
  let btn = event.target;
  modalWindow.style.display = "block";
  body.classList.add("active");
  getCardInfo(btn.dataset.mydata);
}

closeModal(closePopupBtn);
closeModal(modalWindow);
modalPopup.addEventListener("click", (e) => {
  e.stopPropagation();
});
