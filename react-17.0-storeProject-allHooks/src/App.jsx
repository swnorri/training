import Header from "./components/Header";
import FoodTileContainer from "./components/FoodTileContainer.jsx";
import CartContextProvider from './utils/shopping-cart-context.jsx';

function App() {
  return (
    <>
      <div>
        <CartContextProvider>
          <Header />
          <FoodTileContainer />
        </CartContextProvider>
      </div>
    </>
  );
}
export default App;
