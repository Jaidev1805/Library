const myLibrary = [];
// constructor//
function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}
//adding book to array//
function AddBook(title, author, pages, read, id){
    let NBook = new Book(title, author, pages, read, id);
    myLibrary.push(NBook);
    return NBook;
}
//examples//
AddBook(
    "The Hunger Games",
    "Suzanne Collins",
    "374",
    "Read",
    crypto.randomUUID()
);
AddBook(
    "Pride and Prejudice",
    "Jane Austen, Anna Quindlen",
    "279",
    "Read",
    crypto.randomUUID()
);
AddBook(
    "To Kill a Mockingbird",
    "Harper Lee",
    "323",
    "Read",
    crypto.randomUUID()
);
// declaring DOM//
const Modal = document.querySelector('.modal');
const OModal = document.querySelector('#openModal');
const Add = document.querySelector('#AddBook');
const Del = document.querySelector('#Cancel');

const Titlein = document.querySelector('#Titlein');
const Authorin = document.querySelector('#Authorin');
const Numberin = document.querySelector('#Numberin');

OModal.addEventListener("click", () => {
    Modal.showModal();
})

Del.addEventListener("click", () => {
    Modal.close();
})

Add.addEventListener("click", () => {
    if (!Titlein.value || !Authorin.value || !Numberin.value) {
    alert("Please fill in all fields.");
    return;
    }
    AddBook(
        Titlein.value,
        Authorin.value,
        Numberin.value,
        "Not Read",
        crypto.randomUUID()
    );
    DisplayBook();

    Titlein.value = "";
    Authorin.value = "";
    Numberin.value = "";

    Modal.close();
});

// prototype to change read status //
Book.prototype.toggleRead = function() {
  this.read = (this.read === "Read") ? "Not Read" : "Read";
};

//display books as table//
function DisplayBook() {
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
  myLibrary.forEach(book => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>${book.read}</td>
      <td>${book.id}</td>
      <td><button class="removeBtn" data-id="${book.id}">Remove Book</button></td>
      <td><button class="readBtn" data-id="${book.id}">Change</button></td>
    `;
    table.appendChild(row);
  });

  // Event listeners for remove buttons
  document.querySelectorAll(".removeBtn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      let bookId = e.target.dataset.id;
      DeleteBook(bookId);
      DisplayBook(); 
    });
  });

  // Event listeners for read toggle buttons
  document.querySelectorAll(".readBtn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      let bookId = e.target.dataset.id;
      let book = myLibrary.find(b => b.id == bookId);
      if (book) {
        book.toggleRead();
        DisplayBook(); 
      }
    });
  });
}

// DeleteBook function outside loop
function DeleteBook(id) {
  const index = myLibrary.findIndex(book => book.id == id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
  }
}

DisplayBook();