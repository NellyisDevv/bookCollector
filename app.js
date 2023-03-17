//! FEATURES TO ADD
//! CSS CONFETTI WHEN USER COMPLETES A BOOK
//! DIFFERENT FILTER METHODS FOR DIFFERENT FEATURES, MAYBE DELETE A RANDOM BOOK WITH AN ARRAY FILTER METHOD (CHECK ALL YOUR ARRAY FILTER METHODS TO SEE WHAT FEATURE YOU CAN MAKE UP)
//! INTEGRATE SOME SORT OF API INTO YOUR APP

//! BOOK IDEA DIV THAT GIVES THE USER A RANDOM IDEA FOR A BOOK THEY MIGHT WANT TO READ, THIS INFORMATION CAN BE OBTAINED FROM AN API, AND WOULD RENDER OUT DATA ABOUT THE BOOK ALL YOU NEED IS THE BOOK TITLE BOOK AUTHOR AND NUMBER OF PAGES

//! ALLOW THE USER TO PUT THE PROGRESS OF THEIR CURRENT READING, LIKE HOW MANY PAGES THEY HAVE READ, WITH THE + AND - SYMBOLS AND IF THEY ARE NOT AT THE COMPLETE NUMBER OF PAGES THEN THE GREEN FILTER ON THE BOOK WILL DISAPEAR!

//! TOO MUCH COPY CODE IN THE CSS FILE, CHECK TO SEE ALL OF THE CODE THAT YOU HAVE WRITTEN MORE THAN ONCE AND MAKE IT ONE CSS CLASS AND APPLY THAT CLASS TO THE DOM BE CAREFUL NOT TO CHANGE CLASSES THAT ARE CURRENTLY BEING GRABED BY THE JAVASCRIPT APP FILE

class App {
  constructor() {
    /* Creating an array for all of the book elements to be added inside of we are seperating this from the DOM elements and also making this array is better because we will have access to many array methods  */
    // this.books = []
    this.books = JSON.parse(localStorage.getItem('books')) || []

    // storing our data from the selectBook(event) function this means no $ symbol
    // using empty string because we don't want to give these default values
    this.author = ''
    this.bookTitle = ''
    this.numOfPages = ''

    // grabbing our data-id variable for the dataset
    // we are doing these instance properties so that we can use the
    this.id = ''

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

    /* Grabbing our modal close button */
    this.$modalCloseButton = document.querySelector('#modal-close-btn')

    /* Grabbing the outer body of the app */
    this.$outerBody = document.querySelector('#outer-body')

    /* Grabbing our edit book modal */
    this.$editBookModal = document.querySelector('.edit-book-modal')

    /* Grabbing our edit book modal inputs */
    this.$editBookModalAuthor = document.querySelector('.edit-modal-author')
    this.$editBookModalBookTitle = document.querySelector(
      '.edit-modal-book-title'
    )
    this.$editBookModalNumOfpages = document.querySelector(
      '.edit-modal-num-of-pages'
    )

    /* Grabbing our edit modal close button */
    this.$editBookModalCloseBtn = document.querySelector(
      '.edit-book-modal-close-btn'
    )

    /* Grabbing our view stats modal */
    this.$viewStats = document.querySelector('#information-container')

    /* Grabbing our stats modal */
    this.$statsModal = document.querySelector('.stats-modal')

    /* Grabbing our stats modal btn */
    this.$statsModalBtn = document.querySelector('.stats-modal-btn')

    //! Making sure that addEventListeners runs when the app starts up
    this.addEventListeners()

    //! Making sure that all books render when the app starts up
    this.render()
  }

  addEventListeners() {
    /* Event when clicking on the document body */
    document.body.addEventListener('click', event => {
      this.handleModalBtnClick(event)
      this.selectBook(event)
      // the order of selectBook and openEditModal have been switched because we first want to select a book and then open the edit modal! (this will make the input work correctly because now we are actually grabbing our "this" values from something!)
      // if we dont switch the order our input values will not populate how we expect them to
      this.openEditModal(event)
      // this.selectBook(event)
      this.completeBook(event)
      this.deleteBook(event)
      this.revertBook(event)
    })

    /* Event when clicking on the popup modal in the middle of the screen */
    this.$modalPopup.addEventListener('click', event => {
      event.stopPropagation()
      this.handleModalBtnClick(event)
    })

    this.$viewStats.addEventListener('click', event => {
      event.stopPropagation()
      this.handleStatsBtnClick(event)
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
      this.$modalPopup.style.display = 'none'
    })

    this.$modalCloseButton.addEventListener('click', event => {
      event.stopPropagation()
      this.closeModalPopup()
      this.clearInputValues()
    })

    this.$editBookModalCloseBtn.addEventListener('click', event => {
      this.closeEditModal()
    })

    this.$statsModalBtn.addEventListener('click', event => {
      this.closeStatsModal()
    })
  }

  handleStatsBtnClick(event) {
    const isStatsBtnClicked = this.$viewStats.contains(event.target)

    if (isStatsBtnClicked) {
      this.openStatsModal()
    } else {
      this.closeStatsModal()
    }
  }

  /* Open the modal when BTN is clicked and close the modal when anything else is clicked! */
  handleModalBtnClick(event) {
    /* Checking to see if "Welcome Home!" Modal Btn was clicked! */
    const isModalBtnClicked = this.$modalBtn.contains(event.target)
    const isModalPopupClicked = this.$modalPopup.contains(event.target)
    /* new div created which is a new main wrapping the original main, bad practice but application is now working! */
    const isOuterBodyClicked = this.$outerBody.contains(event.target)

    /* This code is checking if hasBook is true and if its true we are going to run it through our conditional that is going to run the function addBook and add the book if we click off the modal instead of just removing it */
    const author = this.$author.value
    const bookTitle = this.$bookTitle.value
    const numOfPages = this.$numOfPages.value
    const hasBook = author && bookTitle && numOfPages

    // Didnt end up needing to specify when the formButtons where clicked
    /* const isFormBtnClicked = this.$formButtons.contains(event.target) */

    /* else if not working
    else if (hasBook) {
      this.addBook({ author, bookTitle, numOfPages })
      this.closeModalPopup()
    } 
    */
    if (isModalBtnClicked) {
      /* If "Welcome Home!" modal clicked open the modal popup */
      // console.log('Open Modal')
      this.openModalPopup()
    } else {
      /* If anything else is clicked close the popup */
      // console.log('Close Modal')
      this.closeModalPopup()
    }

    if (hasBook && isOuterBodyClicked) {
      // console.log('outer body clicked!')
      this.addBook({ author, bookTitle, numOfPages })
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

  openStatsModal() {
    this.$statsModal.style.display = 'block'
  }

  closeModalPopup() {
    this.$modalPopup.style.display = 'none'
  }

  closeStatsModal() {
    this.$statsModal.style.display = 'none'
  }

  keepModalOpen() {
    this.$modalPopup.style.display = 'block'
  }

  openEditModal(event) {
    /* making sure the edit modal popup doesn't appear when we click either three of these buttons */
    if (event.target.matches('.delete-btn')) return
    if (event.target.matches('.done-btn')) return
    if (event.target.matches('.revert-btn')) return

    if (event.target.closest('.book')) {
      this.$editBookModal.classList.toggle('open-modal')
      // create references to the edit modals input values and then populate them based on their value that they hold (change the values to see how this works!)
      this.$editBookModalAuthor.value = this.author
      this.$editBookModalBookTitle.value = this.bookTitle
      this.$editBookModalNumOfpages.value = this.numOfPages
    }
  }

  closeEditModal() {
    // we want to close the modal and edit the todo
    // first we want to reference our note so we make another function
    this.editNote()
    // we can put our toggle modal class here since we are just toggling it from a CSS class
    this.$editBookModal.classList.toggle('open-modal')
  }

  editNote() {
    // does not need any values passed through it they are already in our input
    // we need to put them into variables
    const author = this.$editBookModalAuthor.value
    const bookTitle = this.$editBookModalBookTitle.value
    const numOfPages = this.$editBookModalNumOfpages.value
    // we want to go through our notes array and find the note with the stored id and then take the updated text from the modal title and modal text input and then update that note with the new data
    // we need to transfrom our array and keep it as the same length using map
    // take the book id and see if its equal to the id we have stored in the constructor
    // we create a new object that is going to spread in all of its previous properties which is going to come from book the current book we are iterating over, in the next arguments we want to include the author bookTitle and numOfPages to update their properties otherwise (:) we just want to return the book (if we don't want to update it)
    /*
    this.books.map(note =>
      book.id === Number(this.id)
        ? { ...book, author, bookTitle, numOfPages }
        : book
    )
    */
    // the id when we add a note is going to be a string which is different from the original id which is a number to fix this we can convert "this.id" into a number you can also change "book.id" into a string but its better to compare two numbers
    // we then want to update our books array by telling the code our books array will equal to the new map method if the book is edited
    this.books = this.books.map(book =>
      book.id === Number(this.id)
        ? { ...book, author, bookTitle, numOfPages }
        : book
    )
    // this.saveBooks()
    // after editing our note we then want to display our note
    // this.displayBooks()
    // after this we want to close our modal in the function closeEditModal()
    this.render()
  }

  /* Had to make a seperate function special for clearing the values because the closeModalPopup() function was deleting our values when we clicked off the input instead of after submit */
  clearInputValues() {
    this.$author.value = ''
    this.$bookTitle.value = ''
    this.$numOfPages.value = ''
  }

  // addBook(book) is what this was reverted from both of these work but since addBook is watching for author bookTitle and numOfPages we can use object destructuring in order to be able to use object shorthand in the newBook object
  addBook({ author, bookTitle, numOfPages }) {
    const newBook = {
      author,
      bookTitle: bookTitle,
      numOfPages,
      color: 'white',
      // Converting array from being 0 indexed to counting from 1 onwords
      id: this.books.length > 0 ? this.books[this.books.length - 1].id + 1 : 1,
    }
    this.books = [...this.books, newBook]
    console.log(this.books)
    // this.saveBooks()
    // this.displayBooks()
    this.render()
    this.closeModalPopup()
    this.clearInputValues()
  }

  selectBook(event) {
    // This function will return to you the book that you have selected and it will know which individual book you are trying to grab by the data-id!
    const $selectedBook = event.target.closest('.book')
    //! console.log($selectedBook)
    // clear the error (this is happening because we are trying to get the children when a note hasn't been selected yet)
    // if NOT selected book return the function so that the rest of it does not run
    if (!$selectedBook) return
    // we are selecting the children from the DOM element that we have selected, if we selected book id with 1 we will get the children from that book which should give us an array of element in them called HTMLCollection
    //! console.log($selectedBook.children)
    // array destructure to get our individual values from array HTMLCollection and use as global variable
    const [$author, $bookTitle, $numOfPages] = $selectedBook.children
    // we can now get the title of our destructured array items (to make these avalible as global variables, create them as instance properties)
    /*
    $author.innerText
    $bookTitle.innerText
    $numOfPages.innerText
    */
    // updated innerText with instance properties we created
    this.author = $author.innerText
    this.bookTitle = $bookTitle.innerText
    this.numOfPages = $numOfPages.innerText
    // we need the notes id by using the data-id we created in displayBooks
    // getting the property from this dataset which is actually equal to the book id that we created in addBook referencing books by 1,2,3,etc remember to put this inside of our constructor as well! (also remember since this.id is an instance property we can use it as we like )
    this.id = $selectedBook.dataset.id
    // we can now go into our openEditModal() and set the values for that modals inputs so that they populate on the screen
  }

  completeBook(event, color = 'lightgreen') {
    event.stopPropagation()
    if (!event.target.matches('.done-btn')) return
    const id = event.target.dataset.id
    this.books = this.books.map(book =>
      book.id === Number(id) ? { ...book, color } : book
    )
    // this.saveBooks()
    // this.displayBooks()
    this.render()
  }

  deleteBook(event) {
    event.stopPropagation()
    if (!event.target.matches('.delete-btn')) return
    const id = event.target.dataset.id
    this.books = this.books.filter(book => book.id !== Number(id))
    // this.saveBooks()
    // this.displayBooks()
    this.render()
  }

  revertBook(event, color = 'white') {
    event.stopPropagation()
    if (!event.target.matches('.revert-btn')) return
    const id = event.target.dataset.id
    this.books = this.books.map(book =>
      book.id === Number(id) ? { ...book, color } : book
    )
    this.render()
  }

  render() {
    this.saveBooks()
    this.displayBooks()
  }

  saveBooks() {
    localStorage.setItem('books', JSON.stringify(this.books))
  }

  displayBooks() {
    const hasBooks = this.books.length > 0
    this.$placeholder.style.display = hasBooks ? 'none' : 'block'

    this.$books.innerHTML = this.books
      .map(
        book => `
      <div style="background: ${book.color};" class="book" data-id="${book.id}">
      <div class="book-author">${book.author}</div>
      <div class="book-title">${book.bookTitle}</div>
      <div class="book-numOfPages">${book.numOfPages}</div>
      <div class='buttons'>
        <button data-id="${book.id}" id="done-btn" class="done-btn">Done</button>
        <button data-id="${book.id}" id="edit-btn" class="revert-btn">Revert</button>
        <button data-id="${book.id}" id="delete-btn" class="delete-btn">Delete</button>
      </div>
      </div>
    `
      )
      .join('')
  }
}

new App()
