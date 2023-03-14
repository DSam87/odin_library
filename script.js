const createBookFormBtn = document.querySelector("#create-book-form");
const addBookBtn = document.querySelector(".add-book-btn");
const createBookPopupElement = document.querySelector(".back-overlay");
const backOverlay = document.querySelector(".back-overlay");
const midApp = document.querySelector(".mid-app");
const githubBtn = document.querySelector(".github-btn");

githubBtn.addEventListener("click", () => {
  window.open("https://github.com/DSam87/odin_library");
});

let myLibrary = [
  {
    bookTitle: "Hobbit",
    bookAuthor: "J. R. R. Tolkien",
    bookPageNumber: 304,
    bookUrl:
      "https://g.christianbook.com/g/slideshow/6/60309/main/60309_1_ftc.jpg",
  },
];

function Book(name, year, page, hasRead) {
  this.name = name;
  this.year = year;
  this.page = page;
}

function addBookToLibrary(bookObject) {
  myLibrary.push(bookObject);
  return true;
}

function createBookObject(bookTitle, bookAuthor, bookPageNumber, bookUrl) {
  return { bookTitle, bookAuthor, bookPageNumber, bookUrl };
}

function toggleHide(e) {
  const eventClassName = e.target.classList[0];

  if (
    eventClassName === "back-overlay" ||
    eventClassName === "add-book-btn" ||
    eventClassName === "red-btn"
  ) {
    createBookPopupElement.classList.toggle("hide");
  }
}

function cardToggleHide(e) {
  if (e.target.nodeName === "BUTTON" || e.target.nodeName === "P") {
    e.target.parentElement.classList.remove("hide");
  }

  if (
    (e.target.nodeName === "BUTTON" ||
      (e.target.nodeName === "P" && e.target.classList[0] === "card-btns")) &&
    e.type === "mouseout"
  ) {
    e.target.parentElement.classList.add("hide");
  }

  if (e.target.classList[0] === "card" && e.type === "mouseover") {
    e.target.firstElementChild.classList.remove("hide");
  }

  if (e.target.classList[0] === "card" && e.type === "mouseout") {
    e.target.firstElementChild.classList.remove("hide");
  }

  if (e.target.classList[0] === "card-btns" && e.type === "mouseover") {
    e.target.classList.remove("hide");
  }

  if (e.target.classList[0] === "card-btns" && e.type === "mouseout") {
    e.target.classList.add("hide");
  }
}

createBookFormBtn.addEventListener("submit", (e) => {
  e.preventDefault();

  const bookTitle = e.target.title.value;
  const bookAuthor = e.target.author.value;
  const bookPageNumber = e.target["page-number"].value;
  const bookUrl = e.target["book-cover"].value;

  const bookObject = createBookObject(
    bookTitle,
    bookAuthor,
    bookPageNumber,
    bookUrl
  );

  addBookToLibrary(bookObject);
  updateLibList();
});

function bookInfo(index) {
  let bookObject = myLibrary[index];
  let bookTitle = bookObject.bookTitle;
  console.log(bookTitle);
  window.open(`https://www.amazon.com/s?k=${bookTitle}+book`);
}

function removeBookFromList(index) {
  myLibrary.splice(index, 1);
  updateLibList();
}

function saveBookObjects() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function getBookObject() {
  let jsonLib = localStorage.getItem("myLibrary");
  myLibrary = JSON.parse(jsonLib);
  console.log(myLibrary);
}

function createCardElement(cardObject, currentIndex) {
  const cardContainer = document.createElement("div");
  cardContainer.className = "card";
  cardContainer.setAttribute(
    "style",
    `background-image: url(${cardObject.bookUrl})`
  );
  cardContainer.setAttribute("book-index", currentIndex);

  const cardBtnContainer = document.createElement("div");
  cardBtnContainer.className = "card-btns hide";

  const infoBtn = document.createElement("button");
  infoBtn.textContent = "Info";

  const divider = document.createElement("p");
  divider.textContent = "|";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  cardBtnContainer.appendChild(infoBtn);
  cardBtnContainer.appendChild(divider);
  cardBtnContainer.appendChild(deleteBtn);

  cardContainer.addEventListener("mouseover", cardToggleHide);
  cardContainer.addEventListener("mouseout", cardToggleHide);
  infoBtn.addEventListener("click", (e) => {
    let bookIndex =
      e.target.parentElement.parentElement.getAttribute("book-index");
    bookInfo(bookIndex);
  });
  deleteBtn.addEventListener("click", (e) => {
    let bookIndex =
      e.target.parentElement.parentElement.getAttribute("book-index");
    removeBookFromList(bookIndex);
  });
  cardContainer.appendChild(cardBtnContainer);

  return cardContainer;
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function updateLibList() {
  removeAllChildNodes(midApp);

  myLibrary.forEach((cardObject, index) => {
    midApp.appendChild(createCardElement(cardObject, index));
  });

  saveBookObjects();
}

addBookBtn.addEventListener("click", toggleHide);
backOverlay.addEventListener("click", toggleHide);

getBookObject();
updateLibList();
