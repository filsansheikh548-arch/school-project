import React, { useState } from 'react';
import { Heart, ShoppingCart, Star, Search, Menu, X } from 'lucide-react';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const categories = [
    { id: 'all', name: 'All Products', icon: '💄' },
    { id: 'makeup', name: 'Makeup', icon: '💋' },
    { id: 'skincare', name: 'Skincare', icon: '✨' },
    { id: 'fragrance', name: 'Fragrance', icon: '🌸' },
    { id: 'haircare', name: 'Hair Care', icon: '💇‍♀️' }
  ];

  const products = [
    {
      id: 1,
      name: 'Radiant Glow Foundation',
      category: 'makeup',
      price: 45.99,
      originalPrice: 59.99,
      rating: 4.8,
      reviews: 1234,
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop',
      description: 'Full coverage foundation with a natural, radiant finish',
      tag: 'Bestseller'
    },
    {
      id: 2,
      name: 'Hydrating Face Serum',
      category: 'skincare',
      price: 32.50,
      originalPrice: 42.50,
      rating: 4.9,
      reviews: 892,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=300&fit=crop',
      description: 'Vitamin C serum for glowing, youthful skin',
      tag: 'New'
    },
    {
      id: 3,
      name: 'Velvet Matte Lipstick',
      category: 'makeup',
      price: 24.99,
      originalPrice: 29.99,
      rating: 4.7,
      reviews: 567,
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=300&fit=crop',
      description: 'Long-lasting matte lipstick in rich, vibrant colors',
      tag: 'Limited Edition'
    },
    {
      id: 4,
      name: 'Enchanted Rose Perfume',
      category: 'fragrance',
      price: 89.99,
      originalPrice: 120.00,
      rating: 4.6,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop',
      description: 'Elegant floral fragrance with notes of rose and jasmine',
      tag: 'Premium'
    },
    {
      id: 5,
      name: 'Nourishing Hair Mask',
      category: 'haircare',
      price: 28.75,
      originalPrice: 35.00,
      rating: 4.5,
      reviews: 445,
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop',
      description: 'Deep conditioning treatment for silky, healthy hair',
      tag: 'Sale'
    },
    {
      id: 6,
      name: 'Glowing Eye Palette',
      category: 'makeup',
      price: 52.00,
      originalPrice: 65.00,
      rating: 4.8,
      reviews: 789,
      image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&h=300&fit=crop',
      description: '12 stunning shades for every occasion',
      tag: 'Trending'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                ✨ Glamify
              </h1>
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                      : 'hover:bg-pink-100 text-gray-700'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </nav>

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowCart(!showCart)}
                className="relative p-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:shadow-lg transition-all duration-300"
              >
                <ShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-4 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for beauty products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-white border-t border-pink-100">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setShowMobileMenu(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                      : 'hover:bg-pink-50 text-gray-700'
                  }`}
                >
                  <span className="text-xl">{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 animate-pulse">
            Discover Your Beauty
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Premium beauty products for the modern woman
          </p>
          <button className="px-8 py-4 bg-white text-purple-600 font-bold rounded-full hover:bg-gray-100 transition-colors transform hover:scale-105 duration-300 shadow-xl">
            Shop Now ✨
          </button>
        </div>
      </section>

      {/* Products Grid */}
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-gray-800">
            {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.id === selectedCategory)?.name}
            <span className="ml-2 text-sm text-gray-500">({filteredProducts.length} items)</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold rounded-full">
                    {product.tag}
                  </span>
                </div>
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  <Heart
                    size={20}
                    className={favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}
                  />
                </button>
              </div>
              
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                  {product.name}
                </h4>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-purple-600">${product.price}</span>
                    <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </div>
                
                <button
                  onClick={() => addToCart(product)}
                  className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart size={20} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Shopping Cart</h3>
                <button
                  onClick={() => setShowCart(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-purple-600 font-bold">${item.price}</p>
                          <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-bold">Total:</span>
                      <span className="text-2xl font-bold text-purple-600">${cartTotal.toFixed(2)}</span>
                    </div>
                    <button className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300">
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            ✨ Glamify
          </h3>
          <p className="text-gray-400 mb-6">Your beauty journey starts here</p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <button className="hover:text-pink-400 transition-colors">About</button>
            <button className="hover:text-pink-400 transition-colors">Contact</button>
            <button className="hover:text-pink-400 transition-colors">Privacy</button>
            <button className="hover:text-pink-400 transition-colors">Terms</button>
          </div>
          <p className="text-xs text-gray-500 mt-6">© 2025 Glamify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;