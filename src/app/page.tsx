"use client";

import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Shield,
  Star,
  Gamepad2,
  Zap,
  Coins,
  User,
  LogIn,
} from "lucide-react";

interface Game {
  id: number;
  name: string;
  image: string;
}

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  avatar: string;
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const App = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Simulate fetching games from backend
  useEffect(() => {
    const fetchGames = async () => {
      try {
        // In a real app, this would be: const response = await fetch('/api/games');
        // Mock data simulating backend response
        const mockGames: Game[] = [
          {
            id: 1,
            name: "PUBG Mobile",
            image: "https://placehold.co/300x200/0f172a/white?text=PUBG",
          },
          {
            id: 2,
            name: "Free Fire",
            image: "https://placehold.co/300x200/0f172a/white?text=Free+Fire",
          },
          {
            id: 3,
            name: "Mobile Legends",
            image: "https://placehold.co/300x200/0f172a/white?text=MLBB",
          },
          {
            id: 4,
            name: "Valorant",
            image: "https://placehold.co/300x200/0f172a/white?text=Valorant",
          },
          {
            id: 5,
            name: "Genshin Impact",
            image: "https://placehold.co/300x200/0f172a/white?text=Genshin",
          },
          {
            id: 6,
            name: "Honkai",
            image: "https://placehold.co/300x200/0f172a/white?text=Honkai",
          },
          {
            id: 7,
            name: "League of Legends",
            image: "https://placehold.co/300x200/0f172a/white?text=LoL",
          },
          {
            id: 8,
            name: "Call of Duty",
            image: "https://placehold.co/300x200/0f172a/white?text=COD",
          },
        ];
        setGames(mockGames);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        // In a real app, this would be: const response = await fetch('/api/reviews');
        // Mock data simulating backend response
        const mockReviews: Review[] = [
          {
            id: 1,
            name: "Alex Johnson",
            rating: 5,
            comment:
              "Fastest top-up service I've ever used! Got my diamonds in seconds.",
            avatar: "https://placehold.co/60x60/0f172a/white?text=AJ",
          },
          {
            id: 2,
            name: "Sarah Chen",
            rating: 5,
            comment:
              "Reliable and trustworthy. Never had any issues with my purchases.",
            avatar: "https://placehold.co/60x60/0f172a/white?text=SC",
          },
          {
            id: 3,
            name: "Mike Rodriguez",
            rating: 4,
            comment:
              "Great prices and excellent customer support when I needed help.",
            avatar: "https://placehold.co/60x60/0f172a/white?text=MR",
          },
          {
            id: 4,
            name: "Emma Wilson",
            rating: 5,
            comment:
              "Perfect service every time. Will definitely recommend to friends!",
            avatar: "https://placehold.co/60x60/0f172a/white?text=EW",
          },
        ];
        setReviews(mockReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchGames();
    fetchReviews();
  }, []);

  const handleLogin = () => {
    // In a real app, this would redirect to login page or open modal
    alert("Login functionality would redirect to authentication page");
    // Simulate login
    setIsLoggedIn(true);
  };

  const features: Feature[] = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "100% Secure",
      description: "Safe and verified transactions with instant delivery",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Delivery",
      description: "Top-ups delivered within seconds after payment",
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: "All Games Supported",
      description: "Wide selection of popular games and platforms",
    },
    {
      icon: <Coins className="w-8 h-8" />,
      title: "Best Prices",
      description: "Competitive rates with exclusive discounts",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading Danka Store...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-900 border-b border-blue-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">DS</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              DANKA STORE
            </span>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a
              href="#games"
              className="text-gray-300 hover:text-white font-medium"
            >
              Games
            </a>
            <a
              href="#features"
              className="text-gray-300 hover:text-white font-medium"
            >
              Features
            </a>
            <a
              href="#reviews"
              className="text-gray-300 hover:text-white font-medium"
            >
              Reviews
            </a>
            <a
              href="#contact"
              className="text-gray-300 hover:text-white font-medium"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <button className="flex items-center space-x-2 bg-slate-700 px-4 py-2 rounded-full hover:bg-slate-600 transition-colors">
                <User className="w-4 h-4" />
                <span>My Account</span>
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-black px-4 py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}
            <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-black px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
              <ShoppingCart className="w-4 h-4" />
              <span>Top Up</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                DANKA STORE
              </span>
            </h1>
            <p className="text-xl text-blue-200 mb-10 max-w-2xl mx-auto">
              The fastest, safest, and most affordable way to top up your
              favorite games. Get your in-game currency instantly!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-black px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300">
                Browse All Games ({games.length})
              </button>
              <button className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-500/20 transition-all duration-300">
                How It Works
              </button>
            </div>
          </div>

          <div className="mt-16 bg-slate-800 rounded-2xl shadow-xl p-6 max-w-4xl mx-auto border border-blue-800">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {games.slice(0, 4).map((game) => (
                <div
                  key={game.id}
                  className="flex flex-col items-center p-4 bg-slate-700 rounded-xl hover:shadow-md transition-shadow"
                >
                  <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mb-2">
                    <Gamepad2 className="w-8 h-8 text-orange-500" />
                  </div>
                  <span className="text-sm font-medium text-gray-200">
                    {game.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Danka Store?
            </h2>
            <p className="text-blue-200 max-w-2xl mx-auto">
              We provide the best experience for gamers worldwide with our
              premium top-up services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-700 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-blue-800"
              >
                <div className="w-14 h-14 bg-orange-500/20 rounded-xl flex items-center justify-center text-orange-500 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-blue-200">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Games Section */}
      <section id="games" className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Popular Games
            </h2>
            <p className="text-blue-200 max-w-2xl mx-auto">
              Top up your favorite games instantly with just a few clicks
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {games.map((game) => (
                <div
                  key={game.id}
                  className="bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-blue-800 group"
                >
                  <div className="aspect-video bg-slate-700 overflow-hidden">
                    <img
                      src={game.image}
                      alt={game.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white text-center">
                      {game.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-black px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300">
              View All Games
            </button>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16 bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Customer Reviews
            </h2>
            <p className="text-blue-200 max-w-2xl mx-auto">
              Join thousands of satisfied gamers who trust us for their top-up
              needs
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-slate-700 p-6 rounded-2xl shadow-sm border border-blue-800"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-white">
                        {review.name}
                      </h4>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? "fill-current" : ""
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-blue-200 italic">"{review.comment}"</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-slate-900 to-blue-950">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Level Up Your Gaming Experience?
          </h2>
          <p className="text-blue-200 text-xl mb-8 max-w-2xl mx-auto">
            Join over 500,000 gamers who have already topped up with us. Fast,
            secure, and affordable!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-black px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300">
              Start Topping Up Now
            </button>
            <button className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-500/20 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-blue-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-xl">DS</span>
                </div>
                <span className="text-xl font-bold">DANKA STORE</span>
              </div>
              <p className="text-blue-200">
                The premier destination for instant game top-ups worldwide.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Games</h3>
              <ul className="space-y-2 text-blue-200">
                {games.slice(0, 4).map((game) => (
                  <li key={game.id}>
                    <a href="#" className="hover:text-white">
                      {game.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-blue-200">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-blue-200">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
            <p>&copy; 2026 DANKA STORE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
