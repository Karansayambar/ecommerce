import ProductProvider from "./context/context";
import MainComponent from "./layout/MainComponent";

function App() {
  return (
    <div className="w-screen">
      <ProductProvider>
        <MainComponent />
      </ProductProvider>
    </div>
  );
}

export default App;
