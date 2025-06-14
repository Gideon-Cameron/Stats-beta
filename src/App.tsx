import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StrengthStatPage from './pages/stats/strength';
import EnduranceStatPage from './pages/stats/endurance';
import StatsIndex from './pages/stats/index';

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
              <Link to="/stats" className="hover:underline">
                All Stats
              </Link>
              <Link to="/stats/strength" className="hover:underline">
                Strength
              </Link>
              <Link to="/stats/endurance" className="hover:underline">
                Endurance
              </Link>
            </div>
          </div>
        </nav>

        <main className="py-6 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<StatsIndex />} />
            <Route path="/stats/strength" element={<StrengthStatPage />} />
            <Route path="/stats/endurance" element={<EnduranceStatPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

const Home: React.FC = () => (
  <div className="max-w-2xl mx-auto text-center mt-10">
    <h2 className="text-3xl font-bold mb-4">Welcome to Stat Tracker</h2>
    <p className="text-gray-700">Measure your fitness across global standards.</p>
    <Link
      to="/stats"
      className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      View All Stat Categories
    </Link>
  </div>
);

export default App;
