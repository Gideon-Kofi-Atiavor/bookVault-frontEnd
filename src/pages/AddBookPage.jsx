import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import SuccessModal from '../components/SuccessModal'
import API from '../api/axios'

function AddBookPage() {
  const navigate = useNavigate()
  // const { t } = useTranslation()

  const [formData, setFormData] = useState({
    bookName: '',
    price: '',
    countInStock: '',
    image: ''
  })
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors([])

    try {
      await API.post('/books', formData)
      setLoading(false)
      setShowSuccessModal(true)  
    } catch (error) {
      setLoading(false)
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors)
      } else {
        setErrors([{ msg: 'Something went wrong. Please try again.' }])
      }
    }
  }

  const handleSuccessClose = () => {
    setShowSuccessModal(false)
    navigate('/')  
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        message="New Book Added Successfully!"
        onClose={handleSuccessClose}
      />

      <div className="max-w-2xl mx-auto px-6 py-10">

        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Book</h2>
          <Link to="/" className="text-blue-600 hover:underline text-sm">
            ← Back to Home
          </Link>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-md p-8">

          {/* Error Messages */}
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-300 rounded-lg p-4 mb-6">
              <p className="text-red-600 font-semibold mb-2">
                Please fix the following errors:
              </p>
              <ul className="list-disc list-inside">
                {errors.map((error, index) => (
                  <li key={index} className="text-red-500 text-sm">
                    {error.msg}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            {/* Book Name */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">
                Book Name
              </label>
              <input
                type="text"
                name="bookName"
                value={formData.bookName}
                onChange={handleChange}
                placeholder="Enter book name"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Price */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">
                Price (GH₵)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Count In Stock */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">
                Count In Stock
              </label>
              <input
                type="number"
                name="countInStock"
                value={formData.countInStock}
                onChange={handleChange}
                placeholder="Enter stock count"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Image URL */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Enter image URL"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="mt-2 h-40 w-full object-contain rounded-lg border border-gray-200"
                />
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Adding Book...' : 'Add Book'}
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default AddBookPage