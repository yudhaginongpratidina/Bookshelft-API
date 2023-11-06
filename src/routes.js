const {
  addBookHandler,
  getAllBooks,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
} = require('./handler');

const routes = [

  // MENYIMPAN / MENAMBAHKAN DATA BUKU
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },

  // MENAMPILKAN SEMUA DATA BUKU
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },

  //   MENAMBPILAKN DETAIL BUKU
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookByIdHandler,
  },

  //   UPDATE DATA BUKU
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBookByIdHandler,
  },
  //   HAPUS DATA BUKU
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookByIdHandler,
  },
];

module.exports = routes;
