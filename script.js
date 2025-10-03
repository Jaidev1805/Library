// Book class
class Book {
  constructor(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
  }
  // Toggle read status
  toggleRead() {
    this.read = (this.read === "Read") ? "Not Read" : "Read";
  }
}
// Library class
class Library {
  constructor() {
    this.myLibrary = [];
  }

  addBook(title, author, pages, read = "Not Read") {
    let newBook = new Book(title, author, pages, read, crypto.randomUUID());
    this.myLibrary.push(newBook);
    return newBook;
  }

  deleteBook(id) {
    this.myLibrary = this.myLibrary.filter(book => book.id !== id);
  }

  findBook(id) {
    return this.myLibrary.find(book => book.id === id);
  }

  displayBooks() {
    const table = document.querySelector(".tables");
    table.innerHTML = `
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>No Of Pages</th>
        <th>Read Status</th>
        <th>Book Id</th>
        <th>Delete Book</th>
        <th>Change Read Status</th>
      </tr>
    `;

    this.myLibrary.forEach(book => {
      let row = document.createElement("tr");
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>${book.read}</td>
        <td>${book.id}</td>
        <td><button class="removeBtn" data-id="${book.id}">Remove</button></td>
        <td><button class="readBtn" data-id="${book.id}">Change</button></td>
      `;
      table.appendChild(row);
    });

    // Attach event listeners after rendering
    document.querySelectorAll(".removeBtn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        this.deleteBook(e.target.dataset.id);
        this.displayBooks();
      });
    });

    document.querySelectorAll(".readBtn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        let book = this.findBook(e.target.dataset.id);
        if (book) {
          book.toggleRead();
          this.displayBooks();
        }
      });
    });
  }
}

// DOM elements
const Modal = document.querySelector('.modal');
const OModal = document.querySelector('#openModal');
const Add = document.querySelector('#AddBook');
const Del = document.querySelector('#Cancel');

const Titlein = document.querySelector('#Titlein');
const Authorin = document.querySelector('#Authorin');
const Numberin = document.querySelector('#Numberin');

// Create a library instance
const myLibrary = new Library();

// Add some example books
myLibrary.addBook("The Hunger Games", "Suzanne Collins", "374", "Read");
myLibrary.addBook("Pride and Prejudice", "Jane Austen, Anna Quindlen", "279", "Read");
myLibrary.addBook("To Kill a Mockingbird", "Harper Lee", "323", "Read");

// Display initial books
myLibrary.displayBooks();

// Event: open modal
OModal.addEventListener("click", () => {
  Modal.showModal();
});

// Event: cancel modal
Del.addEventListener("click", () => {
  Modal.close();
});

// Event: add new book
Add.addEventListener("click", () => {
  if (!Titlein.value || !Authorin.value || !Numberin.value) {
    alert("Please fill in all fields.");
    return;
  }

  myLibrary.addBook(Titlein.value, Authorin.value, Numberin.value, "Not Read");
  myLibrary.displayBooks();

  Titlein.value = "";
  Authorin.value = "";
  Numberin.value = "";
  Modal.close();
});