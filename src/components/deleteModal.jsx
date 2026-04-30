import { useTranslation } from 'react-i18next'

function DeleteModal({ isOpen, onConfirm, onCancel, bookName }) {
  const { t } = useTranslation()

  
  if (!isOpen) return null

  return (
    
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      
      {/* Modal Box */}
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full mx-4">

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 rounded-full p-4">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
          {t('deleteBook')}
        </h3>

        {/* Message */}
        <p className="text-gray-500 text-center mb-2">
          {t('confirmDelete')}
        </p>

        {/* Book Name */}
        <p className="text-blue-600 font-semibold text-center capitalize mb-6">
          "{bookName}"
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          {/* Cancel Button */}
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-100 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-200 transition"
          >
            Cancel
          </button>

          {/* Confirm Delete Button */}
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition"
          >
            {t('delete')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal