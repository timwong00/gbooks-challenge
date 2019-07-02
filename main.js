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
    console.log(bookData);
    for (let i = 0; i < data.items.length; i++) {
      let bookImage = data.items[i].volumeInfo.imageLinks.thumbnail;
      let bookTitle = data.items[i].volumeInfo.title;
      let bookSubtitle = data.items[i].volumeInfo.subtitle;
      let bookAuthors = data.items[i].volumeInfo.authors;
      let googleBooksURL = "https://books.google.com/books?id=";
      let bookID = data.items[i].id;

      if (bookSubtitle === undefined) {
        bookSubtitle = "N/A";
      }
      if (bookAuthors === undefined) {
        bookAuthors = "N/A";
      } else {
        bookAuthors = bookAuthors.join(", ");
      }
      // for (let j = 0; j < data.items.length; j++) {
      //   if (bookID === data.items[j].id) {
      //     console.log("dupe");
      //   }
      // }

      if (bookData < data.items.length) {
        let li = document.createElement("li");
        li.innerHTML = `<img src=${bookImage} class="bookImage"> 
      <p>Book Title: ${bookTitle}</p> 
      <p>Book Subtitle: ${bookSubtitle}</p> 
      <p>Book Authors: ${bookAuthors}</p>
      <a src="${googleBooksURL + bookID}>More Information</a>`;
        li.classList.add("bookInfo");
        document.getElementById("results").append(li);
      } else {
        li.innerHTML = `<img src=${bookImage} class="bookImage"> 
        <p>Book Title: ${bookTitle}</p> 
        <p>Book Subtitle: ${bookSubtitle}</p> 
        <p>Book Authors: ${bookAuthors}</p>
        <a src="${googleBooksURL + bookID}>More Information</a>`;
      }
    }
    console.log(data);
  });
}

document.getElementById("search-btn").addEventListener("click", render);
