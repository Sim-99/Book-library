//Function for available books 
const library = [
    {
        title: "Buzani kubawo",
        author: "Author 1",
        isbn: "215787456",
        year: 2020,
        genre: "Xhosa drama",
        quantity: 15
    },
    {
        title: "Mind the gap",
        author: "K.J Dyani",
        isbn: "254897546",
        year: 2014,
        genre: "Fiction",
        quantity: 10
    },
    {
        title: "Death be not proud",
        author: "John Donne",
        isbn: "587945621",
        year: 1999,
        genre: "English short stories",
        quantity: 20
    },
    {
        title: "Spring",
        author: "Maria Makheba",
        isbn: "457945621",
        year: 1994,
        genre: "English peoms",
        quantity: 5
    },
    {
        title: "Mind action",
        author: "Sim ",
        isbn: "457945621",
        year: 2023,
        genre: "Mathematic",
        quantity: 15
    },
];

const borrowedBooks = [];

function displayAvailableBooks() {
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = "";

    library.forEach((book, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td>${book.year}</td>
            <td>${book.genre}</td>
            <td>${book.quantity}</td>
            <td>
                <button onclick="borrowBook(${index})">Borrow</button>
            </td>
        `;
        bookList.appendChild(row);
    });
}

function displayBorrowedBooks() {
    const borrowedBookList = document.getElementById("borrowed-book-list");
    borrowedBookList.innerHTML = "";

    borrowedBooks.forEach((book) => {
        const dueDate = new Date(book.dueDate);
        const currentDate = new Date();
        const daysLate = Math.max(0, (currentDate - dueDate) / (1000 * 3600 * 24));
        const fine = daysLate > 0 ? daysLate * 20 : 0;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.dueDate.toLocaleDateString()}</td>
            <td>R${fine.toFixed(2)}</td>
            <td>
                <button onclick="returnBook('${book.title}')">Return</button>
            </td>
        `;
        borrowedBookList.appendChild(row);
    });
}

function borrowBook(index) {
    if (library[index].quantity > 0) {
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 5); // 5 days from today
        borrowedBooks.push({
            title: library[index].title,
            dueDate: dueDate
        });
        library[index].quantity--;
        displayAvailableBooks();
        displayBorrowedBooks();
        alert("Book Borrowed Successfully");
    } else {
        alert("Sorry, this book is currently unavailable.");
    }
}
// Function to return borrowed  book 
function returnBook(title) {
    const bookIndex = borrowedBooks.findIndex((book) => book.title === title);
    if (bookIndex !== -1) {
        const returnedBook = borrowedBooks.splice(bookIndex, 1)[0];
        const currentDate = new Date();
        const daysLate = Math.max(0, (currentDate - returnedBook.dueDate) / (1000 * 3600 * 24));
        const fine = daysLate > 0 ? daysLate * 20 : 0;
        alert(`Book Returned Successfully. ${fine > 0 ? `Late Fee Applied: R${fine.toFixed(2)}` : ""}`);
        displayBorrowedBooks();
    }
}

// Initial display
displayAvailableBooks();
displayBorrowedBooks();
//ADD EDIT AND DELETE 


function displayAvailableBooks() {
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = "";

    library.forEach((book, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td>${book.year}</td>
            <td>${book.genre}</td>
            <td>${book.quantity}</td>
            <td>
                <button onclick="borrowBook(${index})">Borrow</button>
                <button onclick="editBook(${index})">Edit</button>
                <button onclick="deleteBook(${index})">Delete</button>
            </td>
        `;
        bookList.appendChild(row);
    });
}
function editBook(index) {
    const book = library[index];
    const newTitle = prompt("Enter new title (or press Cancel to cancel):", book.title);
    
    // Check if the user pressed Cancel
    if (newTitle === null) {
        return; 
    }

    const newAuthor = prompt("Enter new author:", book.author);
    const newISBN = prompt("Enter new ISBN:", book.isbn);
    const newYear = prompt("Enter new year:", book.year);
    const newGenre = prompt("Enter new genre:", book.genre);
    const newQuantity = parseInt(prompt("Enter new quantity:", book.quantity));

    if (
        newAuthor !== null &&
        newISBN !== null &&
        newYear !== null &&
        newGenre !== null &&
        !isNaN(newQuantity)
    ) {
        library[index] = {
            title: newTitle,
            author: newAuthor,
            isbn: newISBN,
            year: parseInt(newYear),
            genre: newGenre,
            quantity: newQuantity
        };
        displayAvailableBooks();
    }
}
//function is responsible for adding the new book to the library 

function addNewBook() {
    const newTitle = document.getElementById("new-title").value;
    const newAuthor = document.getElementById("new-author").value;
    const newISBN = document.getElementById("new-isbn").value;
    const newYear = parseInt(document.getElementById("new-year").value);
    const newGenre = document.getElementById("new-genre").value;
    const newQuantity = parseInt(document.getElementById("new-quantity").value);

    if (
        newTitle.trim() !== "" &&
        newAuthor.trim() !== "" &&
        newISBN.trim() !== "" &&
        !isNaN(newYear) &&
        newGenre.trim() !== "" &&
        !isNaN(newQuantity)
    ) {
        library.push({
            title: newTitle,
            author: newAuthor,
            isbn: newISBN,
            year: newYear,
            genre: newGenre,
            quantity: newQuantity
        });
        displayAvailableBooks();
        resetAddBookForm();
        showEditNotification("New book added successfully.");
    } else {
        alert("Please fill in all fields with valid data.");
    }
}

function resetAddBookForm() {
    document.getElementById("add-book-form").reset();
}
function deleteBook(index) {
    const confirmation = confirm("Are you sure you want to delete this book?");
    if (confirmation) {
        library.splice(index, 1);
        displayAvailableBooks();
        alert("Book deleted successfully.");
    }
}


// Function to search for books by title
function searchBooks() {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const searchResults = library.filter((book) =>
        book.title.toLowerCase().includes(searchInput)
    );

    displayAvailableBooks(searchResults);
}


// Function to search for books by title
function searchBooks() {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const searchResults = library.filter((book) =>
        book.title.toLowerCase().includes(searchInput)
    );

    displayAvailableBooks(searchResults);

    if (searchResults.length > 0) {
        showSearchNotification(`Found ${searchResults.length} book(s) matching your search.`);
    } else {
        showSearchNotification("No books matching your search.");
    }
}

function showSearchNotification(message) {
    const searchNotification = document.getElementById("search-notification");
    searchNotification.textContent = message;
    searchNotification.style.backgroundColor = "#4CAF50";
    setTimeout(() => {
        searchNotification.textContent = "";
    }, 3000); 
}
function resetSearch() {
    document.getElementById("search-input").value = ""; t
    displayAvailableBooks(); 
    hideSearchResults(); 
    hideSearchNotification(); 
}

// Function to hide the search results
function hideSearchResults() {
    const searchResultsContainer = document.getElementById("search-results");
    searchResultsContainer.innerHTML = ""; 
}
// Function to hide the search notification
function hideSearchNotification() {
    const searchNotification = document.getElementById("search-notification");
    searchNotification.textContent = ""; 
}
//Function for edit button
let editingIndex = -1; 

// Function to open the edit form with book details
function editBook(index) {
    const book = library[index];
    document.getElementById("edit-title").value = book.title;
    document.getElementById("edit-author").value = book.author;
    document.getElementById("edit-isbn").value = book.isbn;
    document.getElementById("edit-year").value = book.year;
    document.getElementById("edit-genre").value = book.genre;
    document.getElementById("edit-quantity").value = book.quantity;

    editingIndex = index;
    document.getElementById("edit-form-container").style.display = "block";
}

// Function to save the edited book details
function saveEdit() {
    const editedBook = {
        title: document.getElementById("edit-title").value,
        author: document.getElementById("edit-author").value,
        isbn: document.getElementById("edit-isbn").value,
        year: parseInt(document.getElementById("edit-year").value),
        genre: document.getElementById("edit-genre").value,
        quantity: parseInt(document.getElementById("edit-quantity").value),
    };

    if (editingIndex !== -1) {
        library[editingIndex] = editedBook;
        displayAvailableBooks();
        cancelEdit();
        showEditNotification("Book edited successfully.");
    }
}

// Function to cancel the editing process and hide the edit form
function cancelEdit() {
    editingIndex = -1;
    document.getElementById("edit-form-container").style.display = "none";
}

// Variable to store the notification timeout
let editNotificationTimeout; 

// Function to save the edited book details
function saveEdit() {
    const editedBook = {
        title: document.getElementById("edit-title").value,
        author: document.getElementById("edit-author").value,
        isbn: document.getElementById("edit-isbn").value,
        year: parseInt(document.getElementById("edit-year").value),
        genre: document.getElementById("edit-genre").value,
        quantity: parseInt(document.getElementById("edit-quantity").value),
    };

    if (editingIndex !== -1) {
        library[editingIndex] = editedBook;
        displayAvailableBooks();
        cancelEdit();
        
        // Show the notification
        showEditNotification("Book edited successfully.");
        
        // Clear the notification after 3 seconds (adjust the time as needed)
        clearTimeout(editNotificationTimeout);
        editNotificationTimeout = setTimeout(() => {
            hideEditNotification();
        }, 3000); 
    }
}

// Function to hide the edit notification
function hideEditNotification() {
    const editNotification = document.getElementById("edit-notification");
    editNotification.style.display = "none";
}

// Function to show the edit notification
function showEditNotification(message) {
    const editNotification = document.getElementById("edit-notification");
    editNotification.textContent = message;
    editNotification.style.backgroundColor = "#4CAF50";
    editNotification.style.display = "block";
}




