// Renders an error message
function showError(msg) {
  const html = `<li><p class="error">${msg}</p></li>`;
  document.querySelector("#results").innerHTML = html;
}

// Searches for books and returns a promise that resolves a JSON list
function searchForBooks(term) {
  // TODO
  const apikey = "&key=AIzaSyADufvIDuhYx6RnfZ9afvB98RXx85YMdzU";
  const apiurl = `https://www.googleapis.com/books/v1/volumes?q=${term}${apikey}`;

  return fetch(`${apiurl}`)
    .then(res => res.json())
    .catch(error => showError(error));
}

// Generate HTML and sets #results's contents to it
function render() {
  // TODO
  const searchTerm = document.getElementById("search-bar").value;
  searchForBooks(searchTerm).then(function(data) {
    let bookData = data.items;

    for (let book of bookData) {
      let bookImage = book.volumeInfo.imageLinks.thumbnail;
      let bookTitle = book.volumeInfo.title;
      let bookSubtitle = book.volumeInfo.subtitle;
      let bookAuthors = book.volumeInfo.authors;
      let bookID = book.id;
      let googleBooksURL = `https://books.google.com/books?id=${bookID}`;

      if (bookSubtitle === undefined) {
        bookSubtitle = "N/A";
      }
      if (bookAuthors === undefined) {
        bookAuthors = "N/A";
      } else {
        bookAuthors = bookAuthors.join(", ");
      }

      let li = document.createElement("li");
      li.innerHTML = `
      <img src=${bookImage} class="bookImage">
      <div class="bookInfo">
        <label> Title: </label>
        <p>${bookTitle}</p>
        <label> Subtitle: </label>
        <p>${bookSubtitle}</p>
        <label> Author(s): </label>
        <p>${bookAuthors}</p>
      </div>
      <a href="${googleBooksURL}" target="_blank" class="bookLink">Learn More!</a>`;
      li.classList.add("book");
      document.getElementById("results").append(li);
    }
  });
}

document
  .getElementById("search-bar")
  .addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      render();
    }
  });
document.getElementById("search-btn").addEventListener("click", render);
