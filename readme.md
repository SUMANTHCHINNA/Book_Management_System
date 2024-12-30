I. User Management APIs
1. POST /api/user/register - Register a new user.
2. POST /api/user/login - Login and get JWT.

II. Book Management APIs
3. POST /api/user/new_book - Add a new book.
4. GET /api/user/books - Get all books.
5. GET /api/user/book/:id - Get a book by ID.
6. PATCH /api/user/book/:id - Update a book by ID.
7. DELETE /api/user/book/:id - Delete a book by ID.
8. POST /api/user/favorite/:id - add a book to favorite
9. DELETE /api/user/unfavorite/:id - remove a book to favorite
10. GET /api/user/favorites - get all favorite books
11. POST /api/user/book/borrow/:id
12. Delete /api/user/book/return/:id
13. get api/user/my_books  - gets specific user books
14. post api/user/wishlist/:id - add specific book to wishlist
15. get api/user/wishlist - get all books in wishlist of specific - user
16. delete api/user/wishlist - delete specific book from wishlist by user



# user credentials
[
  {
      "username" : "sumanth",
      "email" : "sumanth@gmail.com",
      "password" : "12345"
  },

  {
      "username" : "shiva",
      "email" : "shiva@gmail.com",
      "password" : "12345"
  }

]


# sample book data

[
  {
    "title": "Introduction to Computer Science",
    "author": "J. Glenn Brookshear",
    "isbn": "9780133760064",
    "category": "Computer Science",
    "publishedYear": 2014
  },

  {
    "title": "Programming Fundamentals",
    "author": "Karl Beecher",
    "isbn": "9781108796352",
    "category": "Programming",
    "publishedYear": 2018
  },

  {
    "title": "Data Structures and Algorithms",
    "author": "Alfred V. Aho, Jeffrey D. Ullman, John E. Hopcroft",
    "isbn": "9780201000238",
    "category": "Data Structures",
    "publishedYear": 1983
  },

  {
    "title": "Computer Organization and Design",
    "author": "David A. Patterson, John L. Hennessy",
    "isbn": "9780124077263",
    "category": "Computer Architecture",
    "publishedYear": 2013
  }
]


<--- API FUNCTIONS --->

1. POST /api/users/register - Register a new user.

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}


2. POST /api/users/login - Login and get JWT.

{
  "email": "john.doe@example.com",
  "password": "password123"
}
---> it generates a token for particular user


3. POST /api/user/new_book - Add a new book.

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "9780743273565",
  "category": "Fiction",
  "publishedYear": 1925
}

4. GET /api/user/books - Get all books.

[
  {
    "id": "123",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    ...
  },
  ...
]


5. GET /api/user/book/:id - Get a book by ID.

{
  "id": "123",
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  ...
}


6. PATCH /api/ser/book/:id - Update a book by ID.
--- using this API any update will be done


7. DELETE /api/user/book/:id - Delete a book by ID.
--- API used for to delete an record

8. POST /api/users/favorites/:id
9. POST /api/books/:id/borrow
10. POST /api/books/:id/return
11. POST /api/books/:id/reviews
12. GET /api/books/:id/reviews
13. DELETE /api/books/:id/reviews/:reviewId
