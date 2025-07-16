const container = document.querySelector('.container')
const form = document.querySelector('form')
const addBtn = document.querySelector('#add-btn')
const title = document.querySelector('input[name="title"]')
const author = document.querySelector('input[name="author"]')
const pages = document.querySelector('input[name="pages"]')
const read = document.querySelector('input[name="read"]')

let myLibrary = []
let readStatus = () => read.checked ? 'read' : 'not read yet'

class Book {
    bookHTML = ``

    constructor(title, author, pages, read) {
        if (!new.target) {
            throw Error("You must use the new operator to call the constructor")
        }
        this.id = crypto.randomUUID()
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read()
    }

    toggleRead() {
        if(document.querySelector('.read-toggle').textContent === 'read') {
            document.querySelector('.read-toggle').textContent = 'not read yet'
        }else {
            document.querySelector('.read-toggle'.textContent = 'read')
        }
    }

    Delete(element, event) {
        element.parentNode.remove()
        let newLibrary = myLibrary.filter(book => {
            console.log(element)
            return book.id != element.dataset.id
        })
        this.myLibrary = newLibrary
    }

    displayBook() {
        if (this.myLibrary.length > 0) {
            this.bookHTML = `
                <div class="book">
                    <button class="delete" onclick="this.Delete(this, event)" data-id="${this.myLibrary[this.myLibrary.length - 1].id}">delete</button>
                    <p class="text-wrap">${this.myLibrary[this.myLibrary.length - 1].title}</p>
                    <p class="text-wrap">${this.myLibrary[this.myLibrary.length - 1].author}</p>
                    <p class="text-wrap">${this.myLibrary[this.myLibrary.length - 1].pages}</p>
                    <button class="read-toggle" onclick="this.toggleRead()">${this.myLibrary[this.myLibrary.length - 1].read}</button>
                </div>
            `
        }
    }
}

addBtn.addEventListener('click', (e) => {
    e.preventDefault()

    if (title.value !== '' && author.value !== '') {
        const newBook = new Book(title, author, pages, readStatus)
    }

    myLibrary.push(newBook)
    console.log(myLibrary)

    newBook.displayBook()       
    

    form.reset()
}) 
