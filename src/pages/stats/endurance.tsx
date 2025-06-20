import React, { useEffect, useState } from 'react';
import EnduranceInput, { EnduranceFormData } from '../../components/statInputs/EnduranceInput';
import { calculateEnduranceRank } from '../../utils/calculateEnduranceRank';
import { calculateAverageStrengthRank } from '../../utils/calculateAverageStrength';
import { EnduranceTest } from '../../data/enduranceRankThresholds';
import { Rank } from '../../types/Rank';
import RadarChart from '../../components/RadarChart';
import { useAuth } from '../../context/AuthContext';
import { saveUserStats } from '../../utils/saveUserStats';
import { loadUserStats } from '../../utils/loadUserStats';

const EnduranceStatPage: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<EnduranceFormData | null>(null);
  const [result, setResult] = useState<Record<EnduranceTest, Rank> | null>(null);
  const [average, setAverage] = useState<{
    averageScore: number;
    globalRank: Rank;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const saved = await loadUserStats<EnduranceFormData & { averageScore: number; globalRank: Rank }>(
        user,
        'endurance'
      );
      if (saved) {
        const { averageScore, globalRank, ...inputs } = saved;
        setFormData(inputs);
        const ranks: Record<EnduranceTest, Rank> = {
          run1_5Mile: calculateEnduranceRank('run1_5Mile', Number(inputs.run1_5Mile)),
          plankHold: calculateEnduranceRank('plankHold', Number(inputs.plankHold)),
          pushUps: calculateEnduranceRank('pushUps', Number(inputs.pushUps)),
          jumpRope: calculateEnduranceRank('jumpRope', Number(inputs.jumpRope)),
          wallSit: calculateEnduranceRank('wallSit', Number(inputs.wallSit)),
          runMaxDistance: calculateEnduranceRank('runMaxDistance', Number(inputs.runMaxDistance)),
        };
        setResult(ranks);
        setAverage({ averageScore, globalRank });
      }
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const handleSubmit = async (data: EnduranceFormData) => {
    const ranks: Record<EnduranceTest, Rank> = {
      run1_5Mile: calculateEnduranceRank('run1_5Mile', Number(data.run1_5Mile)),
      plankHold: calculateEnduranceRank('plankHold', Number(data.plankHold)),
      pushUps: calculateEnduranceRank('pushUps', Number(data.pushUps)),
      jumpRope: calculateEnduranceRank('jumpRope', Number(data.jumpRope)),
      wallSit: calculateEnduranceRank('wallSit', Number(data.wallSit)),
      runMaxDistance: calculateEnduranceRank('runMaxDistance', Number(data.runMaxDistance)),
    };

    const averageResult = calculateAverageStrengthRank(Object.values(ranks));
    setFormData(data);
    setResult(ranks);
    setAverage(averageResult);

    if (user) {
      await saveUserStats(user, 'endurance', {
        ...data,
        averageScore: averageResult.averageScore,
        globalRank: averageResult.globalRank,
      });
    }
  };

  if (loading) return <p className="text-center mt-10">Loading saved data...</p>;

  return (
    <div className="py-10 px-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Endurance Stat Assessment</h1>
      <EnduranceInput onSubmit={handleSubmit} initialData={formData ?? undefined} />

      {result && (
        <div className="mt-10 bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Endurance Ranks</h2>
          <RadarChart data={result} />
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mt-6">
            {Object.entries(result).map(([test, rank]) => (
              <li key={test} className="flex justify-between items-center border-b py-2">
                <span className="capitalize whitespace-nowrap">
                  {test.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ')}
                </span>
                <span className="font-bold text-blue-700 whitespace-nowrap ml-4">{rank}</span>
              </li>
            ))}
          </ul>

          {average && (
            <div className="mt-6 text-center">
              <p className="text-lg">
                <span className="font-semibold">Average Endurance Score:</span> {average.averageScore}
              </p>
              <p className="text-xl mt-1">
                <span className="font-bold text-blue-800">Global Rank:</span> {average.globalRank}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EnduranceStatPage;
