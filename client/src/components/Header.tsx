import { useProduct } from "../context/context";

const Header = () => {
  const { toggleCart, count } = useProduct();

  return (
    <div className="flex items-center justify-between w-full bg-gray-600 px-6 sm:px-12 py-4 fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="flex items-center gap-3">
        <p className="text-xl sm:text-2xl font-bold uppercase cursor-pointer">
          🛍️ Ecommerce
        </p>
      </div>

      <div className="hidden md:flex items-center gap-6 text-white text-lg">
        <p className="hover:text-white cursor-pointer">Home</p>
        <p className="hover:text-white cursor-pointer">Products</p>
        <p className="hover:text-white cursor-pointer">About</p>
        <p className="hover:text-white cursor-pointer">Contact</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-2 text-md rounded-lg text-gray-100 focus:outline-none"
          />
        </div>

        <button
          className="relative text-xl sm:text-2xl flex items-center gap-2"
          onClick={() => toggleCart()}
        >
          🛒 Cart
          {count > 0 && (
            <span className="absolute -top-2 -right-3 text-sm font-semibold bg-red-500 text-white rounded-full px-2 py-0.5">
              {count}
            </span>
          )}
        </button>

        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
          👤 Profile
        </button>
      </div>
    </div>
  );
};

export default Header;
