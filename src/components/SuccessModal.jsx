function SuccessModal({ isOpen, message, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 flex flex-col items-center gap-4 animate-fade-in">

        {/* Success Icon */}
        <div className="bg-green-100 rounded-full p-4">
          <svg
            className="w-10 h-10 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Message */}
        <p className="text-gray-800 font-semibold text-lg text-center">
          {message}
        </p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-2 w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition"
        >
          OK
        </button>
      </div>
    </div>
  )
}

export default SuccessModal