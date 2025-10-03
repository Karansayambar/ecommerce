import { useState } from "react";
import { useProduct } from "../context/context";
import Cart from "../components/Cart";
import { useNavigate } from "react-router-dom";
import DotsLoader from "../components/DitLoader";

// User Data Types
type userInfoType = {
  firstName: string;
  lastName: string;
  address: string;
};

const Checkout = () => {
  //Get Functionality from Context API
  const { cart, openCart, addToCart, removeFromCart, total, resetCart } =
    useProduct();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initial Form Data
  const initialValue: userInfoType = {
    firstName: "",
    lastName: "",
    address: "",
  };
  const [formData, setFormData] = useState<userInfoType>(initialValue);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //Make a Order
  async function makeOrder(userInfo: userInfoType) {
    try {
      setIsLoading(true);
      setIsError(null);
      const response = await fetch(
        "https://ecommerce-vqay.vercel.app/api/order/take-order",
        // "http://localhost:5000/api/order/take-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart, userInfo, total }),
        }
      );
      const data = await response.json();
      console.log("Order Data from Backend", data);
      if (!response.ok) throw new Error(data.message || "Something went wrong");
      return data;
    } catch (error: any) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  //Reset The Cart and Redirect to Product Page
  function resetCartData() {
    setTimeout(() => {
      resetCart();
      navigate("/");
    }, 2000);
  }

  // Submit Order Data To Backend
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const result = await makeOrder(formData);
      if (result) {
        setMessage(result.message);
        setFormData(initialValue);
        await resetCartData();
      }
    } catch (error: any) {
      console.log(error.message);
      setIsError(error.message);
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl mx-auto bg-gray-700 h-[90%] p-4 sm:p-6 rounded-md mt-4 sm:mt-10">
      {/* Cart Section */}
      <div className="w-full lg:w-1/2 bg-gray-800 rounded-xl shadow-md flex flex-col">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-600">
          <p className="text-lg sm:text-2xl font-bold text-white">
            🛒 Cart Items
          </p>
          <p
            onClick={() => navigate("/")}
            className="text-xs sm:text-sm text-blue-400 cursor-pointer"
          >
            Back to products
          </p>
        </div>

        <div className="p-4 space-y-4 flex-1 overflow-y-auto max-h-[400px] sm:max-h-[500px]">
          {cart.length > 0 ? (
            cart.map((item) => {
              const cartItem = cart.find((pd) => pd.id === item.id);
              return (
                <div
                  key={item.id}
                  className="p-3 flex gap-3 sm:gap-4 bg-gray-700 rounded-lg"
                >
                  <img
                    src={item.img}
                    className="h-16 w-16 sm:h-20 sm:w-20 rounded-md object-cover"
                    alt={item.title}
                  />
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <p className="text-sm sm:text-lg font-medium">
                        {item.title}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-300">
                        {item.price.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}{" "}
                        x {item.quantity} ={" "}
                        {(item.quantity * item.price).toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </p>
                    </div>
                    {cartItem && (
                      <div className="flex items-center gap-3 sm:gap-4 px-2 sm:px-3 bg-gray-900 rounded-lg text-sm sm:text-lg">
                        <p
                          onClick={() => removeFromCart(item.id)}
                          className="px-2 cursor-pointer hover:text-red-400"
                        >
                          -
                        </p>
                        <span>{cartItem.quantity}</span>
                        <p
                          onClick={() => addToCart(item)}
                          className="px-2 cursor-pointer hover:text-green-400"
                        >
                          +
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="mt-10 text-center text-sm sm:text-lg">
              No Items Found In Cart
            </p>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 border-t border-gray-600">
            <button className="w-full flex items-center justify-between bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium">
              <span>Total Amount</span>
              {total.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </button>
          </div>
        )}
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 bg-gray-800 rounded-xl shadow-md p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <h2 className="text-lg sm:text-2xl font-semibold text-white mb-4">
            User Details
          </h2>
          <div className="flex flex-col">
            <label className="mb-1 text-xs sm:text-base font-medium text-white">
              First Name
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              name="firstName"
              placeholder="Enter first name"
              className="px-3 py-2 sm:py-3 border border-gray-400 rounded-lg bg-gray-900 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-xs sm:text-base font-medium text-white">
              Last Name
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              name="lastName"
              placeholder="Enter last name"
              className="px-3 py-2 sm:py-3 border border-gray-400 rounded-lg bg-gray-900 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-xs sm:text-base font-medium text-white">
              Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={handleChange}
              name="address"
              placeholder="Enter address"
              className="px-3 py-2 sm:py-3 border border-gray-400 rounded-lg bg-gray-900 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-2 sm:py-3 rounded-lg font-medium transition disabled:opacity-50 text-sm sm:text-base"
          >
            {isLoading ? <DotsLoader /> : "Confirm Order"}
          </button>
          {message && (
            <p className="text-green-400 font-medium text-center text-sm sm:text-lg">
              {message}
            </p>
          )}
          {isError && (
            <p className="text-red-400 font-medium text-center text-sm sm:text-lg">
              {isError}
            </p>
          )}
        </form>
      </div>

      {openCart && <Cart />}
    </div>
  );
};

export default Checkout;
