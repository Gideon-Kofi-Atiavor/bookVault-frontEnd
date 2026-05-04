  import { useState, useEffect } from 'react'
  import { Link, useLocation } from 'react-router-dom'
  import { useTranslation } from 'react-i18next'
  import Navbar from '../components/Navbar'
  import DeleteModal from '../components/DeleteModal'
  import API from '../api/axios'

  function HomePage() {
    const { t } = useTranslation()
    const location = useLocation()
    const [books, setBooks] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [successMessage, setSuccessMessage] = useState(
      location.state?.message || ''
    )
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedBook, setSelectedBook] = useState(null)

    useEffect(() => {
      const fetchBooks = async () => {
        try {
          const response = await API.get('/books')
          setBooks(response.data)
          setLoading(false)
        } catch {
          setError(t('failedToFetch'))   
          setLoading(false)
        }
      }
      fetchBooks()
    }, [t])

    useEffect(() => {
      if (successMessage) {
        const timer = setTimeout(() => setSuccessMessage(''), 3000)
        return () => clearTimeout(timer)
      }
    }, [successMessage])

    const handleDeleteClick = (book) => {
      setSelectedBook(book)
      setIsModalOpen(true)
    }

    const handleCancel = () => {
      setIsModalOpen(false)
      setSelectedBook(null)
    }

    const handleConfirmDelete = async () => {
      try {
        await API.delete(`/books/${selectedBook.id}`)  
        setBooks(books.filter(book => book.id !== selectedBook.id))
        setSuccessMessage(t('bookDeletedSuccess'))
        setIsModalOpen(false)
        setSelectedBook(null)
      } catch {
        setError(t('somethingWentWrong'))  
        setIsModalOpen(false)
      }
    }

    const filteredBooks = books.filter(book =>
      book.bookName.toLowerCase().includes(search.toLowerCase())
    )

    if (loading) {
      return (
        <div className="min-h-screen bg-gray-100">
          <navbar />
          <div className="flex justify-center items-center mt-40">
            <p className="text-gray-500 text-lg">{t('loadingBooks')}</p>
          </div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <div className="flex justify-center items-center mt-40">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        {/* Delete Modal */}
        <DeleteModal
          isOpen={isModalOpen}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancel}
          bookName={selectedBook?.bookName || ''}
        />

        <div className="max-w-7xl mx-auto px-6 py-8">

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border border-green-300 rounded-lg p-4 mb-6 flex justify-between items-center">
              <p className="text-green-600 font-semibold"> {successMessage}</p>
              <button
                onClick={() => setSuccessMessage('')}
                className="text-green-400 hover:text-green-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>
          )}

          {/* Page Title and Search */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {t('allBooks')}
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({filteredBooks.length} {t('books')})
              </span>
            </h2>
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Book Cards */}
          {filteredBooks.length === 0 ? (
            <div className="text-center text-gray-500 mt-20 text-lg">
              {t('noBooksFound')}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredBooks.map(book => (
                  console.log('Rendering book:', book),  
                <div
                  key={book.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
                >
                  <img
                    src={book.image}
                    alt={book.bookName}
                    className="w-full h-48 object-contain bg-gray-100 p-4"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 capitalize mb-1">
                      {book.bookName}
                    </h3>
                    <p className="text-blue-600 font-bold mb-1">
                      GH₵ {book.price}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      {t('inStock')}: {book.countInStock}
                    </p>
                    <div className="flex justify-between gap-2">
                      <Link
                        to={`/books/${book.id}`}
                        className="flex-1 text-center bg-blue-600 text-white text-sm py-1.5 rounded-lg hover:bg-blue-700 transition"
                      >
                        {t('view')}
                      </Link>
                      <Link
                        to={`/books/edit/${book.id}`}
                        className="flex-1 text-center bg-yellow-400 text-white text-sm py-1.5 rounded-lg hover:bg-yellow-500 transition"
                      >
                        {t('edit')}
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(book)}
                        className="flex-1 text-center bg-red-500 text-white text-sm py-1.5 rounded-lg hover:bg-red-600 transition"
                      >
                        {t('delete')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  export default HomePage