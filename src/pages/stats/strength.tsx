import React, { useState } from 'react';
import StrengthInput, { StrengthFormData } from '../../components/statInputs/StrengthInput';
import { calculateStrengthRank } from '../../utils/calculateStrengthRank';
import { calculateAverageStrengthRank } from '../../utils/calculateAverageStrength';
import { StrengthTest, Rank } from '../../data/strengthRankThresholds';
import RadarChart from '../../components/RadarChart';

const StrengthStatPage: React.FC = () => {
  const [result, setResult] = useState<Record<StrengthTest, Rank> | null>(null);
  const [average, setAverage] = useState<{
    averageScore: number;
    globalRank: Rank;
  } | null>(null);

  const handleSubmit = (data: StrengthFormData) => {
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

    setResult(ranks);
    const averageResult = calculateAverageStrengthRank(Object.values(ranks));
    setAverage(averageResult);
  };

  return (
    <div className="py-10 px-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Strength Stat Assessment</h1>
      <StrengthInput onSubmit={handleSubmit} />

      {result && (
        <div className="mt-10 bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Strength Ranks</h2>

          <RadarChart data={result} />

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mt-6">
            {Object.entries(result).map(([test, rank]) => (
              <li key={test} className="flex justify-between items-center border-b py-2">
                <span className="capitalize whitespace-nowrap">{test.replace(/([A-Z])/g, ' $1')}</span>
                <span className="font-bold text-blue-700 whitespace-nowrap ml-4">{rank}</span>
              </li>
            ))}
          </ul>

          {average && (
            <div className="mt-6 text-center">
              <p className="text-lg">
                <span className="font-semibold">Average Strength Score:</span> {average.averageScore}
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

export default StrengthStatPage;
