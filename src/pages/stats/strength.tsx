import React, { useEffect, useState } from 'react';
import StrengthInput, { StrengthFormData } from '../../components/statInputs/StrengthInput';
import { calculateStrengthRank } from '../../utils/calculateStrengthRank';
import { calculateAverageStrengthRank } from '../../utils/calculateAverageStrength';
import { StrengthTest } from '../../data/strengthRankThresholds';
import { Rank } from '../../types/Rank';
import RadarChart from '../../components/RadarChart';
import { useAuth } from '../../context/AuthContext';
import { saveUserStats } from '../../utils/saveUserStats';
import { loadUserStats } from '../../utils/loadUserStats';
import { loadStatHistory } from '../../utils/loadStatHistory';

type Snapshot = {
  data: StrengthFormData & { averageScore: number; globalRank: Rank };
  timestamp: number;
};

const StrengthStatPage: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<StrengthFormData | null>(null);
  const [history, setHistory] = useState<Snapshot[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const [current, past] = await Promise.all([
        loadUserStats<StrengthFormData & { averageScore: number; globalRank: Rank }>(user, 'strength'),
        loadStatHistory<StrengthFormData & { averageScore: number; globalRank: Rank }>(user, 'strength'),
      ]);

      const snapshots: Snapshot[] = [];

      if (current) {
        const { ...inputs } = current;
        setFormData(inputs);

        snapshots.push({
          data: current,
          timestamp: Date.now(), // "Now"
        });
      }

      past.forEach((entry) => {
        snapshots.push({
          data: entry,
          timestamp: entry.timestamp as unknown as number,
        });
      });

      setHistory(snapshots);
      setSelectedIndex(0);
      setLoading(false);
    };

    fetchData();
  }, [user]);

  const handleSubmit = async (data: StrengthFormData) => {
    const ranks: Record<StrengthTest, Rank> = {
      benchPress: calculateStrengthRank('benchPress', Number(data.benchPress)),
      squat: calculateStrengthRank('squat', Number(data.squat)),
      deadlift: calculateStrengthRank('deadlift', Number(data.deadlift)),
      overheadPress: calculateStrengthRank('overheadPress', Number(data.overheadPress)),
      pullUps: calculateStrengthRank('pullUps', Number(data.pullUps)),
      pushUps: calculateStrengthRank('pushUps', Number(data.pushUps)),
      barHang: calculateStrengthRank('barHang', Number(data.barHang)),
      plankHold: calculateStrengthRank('plankHold', Number(data.plankHold)),
    };

    const averageResult = calculateAverageStrengthRank(Object.values(ranks));
    setFormData(data);

    if (user) {
      await saveUserStats(user, 'strength', {
        ...data,
        averageScore: averageResult.averageScore,
        globalRank: averageResult.globalRank,
      });
    }
  };

  if (loading) return <p className="text-center mt-10">Loading saved data...</p>;

  const current = history[selectedIndex];

  return (
    <div className="py-10 px-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Strength Stat Assessment</h1>
      <StrengthInput onSubmit={handleSubmit} initialData={formData ?? undefined} />

      {current && (
        <div className="mt-10 bg-gray-100 p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Snapshot</h2>
            <div className="text-sm text-gray-500">
              {selectedIndex > 0 && (
                <button
                  onClick={() => setSelectedIndex((i) => Math.min(history.length - 1, i + 1))}
                  className="mr-3 text-blue-600 hover:underline"
                >
                  ◀ Previous
                </button>
              )}
              <span>{new Date(current.timestamp).toLocaleDateString()}</span>
              {selectedIndex < history.length - 1 && (
                <button
                  onClick={() => setSelectedIndex((i) => Math.max(0, i - 1))}
                  className="ml-3 text-blue-600 hover:underline"
                >
                  Next ▶
                </button>
              )}
            </div>
          </div>

          <RadarChart
            data={{
              benchPress: calculateStrengthRank('benchPress', Number(current.data.benchPress)),
              squat: calculateStrengthRank('squat', Number(current.data.squat)),
              deadlift: calculateStrengthRank('deadlift', Number(current.data.deadlift)),
              overheadPress: calculateStrengthRank('overheadPress', Number(current.data.overheadPress)),
              pullUps: calculateStrengthRank('pullUps', Number(current.data.pullUps)),
              pushUps: calculateStrengthRank('pushUps', Number(current.data.pushUps)),
              barHang: calculateStrengthRank('barHang', Number(current.data.barHang)),
              plankHold: calculateStrengthRank('plankHold', Number(current.data.plankHold)),
            }}
          />

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mt-6">
            {Object.entries(current.data).map(([key, val]) =>
              ['averageScore', 'globalRank'].includes(key) ? null : (
                <li key={key} className="flex justify-between items-center border-b py-2">
                  <span className="capitalize whitespace-nowrap">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <span className="font-bold text-blue-700 whitespace-nowrap ml-4">{val}</span>
                </li>
              )
            )}
          </ul>

          <div className="mt-6 text-center">
            <p className="text-lg">
              <span className="font-semibold">Average Strength Score:</span>{' '}
              {current.data.averageScore}
            </p>
            <p className="text-xl mt-1">
              <span className="font-bold text-blue-800">Global Rank:</span>{' '}
              {current.data.globalRank}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StrengthStatPage;
