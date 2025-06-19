import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StrengthStatPage from './pages/stats/strength';
import EnduranceStatPage from './pages/stats/endurance';
import SpeedStatPage from './pages/stats/speed';
import SkillStatPage from './pages/stats/skill';
import FlexibilityStatPage from './pages/stats/flexibility'; // ✅ NEW IMPORT
import StatsIndex from './pages/stats/index';
import LoginPage from './pages/Login';
import { useAuth } from './context/AuthContext';

const App: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-white text-gray-900">
        <nav className="bg-blue-600 text-white px-6 py-4 shadow">
          <div className="flex justify-between items-center max-w-5xl mx-auto">
            <h1 className="text-xl font-bold">
              <Link to="/">Stat Tracker</Link>
            </h1>
            <div className="space-x-4 flex items-center">
              <Link to="/stats" className="hover:underline">All Stats</Link>
              <Link to="/stats/strength" className="hover:underline">Strength</Link>
              <Link to="/stats/endurance" className="hover:underline">Endurance</Link>
              <Link to="/stats/speed" className="hover:underline">Speed</Link>
              <Link to="/stats/skill" className="hover:underline">Skill</Link>
              <Link to="/stats/flexibility" className="hover:underline">Flexibility</Link> {/* ✅ NEW LINK */}
              {user ? (
                <>
                  <span className="text-sm hidden sm:inline">Hello, {user.email}</span>
                  <button onClick={logout} className="text-sm underline ml-2 hover:text-red-300">Logout</button>
                </>
              ) : (
                <Link to="/login" className="hover:underline">Login</Link>
              )}
            </div>
          </div>
        </nav>

        <main className="py-6 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/stats" element={<StatsIndex />} />
            <Route path="/stats/strength" element={<StrengthStatPage />} />
            <Route path="/stats/endurance" element={<EnduranceStatPage />} />
            <Route path="/stats/speed" element={<SpeedStatPage />} />
            <Route path="/stats/skill" element={<SkillStatPage />} />
            <Route path="/stats/flexibility" element={<FlexibilityStatPage />} /> {/* ✅ NEW ROUTE */}
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
