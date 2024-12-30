const { insertDB } = require('../utils/index')
const book = require('../model/book.json')
const fav = require('../model/favbook.json')
const borrow = require('../model/borrow.json')
const wishlist = require('../model/wishlist.json')
const { v4: uuidv4 } = require('uuid')


const addBook = (req, res) => {
    try {
        const { title, author, isbn, category, publishedYear } = req.body
        const id = uuidv4()
        const u_id = req.user.userId
        const check = book.filter((data) => data.isbn == isbn).length
        if (check < 1) {
            const new_book = [
                ...book,
                {
                    id, title, author, isbn, category, publishedYear, u_id
                }
            ]

            const i = insertDB(new_book, 'book')
            res.status(200).json({ status: true, message: `book added sucessfully` })
        }
        else {
            res.status(200).json({ status: true, message: `book already present in DB` })

        }

    } catch (error) {
        res.status(400).json({ status: false, message: error.message })
    }

}


const allBook = (req, res) => {
    try {

        res.status(200).json({ status: true, message: book })
    } catch (error) {
        res.status(400).json({ status: false, message: error.message })
    }

}


const showBook = (req, res) => {
    try {
        const id = req.params.id
        const s_book = book.filter((data) => data.id == id)
        if (s_book.length == 1) {
            res.status(200).json({ status: true, message: s_book })
        }
        else {
            res.status(400).json({ status: false, message: `Book not found in DB` })

        }
    } catch (error) {
        res.status(400).json({ status: false, message: error.message })

    }



}

const deleteBook = (req, res) => {
    try {
        const id = req.params.id
        const w_data = book.filter((data) => data.id != id)
        insertDB(w_data, 'book')
        res.status(200).json({ status: true, message: `deleted sucessfully` })

    } catch (error) {
        res.status(400).json({ status: false, message: error.message })
    }

}


const updateBook = (req, res) => {
    try {
        const id = req.params.id
        const update = req.body
        const b = book.findIndex((data) => data.id == id)
        book[b] = { ...book[b], ...update }
        insertDB(book, 'book')
        res.status(200).json({ status: true, message: `updated sucessfully` })


    } catch (error) {
        res.status(400).json({ status: false, message: error.message })
    }

}

const addFav = (req, res) => {
    try {

        const id = req.params.id
        const x = fav.filter((data) => data.id == id).length
        if (x == 0) {
            const d = book.find((data) => data.id == id)
            const old = [...fav, d]
            insertDB(old, 'favbook')
            res.status(200).json({ status: true, message: `Book added to favorites` })
        }
        else {
            res.status(200).json({ status: true, message: `Book already in favorites` })

        }
    } catch (error) {
        res.status(400).json({ status: false, message: error.message })
    }
}

const unFav = (req, res) => {
    try {
        const id = req.params.id
        const x = fav.filter((data) => data.id == id).length
        if (x == 1) {
            const d = fav.filter((data) => data.id != id)
            insertDB(d, 'favbook')
            res.status(200).json({ status: true, message: `Book removed from favorites` })
        }
        else {
            res.status(200).json({ status: true, message: `Book already removed from favorites` })

        }


    } catch (error) {
        res.status(400).json({ status: false, message: error.message })
    }

}

const allfav = (req, res) => {
    try {
        res.json(fav)
    } catch (error) {
        res.status(400).json({ status: false, message: error.message })

    }
}

const borrowBook = (req, res) => {
    try {
        const id = req.params.id
        const x = borrow.filter((data) => data.id == id).length
        if (x == 0) {
            const d = book.find((data) => data.id == id)
            const c1 = [...borrow, d]
            insertDB(c1, 'borrow')
            const f = book.filter((data) => data.id != id)
            insertDB(f, 'book')
            res.status(200).json({ status: true, message: `Book added to borrow` })
        }
        else {
            res.status(200).json({ status: true, message: `Book already in borrow` })

        }


    } catch (error) {
        res.status(400).json({ status: false, message: error.message })
    }
}

const returnBook = (req, res) => {
    try {
        const id = req.params.id
        const x = borrow.filter((data) => data.id == id).length
        if (x == 1) {
            const f = borrow.find((data) => data.id == id)
            const old = [...book, f]
            insertDB(old, 'book')
            const d = borrow.filter((data) => data.id != id)
            insertDB(d, 'borrow')

            res.status(200).json({ status: true, message: `Book returned` })
        }
        else {
            res.status(200).json({ status: true, message: `Book already returned` })

        }


    } catch (error) {
        res.status(400).json({ status: false, message: error.message })
    }

}

const getMyBooks = (req, res) => {
    const fetch = book.filter((data) => data.u_id == req.user.userId)
    res.status(200).json({ status: true, message: fetch })
}

const addWishlist = (req, res) => {
    try {
        const id = req.params.id
        const x = fav.filter((data) => data.id == id).length
        if (x == 0) {
            const d = book.find((data) => data.id == id)
            const old = [...wishlist, d]
            insertDB(old, 'wishlist')
            res.status(200).json({ status: true, message: `Book added to wishlist` })
        }
        else {
            res.status(200).json({ status: true, message: `Book already in wishlist` })

        }

    } catch (error) {
        res.status(404).json({ status: false, message: error.message })
    }

}

const getWishlist = (req, res) => {
    try {
        res.status(200).json({ status: true, message: wishlist })

    } catch (error) {
        res.status(400).json({ status: false, message: error.message })
    }

}

const deleteWishlist = (req, res) => {
    try {
        const id = req.params.id
        const c = wishlist.find((data) => data.id == id && data.u_id == req.user.userId) ? true : false
        if (c) {
            const d = wishlist.filter((data) => data.id != id)
            insertDB(d, 'wishlist')
            res.status(200).json({ status: true, message: `book removed from wishlist` })
        }
        else {
            res.status(400).json({ status: true, message: `book not already removed from wishlist` })
        }

    } catch (error) {
        res.status(400).json({ status: false, message: error.message })
    }

}

module.exports = {
    addBook,
    allBook,
    showBook,
    deleteBook,
    updateBook,
    addFav,
    unFav,
    allfav,
    borrowBook,
    returnBook,
    getMyBooks,
    addWishlist,
    getWishlist,
    deleteWishlist

}