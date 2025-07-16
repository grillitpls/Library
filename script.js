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

    displayBook() {
        const dataID = myLibrary[myLibrary.length - 1].id

        if (myLibrary.length > 0) {
            this.bookHTML = `
                <div class="book">
                    <button class="delete" onclick="Delete(this, event)" data-id="${myLibrary[myLibrary.length - 1].id}">delete</button>
                    <p class="text-wrap">${myLibrary[myLibrary.length - 1].title}</p>
                    <p class="text-wrap">${myLibrary[myLibrary.length - 1].author}</p>
                    <p class="text-wrap">${myLibrary[myLibrary.length - 1].pages}</p>
                    <button class="read-toggle" data-id="${myLibrary[myLibrary.length - 1].id}" onclick="toggleRead(this)">${myLibrary[myLibrary.length - 1].read}</button>
                </div>
            `
        }
        container.innerHTML += this.bookHTML
    }
}

addBtn.addEventListener('click', (e) => {
    e.preventDefault()

    if (title.value !== '' && author.value !== '') {
        const newBook = new Book(title.value, author.value, pages.value, readStatus)
        
        myLibrary.push(newBook)
        
        console.log(myLibrary)
    
        newBook.displayBook()       
    }

    form.reset()
}) 

function toggleRead(element) {
    console.log(Array.from(document.querySelectorAll('.read-toggle')))
    const found = Array.from(document.querySelectorAll('.read-toggle')).find((button) => button.dataset.id === element.dataset.id)

    console.log(found)

    if(found.textContent === 'read') {
        found.textContent = 'not read yet'
    }else {
        found.textContent = 'read'
    }
}

function Delete(element, event) {
    element.parentNode.remove()
    let newLibrary = myLibrary.filter(book => {
        console.log(element)
        return book.id != element.dataset.id
    })
    myLibrary = newLibrary
}
