import Checkout from "../pages/Checkout";
import Header from "../components/Header";
import Product from "../pages/Product";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const MainComponent = () => {
  return (
    <div className="w-screen flex items-center justify-center">
      <Header />

      {/* Routing */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default MainComponent;
