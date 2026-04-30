import { Routes, Route } from 'react-router-dom'
import './i18n'


import HomePage from './pages/HomePage'
import AddBookPage from './pages/AddBookPage'
import BookDetailPage from './pages/BookDetailPage'
import EditBookPage from './pages/EditBookPage'




function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/books/add' element={<AddBookPage />} />
      <Route path='/books/:id' element={<BookDetailPage />} />
      <Route path='/books/edit/:id' element={<EditBookPage />} />
    </Routes>
  )
}

export default App