import { useEffect, useState } from "react";
import { useProduct } from "../context/context";
import Cart from "../components/Cart";
import DotsLoader from "../components/DitLoader";

type ProductType = {
  id: number;
  title: string;
  img: string;
  description: string;
  price: number;
  quantity: number;
};

const Product = () => {
  // manage States on top of the component
  const { openCart, addToCart, cart, removeFromCart } = useProduct();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetched Products Data on  Initail Render
  async function fetchProductData() {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://ecommerce-vqay.vercel.app/api/product/"
      );
      const json = await response.json();
      if (!response.ok)
        throw new Error(json.response || "Failed to fetch products");
      setProducts(json.data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProductData();
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  if (isLoading) return <DotsLoader />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!products.length) return <p>No Products Found</p>;

  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 sm:px-6 md:px-8 lg:px-10 py-10 mt-16 w-full">
        {/* Conditional Rendering */}
        {/* Products Data */}
        {products.slice(start, end).map((item) => {
          const cartItem = cart.find((pd) => pd.id === item.id);
          return (
            <div
              key={item.id}
              className="rounded-lg shadow-md border border-gray-600 flex flex-col hover:scale-105 transition-transform duration-200"
            >
              <div className="w-full h-48 sm:h-56 md:h-60 flex items-center justify-center overflow-hidden rounded-t-md">
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col flex-1 p-4">
                <h3 className="font-semibold text-base sm:text-lg line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {item.description.split(" ").slice(1, 16).join(" ")}...
                </p>
                <div className="flex items-center justify-between mt-auto pt-4">
                  <span className="text-blue-600 font-bold text-lg">
                    ₹ {item.price}
                  </span>
                  <div>
                    {cartItem ? (
                      <div className="flex items-center gap-3 rounded-md px-3 py-1">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="px-2 py-1 text-lg font-bold text-gray-400 hover:text-red-500"
                        >
                          -
                        </button>
                        <span className="text-base">{cartItem.quantity}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="px-2 py-1 text-lg font-bold text-gray-400 hover:text-green-500"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm sm:text-base"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {openCart && <Cart />}
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
          >
            Prev
          </button>
        )}
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === idx + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {idx + 1}
          </button>
        ))}
        {currentPage < totalPages && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
