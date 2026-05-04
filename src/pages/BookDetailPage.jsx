import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import DeleteModal from '../components/DeleteModal'
import SuccessModal from '../components/SuccessModal'
import API from '../api/axios'

function BookDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await API.get(`/books/${id}`)
        setBook(response.data)
        setLoading(false)
      } catch {
        setError('Book not found or something went wrong.')
        setLoading(false)
      }
    }

    fetchBook()
  }, [id])

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true)
  }

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false)
  }

  const handleConfirmDelete = async () => {
    try {
      setDeleting(true)
      await API.delete(`/books/${id}`)
      setIsDeleteModalOpen(false)
      setBook(null)             // Clear book first to avoid crash when rendering
      setShowSuccessModal(true)
    } catch {
      setError('Failed to delete book. Please try again.')
      setDeleting(false)
      setIsDeleteModalOpen(false)
    }
  }

  const handleSuccessClose = () => {
    setShowSuccessModal(false)
    navigate('/')
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex justify-center items-center mt-40">
          <p className="text-gray-500 text-lg">Loading book...</p>
        </div>
      </div>
    )
  }

  // Error state
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

  // After delete, book is null — show only the success modal, skip book detail rendering
  if (showSuccessModal) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <SuccessModal
          isOpen={true}
          message="Book deleted successfully!"
          onClose={handleSuccessClose}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        bookName={book?.bookName || ''}
      />

      <div className="max-w-2xl mx-auto px-6 py-10">

        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Book Details</h2>
          <Link to="/" className="text-blue-600 hover:underline text-sm">
            ← Back to Home
          </Link>
        </div>

        {/* Book Detail Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">

          {/* Book Image */}
          <img
            src={book.image}
            alt={book.bookName}
            className="w-full h-64 object-contain bg-gray-100 p-6"
          />

          {/* Book Info */}
          <div className="p-6 flex flex-col gap-4">
            <h3 className="text-2xl font-bold text-gray-800 capitalize">
              {book.bookName}
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Price</p>
                <p className="text-xl font-bold text-blue-600">
                  GH₵ {book.price}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Count In Stock</p>
                <p className="text-xl font-bold text-green-600">
                  {book.countInStock}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Date Added</p>
                <p className="text-md font-semibold text-gray-700">
                  {new Date(book.dateCreated).toLocaleDateString()}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Book ID</p>
                <p className="text-sm font-semibold text-gray-700 truncate">
                  {book.id}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-2">
              <Link
                to={`/books/edit/${book.id}`}
                className="flex-1 text-center bg-yellow-400 text-white font-semibold py-2 rounded-lg hover:bg-yellow-500 transition"
              >
                Edit Book
              </Link>
              <button
                onClick={handleDeleteClick}
                disabled={deleting}
                className="flex-1 bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleting ? 'Deleting...' : 'Delete Book'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetailPage