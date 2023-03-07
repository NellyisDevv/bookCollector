class App {
  constructor() {
    /* Creating an array for all of the book elements to be added inside of we are seperating this from the DOM elements and also making this array is better because we will have access to many array methods  */
    this.books = []

    /* Grabing our "Welcome Home" Modal */
    this.$modalBtn = document.querySelector('#welcome-container')

    /* Grabbing our "Add new book popup modal" */
    this.$modalPopup = document.querySelector('#add-book-modal')

    /* Grabbing our "Add new book form" */
    this.$form = document.querySelector('#form')

    /* Grabbing our "Author" input type text */
    this.$author = document.querySelector('#author')

    /* Grabbing our "Book title" input type text */
    this.$bookTitle = document.querySelector('#book-title')

    /* Brabbing our "Number of pages" input type text */
    this.$numOfPages = document.querySelector('#num-of-pages')

    /* Grabbing our "Add new book form buttons"*/
    this.$formButtons = document.querySelector('#form-buttons')

    /* Grabbing our placeholder */
    this.$placeholder = document.querySelector('#placeholder')

    /* Grabbing our books container */
    this.$books = document.querySelector('#books')

    //! Making sure that addEventListeners runs when the app starts up
    this.addEventListeners()
  }

  addEventListeners() {
    /* Event when clicking on the document body */
    document.body.addEventListener('click', event => {
      this.handleModalBtnClick(event)
    })

    /* Event when clicking on the popup modal in the middle of the screen */
    this.$modalPopup.addEventListener('click', event => {
      this.handleModalBtnClick(event)
    })

    /* Event when clicking the sumbit button or hitting the enter key */
    this.$form.addEventListener('submit', event => {
      // No page refresh when 'submit' button clicked
      event.preventDefault()
      // console.log('submitted')
      // Grabbing our author value and storing it inside a variable
      const author = this.$author.value
      const bookTitle = this.$bookTitle.value
      const numOfPages = this.$numOfPages.value
      // the author, book title, and number of pages HAS to be provided for hasBook to be true
      const hasBook = author && bookTitle && numOfPages
      if (hasBook) {
        // if hasBook is true then run this
        // The addBook function is going to take an argument of the parameter as an object because these parameters are going to be placed into the object "newBook"
        // Object shorthand author: author works the same if we just say author
        this.addBook({
          author: author,
          bookTitle: bookTitle,
          numOfPages: numOfPages,
        })
      }
    })
  }

  /* Open the modal when BTN is clicked and close the modal when anything else is clicked! */
  handleModalBtnClick(event) {
    /* Checking to see if "Welcome Home!" Modal Btn was clicked! */
    const isModalBtnClicked = this.$modalBtn.contains(event.target)
    const isModalPopupClicked = this.$modalPopup.contains(event.target)

    // Didnt end up needing to specify when the formButtons where clicked
    /* const isFormBtnClicked = this.$formButtons.contains(event.target) */

    if (isModalBtnClicked) {
      /* If "Welcome Home!" modal clicked open the modal popup */
      // console.log('Open Modal')
      this.openModalPopup()
    } else {
      /* If anything else is clicked close the popup */
      // console.log('Close Modal')
      this.closeModalPopup()
    }

    if (isModalPopupClicked) {
      /* If modal is clicked within the modal keep it open and don't close it */
      this.keepModalOpen()
    }
  }

  openModalPopup() {
    this.$modalPopup.style.display = 'block'
    this.$formButtons.style.display = 'block'
  }

  closeModalPopup() {
    this.$modalPopup.style.display = 'none'
  }

  keepModalOpen() {
    this.$modalPopup.style.display = 'block'
  }

  addBook(book) {
    const newBook = {
      author: book.author,
      bookTitle: book.bookTitle,
      numOfPages: book.numOfPages,
      color: 'white',
      // Converting array from being 0 indexed to counting from 1 onwords
      id: this.books.length > 0 ? this.books[this.books.length - 1].id + 1 : 1,
    }
    this.books = [...this.books, newBook]
    console.log(this.books)
    this.displayBooks()
    this.closeModalPopup()
  }

  displayBooks() {
    const hasBooks = this.books.length > 0
    this.$placeholder.style.display = hasBooks ? 'none' : 'block'

    this.$books.innerHTML = this.books
      .map(
        book => `
      <div style="background: ${book.color};" class="book">
      <div class="book-author">${book.author}</div>
      <div class="book-title">${book.bookTitle}</div>
      <div class="book-numOfPages">Pages: ${book.numOfPages}</div>
      <div class='buttons'>
        <button>Change</button>
        <button>Delete</button>
      </div>
      </div>
    `
      )
      .join('')
  }
}

new App()
