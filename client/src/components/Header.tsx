import { useProduct } from "../context/context";

const Header = () => {
  const { toggleCart, count } = useProduct();

  return (
    <header className="w-full bg-gray-600 fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 sm:px-12 py-4">
        <div className="flex items-center">
          <p className="text-xl sm:text-2xl font-bold cursor-pointer text-white">
            e-commerce 🛍️
          </p>
        </div>
        <nav className="hidden lg:flex items-center gap-6 text-white text-lg">
          <p className="hover:text-blue-300 cursor-pointer">Home</p>
          <p className="hover:text-blue-300 cursor-pointer">Products</p>
          <p className="hover:text-blue-300 cursor-pointer">About</p>
          <p className="hover:text-blue-300 cursor-pointer">Contact</p>
        </nav>
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden lg:flex">
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-2 text-sm sm:text-base rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            className="relative text-base sm:text-lg md:text-xl flex items-center gap-2 text-white"
            onClick={() => toggleCart()}
          >
            🛒 Cart
            {count > 0 && (
              <span className="absolute -top-2 -right-3 text-xs sm:text-sm font-semibold bg-red-500 text-white rounded-full px-2 py-0.5">
                {count}
              </span>
            )}
          </button>
          <button className="hidden sm:flex bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 text-sm sm:text-base">
            👤 Profile
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
