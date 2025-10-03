import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/context";

const Cart = () => {
  //Get Functionality from Context API
  const { toggleCart, cart, count, addToCart, removeFromCart, total } =
    useProduct();
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] md:w-[490px] bg-gray-600 p-3 z-50 shadow-lg">
      <div className="flex items-center justify-between p-6 border-b border-gray-500">
        <button className="text-2xl font-bold flex items-center gap-2">
          🛒 Cart <span>({count})</span>
        </button>
        <button
          onClick={() => toggleCart()}
          className="text-xl hover:text-red-400"
        >
          ✕
        </button>
      </div>

      <div className="h-[70%] overflow-y-auto p-4 space-y-4">
        {/* Conditionaly Render Data */}
        {cart &&
          cart.map((item) => {
            const cartItem = cart.find((pd) => pd.id === item.id);
            return (
              <div
                key={item.id}
                className="p-3 flex gap-3 bg-gray-700 rounded-lg shadow"
              >
                <img
                  src={item.img}
                  className="h-16 w-16 sm:h-20 sm:w-20 rounded-md object-cover"
                  alt={item.title}
                />
                <div className="flex items-center justify-between w-full">
                  <div>
                    <p className="text-sm sm:text-base font-medium">
                      {item.title}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-300">
                      {item.price.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}{" "}
                      × {item.quantity} ={" "}
                      {(item.quantity * item.price).toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </p>
                  </div>

                  {cartItem && (
                    <div className="flex items-center gap-3 px-3 bg-gray-800 rounded-lg text-lg sm:text-xl">
                      <p
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 cursor-pointer hover:text-red-400"
                      >
                        -
                      </p>
                      <span>{cartItem.quantity}</span>
                      <p
                        onClick={() => addToCart(item)}
                        className="p-1 cursor-pointer hover:text-green-400"
                      >
                        +
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>

      <div className="w-full flex flex-col p-6 border-t border-gray-500">
        {cart.length > 0 ? (
          <button
            className="w-full flex items-center justify-between bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-base sm:text-lg"
            onClick={() => {
              navigate("/checkout");
              toggleCart();
            }}
          >
            <span>Checkout</span>
            {total.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          </button>
        ) : (
          <p className="text-lg sm:text-2xl text-center">
            No Items Found in Cart
          </p>
        )}
      </div>
    </div>
  );
};

export default Cart;
