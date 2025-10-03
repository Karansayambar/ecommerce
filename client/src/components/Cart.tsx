import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/context";

const Cart = () => {
  const { toggleCart, cart, count, addToCart, removeFromCart, total } =
    useProduct();
  const navigate = useNavigate();
  return (
    <div className="w-[490px] absolute top-0 right-0 h-full bg-gray-600 p-3 z-100">
      <div className="flex items-center justify-between p-10">
        <div>
          <button className=" text-3xl w-full flex items-center gap-2">
            🛒 Cart <p>{count && count}</p>
          </button>
        </div>
        <button onClick={() => toggleCart()}>X</button>
      </div>
      <div>
        {cart &&
          cart.map((item) => {
            const cartItem = cart.find((pd) => pd.id === item.id);
            return (
              <div className="p-3 flex gap-3">
                <img src={item.img} className="h-20 w-20" />
                <div className="flex items-center justify-between w-full">
                  <div>
                    <p>{item.title}</p>
                    <p>
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
                    <div className="flex items-center gap-4 px-3 bg-gray-800 rounded-lg text-xl">
                      <p
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 cursor-pointer"
                      >
                        -
                      </p>
                      <span>{cartItem.quantity}</span>
                      <p
                        onClick={() => addToCart(item)}
                        className="p-2 cursor-pointer"
                      >
                        +
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        <div className="w-full flex items-center flex-col  p-6">
          {cart.length > 0 ? (
            <button
              className="w-full flex items-center justify-center gap-10"
              onClick={() => {
                navigate("/checkout");
                toggleCart();
              }}
            >
              <p className="text-xl">checkout</p>
              {total.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </button>
          ) : (
            <p className="text-2xl">No Items Found in Cart</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
