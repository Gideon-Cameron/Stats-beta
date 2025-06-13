import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StrengthStatPage from './pages/stats/strength';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white text-gray-900">
        <nav className="bg-blue-600 text-white px-6 py-4 shadow">
          <div className="flex justify-between items-center max-w-5xl mx-auto">
            <h1 className="text-xl font-bold">
              <Link to="/">Stat Tracker</Link>
            </h1>
            <div className="space-x-4">
              <Link to="/stats/strength" className="hover:underline">
                Strength
              </Link>
              {/* Future nav items */}
            </div>
          </div>
        </nav>

        <main className="py-6 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats/strength" element={<StrengthStatPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

const Home: React.FC = () => (
  <div className="max-w-2xl mx-auto text-center mt-10">
    <h2 className="text-3xl font-bold mb-4">Welcome to Stat Tracker</h2>
    <p className="text-gray-700">Start by checking your strength stats.</p>
    <Link
      to="/stats/strength"
      className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Go to Strength Assessment
    </Link>
  </div>
);

export default App;
