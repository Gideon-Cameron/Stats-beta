import React from 'react';
import { Link } from 'react-router-dom';

const statCategories = [
  {
    name: 'Strength',
    path: '/stats/strength',
    description: 'Test your raw power and muscular strength across 8 metrics.',
  },
  {
    name: 'Endurance',
    path: '/stats/endurance',
    description: 'Measure your cardiovascular and muscular endurance.',
  },
  {
    name: 'Speed',
    path: '/stats/speed',
    description: 'Test your sprinting, reflexes, and agility across 5 key metrics.',
    disabled: false, // ✅ Enabled
  },
  {
    name: 'Flexibility',
    path: '/stats/flexibility',
    description: 'Coming soon...',
    disabled: true,
  },
  {
    name: 'Skill',
    path: '/stats/skill',
    description: 'Coming soon...',
    disabled: true,
  },
  {
    name: 'Health',
    path: '/stats/health',
    description: 'Coming soon...',
    disabled: true,
  },
];

const StatsIndex: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-10">Select a Stat Category</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCategories.map(({ name, path, description, disabled }) => (
          <div
            key={name}
            className={`p-6 rounded-lg border shadow-sm transition-all ${
              disabled
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white hover:shadow-md'
            }`}
          >
            {disabled ? (
              <div>
                <h2 className="text-xl font-semibold mb-2">{name}</h2>
                <p className="text-sm">{description}</p>
              </div>
            ) : (
              <Link to={path} className="block">
                <h2 className="text-xl font-semibold mb-2 text-blue-700 hover:underline">{name}</h2>
                <p className="text-sm text-gray-700">{description}</p>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsIndex;
