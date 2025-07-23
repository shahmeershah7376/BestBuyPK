import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

const products = [
  { id: 1, name: "Hanging Spoon", price: 499, image: "/spoon.jpg", description: "Premium quality spoon." },
  { id: 2, name: "Wireless Earbuds", price: 799, image: "/earbuds.jpg", description: "M10 earbuds with charging case." }
];

const Home = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="p-4">
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="w-full p-2 border rounded mb-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map(product => (
          <div key={product.id} onClick={() => navigate(`/product/${product.id}`)} className="cursor-pointer border p-4 rounded-xl shadow">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-xl" />
            <h2 className="font-bold mt-2">{product.name}</h2>
            <p className="text-orange-600 font-semibold">Rs. {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductDetails = ({ id }) => {
  const product = products.find(p => p.id === parseInt(id));
  const navigate = useNavigate();
  if (!product) return <div>Product not found</div>;
  return (
    <div className="p-4">
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded" />
      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <p className="text-orange-600 text-xl font-semibold">Rs. {product.price}</p>
      <p className="mt-2">{product.description}</p>
      <button onClick={() => navigate(`/buy/${product.id}`)} className="mt-4 w-full bg-orange-600 text-white p-2 rounded">Buy Now</button>
    </div>
  );
};

const BuyPage = ({ id }) => {
  const product = products.find(p => p.id === parseInt(id));
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully! Notification sent to admin.");
    setSubmitted(true);
  };
  if (!product) return <div>Product not found</div>;
  if (submitted) return <div className="p-4 text-green-600">Thank you for your order!</div>;
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Order - {product.name}</h2>
      <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
        <input required placeholder="Name" className="w-full p-2 border rounded" />
        <input required placeholder="Phone" className="w-full p-2 border rounded" />
        <input required placeholder="City" className="w-full p-2 border rounded" />
        <input required placeholder="Address" className="w-full p-2 border rounded" />
        <input placeholder="Landmark" className="w-full p-2 border rounded" />
        <div className="flex gap-4">
          <label><input type="radio" name="type" value="Home" defaultChecked /> Home</label>
          <label><input type="radio" name="type" value="Office" /> Office</label>
        </div>
        <button type="submit" className="w-full bg-orange-600 text-white p-2 rounded">Place Order</button>
      </form>
    </div>
  );
};

const AdminLogin = ({ onLogin }) => {
  const [pass, setPass] = useState("");
  const handleLogin = () => {
    if (pass === "admin123") onLogin(true);
    else alert("Wrong password");
  };
  return (
    <div className="p-4">
      <input type="password" onChange={e => setPass(e.target.value)} className="w-full p-2 border rounded" placeholder="Admin Password" />
      <button onClick={handleLogin} className="w-full mt-2 bg-blue-600 text-white p-2 rounded">Login</button>
    </div>
  );
};

const AdminPanel = () => (
  <div className="p-4">
    <h2 className="text-xl font-bold">Admin Panel</h2>
    <p>You can manage products here (feature coming soon).</p>
  </div>
);

function RouteWrapper({ Component }) {
  const id = window.location.pathname.split('/').pop();
  return <Component id={id} />;
}

function App() {
  const [admin, setAdmin] = useState(false);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<RouteWrapper Component={ProductDetails} />} />
        <Route path="/buy/:id" element={<RouteWrapper Component={BuyPage} />} />
        <Route path="/admin" element={admin ? <AdminPanel /> : <AdminLogin onLogin={setAdmin} />} />
      </Routes>
    </Router>
  );
}

export default App;
