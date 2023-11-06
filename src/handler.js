const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
    return response;
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    insertedAt,
    updatedAt,
    finished,
  };

  books.push(newBook);

  const isSuccess = books.some((book) => book.id === id);

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: { bookId: id },
    }).code(201);
    return response;
  }

  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  }).code(500);
  return response;
};

const getAllBooks = (request, h) => {
  const mappedBooks = books.map(({ id, name, publisher }) => ({ id, name, publisher }));
  const responseData = {
    status: 'success',
    data: { books: mappedBooks },
  };
  return h.response(responseData).code(200);
};

const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const book = books.find((b) => b.id === bookId);

  if (book) {
    return {
      status: 'success',
      data: { book },
    };
  }

  return h
    .response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    })
    .code(404);
};

const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  const isNameMissing = !name;
  const isReadPageGreaterThanPageCount = readPage > pageCount;

  if (isNameMissing) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
  }

  if (isReadPageGreaterThanPageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    const updatedBook = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt: new Date().toISOString(),
    };

    books[index] = updatedBook;

    return h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    }).code(200);
  }

  return h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  }).code(404);
};

const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((book) => book.id === bookId);

  let response;
  let statusCode;

  if (index !== -1) {
    books.splice(index, 1);
    response = {
      status: 'success',
      message: 'Buku berhasil dihapus',
    };
    statusCode = 200;
  } else {
    response = {
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    };
    statusCode = 404;
  }

  return h.response(response).code(statusCode);
};

module.exports = {
  deleteBookByIdHandler,
};

module.exports = {
  addBookHandler,
  getAllBooks,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
