// DOM elements
const itemsValue = document.getElementById("dishValue");
const sumValue = document.getElementById("dishSum");
const products = document.querySelectorAll("div[data-food]");
const priceSelect = document.getElementById("price");
const categorySelect = document.getElementById("category");
const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal");

// event handlers
function handleSetPrice(event) {
  const parentEl = event.target.parentElement;
  const price = parentEl.querySelector("p").innerHTML;
  const sum = parentEl.querySelector("input").value;
  let globalSum = parseInt(price) * sum;

  if (+sum === 0) {
    alert("введите количество");
    return;
  }

  itemsValue.innerHTML = getInitialValue(itemsValue.innerHTML) + parseInt(sum);
  sumValue.innerHTML = getInitialValue(sumValue.innerHTML) + globalSum;
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("product-box__btn")) {
    handleSetPrice(e);
  }
});


document.addEventListener("change", function (element) {
  if (element.target.classList.contains("select-control")) {
    const categoryValue = categorySelect.value;
    const priceValue = priceSelect.value;
    const res = [...products];

    const showedProducts = res
      .filter(
        (item) =>
          item.getAttribute("data-food") === categoryValue ||
          categoryValue == "all"
      )
      .filter(
        (item2) =>
          parseInt(item2.querySelector("p").innerHTML) <=
            parseInt(priceValue) || priceValue == "0"
      );

    createMenu(showedProducts);
  }
});
document
  .querySelector(".top-cart-info-container")
  .addEventListener("click", addModal);

modal.addEventListener("submit", submitForm);

document.getElementById("overlay").addEventListener("click", removeForm);

// helpers
function checkCategory(baseCategory, comparedCategory) {
  return baseCategory === comparedCategory;
}

function getInitialValue(value) {
  return parseInt(value) || 0;
}

function createMenu(arr) {
  let sortedMenu = [];
  for (let punish of arr) {
    const title = punish.children[0].innerText;
    const imageWay = punish.children[1].children[0].currentSrc;
    const price = punish.lastElementChild.children[0].innerText;

    sortedMenu.push(getProduct(imageWay, price, title));
  }
  document.getElementById("menu").innerHTML = sortedMenu.join("");
}

function getProduct(image, price, title) {
  return ` 
<div data-food="breakfast" class="product-box__item">
    <h3 class="product-box__title">${title}</h3>
  <div class="product-box__img">
      <img class="img-fluid" src="${image}">
  </div>
  <div class="product-box__meta">
      <p>${price}</p>
      <div class="qty">
          <input class="qty__item" type="number"> Кол
      </div>
      <button class="product-box__btn">Добавить</button>

  </div>
</div>
  
  `;
}

function addModal(e) {
  if (e.target.classList.contains("btn-check")) {
    modal.classList.add("modal__form_active");
    overlay.classList.add("overlay_active");
    document.body.classList.add("body_off");
  }
}

function submitForm(e) {
  e.preventDefault();

  const valueArray = modal.querySelectorAll("input");
  for (let i = 0; i < valueArray.length; i++) {
    if (!valueArray[i].value.trim().length) {
      return alert("заполните все поля");
    }
  }
  
  clearOrder();
  closeForm();
  alert("Спасибо за покупку");
}

function clearOrder() {
  const defaultValue = "XXX";
  itemsValue.innerHTML = defaultValue;
  sumValue.innerHTML = defaultValue;
  let arrayInput = document.getElementsByTagName("input");
  console.log(arrayInput);
  for (let i = 0; i < arrayInput.length; i++) {
    console.log(arrayInput[i].value);
    if (arrayInput[i].value) {
      arrayInput[i].value = "";
    }
  }
}

function closeForm() {
  modal.classList.remove("modal__form_active");
  overlay.classList.remove("overlay_active");
  document.body.classList.remove("body_off");
}
function removeForm(element) {
  if (element.target === element.currentTarget) closeForm();
}
