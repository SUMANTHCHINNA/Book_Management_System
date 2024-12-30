const express = require('express')
const router = express.Router()
const { addBook, allBook, showBook, deleteBook, updateBook, addFav, unFav, allfav, borrowBook, returnBook, getMyBooks, addWishlist, getWishlist, deleteWishlist } = require('../controller/book')
const auth = require('../middleware/auth')


router.use(auth)
router.post('/new_book', addBook)
router.get('/books', allBook)
router.get('/book/:id', showBook)
router.delete('/book/:id', deleteBook)
router.patch('/book/:id', updateBook)
router.post('/favorite/:id', addFav)
router.delete('/unfavorite/:id', unFav)
router.get('/favorites', allfav)
router.post('/book/borrow/:id', borrowBook)
router.delete('/book/return/:id', returnBook)
router.get('/my_books', getMyBooks)
router.post('/wishlist/:id', addWishlist)
router.get('/wishlist', getWishlist)
router.delete('/wishlist/:id', deleteWishlist)



module.exports = router