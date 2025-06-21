const container = document.querySelector('.container')
const form = document.querySelector('form')
const addBtn = document.querySelector('#add-btn')
const title = document.querySelector('input[name="title"]')
const author = document.querySelector('input[name="author"]')
const pages = document.querySelector('input[name="pages"]')
const read = document.querySelector('input[name="read"]')

readStatus = () => read.checked ? 'read' : 'not read yet'

console.log(form)
console.log(title)
console.log(readStatus)


let myLibrary = [];
let bookHTML = ``

console.log(myLibrary.length)

function Book(title, author, pages, read) {
    if  (!new.target) {
        throw Error("You must use the 'new operator to call the constructor");
    }
    
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read)
    
    myLibrary.push(newBook)

    console.log(myLibrary, myLibrary.length)
}

addBtn.addEventListener('click', (e) => {
    e.preventDefault()

    if (title.value !== '' && author.value !== '') {
        addBookToLibrary(title.value, author.value, pages.value, readStatus())
    
        displayBook()
    }

    form.reset()
})

function toggleRead() {
    if(document.querySelector('.read-toggle').textContent === 'read') {
        document.querySelector('.read-toggle').textContent = 'not read yet'
    }else {
        document.querySelector('.read-toggle').textContent  = 'read'
    }
}

function Delete(element, event) {
    element.parentNode.remove()
    let newLibrary = myLibrary.filter(book => {
        console.log(element)
        return book.id != element.dataset.id
    })
    myLibrary = newLibrary
    console.log(myLibrary)
}

function displayBook() {
    if (myLibrary.length > 0) {
        bookHTML = `
            <div class="book">
                <button class="delete" onclick="Delete(this, event)" data-id="${myLibrary[myLibrary.length - 1].id}">delete</button>
                <p class='text-wrap'>${myLibrary[myLibrary.length - 1].title}</p>
                <p class='text-wrap'>${myLibrary[myLibrary.length - 1].author}</p>
                <p class='text-wrap'>${myLibrary[myLibrary.length - 1].pages}</p>
                <button class="read-toggle" onclick="toggleRead()">${myLibrary[myLibrary.length - 1].read}</button>
            </div>
        `
        
        container.innerHTML += bookHTML
    }
}
