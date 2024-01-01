import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css'; // Custom Bootstrap theme
import 'bootstrap/dist/css/bootstrap.min.css'; // Main Bootstrap CSS
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { CartProvider } from './components/ContextReducer.js';
import Cart from './screens/Cart'; // Import the Cart component
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/cart" element={<Cart />} /> {/* Add this line for the Cart route */}
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
