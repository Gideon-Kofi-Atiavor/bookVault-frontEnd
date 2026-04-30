import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Navbar() {
  const { t, i18n } = useTranslation();

  // Function to switch language
  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
    // Optional: Force RTL/LTR for Arabic/English
    document.body.dir = e.target.value === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold tracking-wide">
        {t('appName')}
      </Link>

      <div className="flex items-center gap-4">
        {/* Language Selector Dropdown */}
        <select
          onChange={changeLanguage}
          value={i18n.language}
          className="bg-blue-800 text-white border border-blue-500 text-sm rounded-lg px-2 py-1 outline-none cursor-pointer hover:bg-blue-900 transition"
        >
          <option value="en">English 🇬🇧</option>
          <option value="ee">Ewe 🇬🇭</option>
          <option value="ar">العربية 🇸🇦</option>
          <option value="de">Deutsch 🇩🇪</option>
          <option value="es">Español 🇪🇸</option>
          <option value="it">Italiano 🇮🇹</option>
        </select>

        <Link
          to="/books/add"
          className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-blue-100 transition"
        >
          {t('addBook')}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;