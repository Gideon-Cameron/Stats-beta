import React, { useState } from 'react';
import EnduranceInput, { EnduranceNumericForm } from '../../components/statInputs/EnduranceInput';
import { calculateEnduranceRank } from '../../utils/calculateEnduranceRank';
import { calculateAverageStrengthRank } from '../../utils/calculateAverageStrength';
import { EnduranceTest, Rank } from '../../data/enduranceRankThresholds';
import RadarChart from '../../components/RadarChart';

const EnduranceStatPage: React.FC = () => {
  const [result, setResult] = useState<Record<EnduranceTest, Rank> | null>(null);
  const [average, setAverage] = useState<{
    averageScore: number;
    globalRank: Rank;
  } | null>(null);

  const handleSubmit = (data: EnduranceNumericForm) => {
    const ranks: Record<EnduranceTest, Rank> = {
      run1_5Mile: calculateEnduranceRank('run1_5Mile', data.run1_5Mile),
      plankHold: calculateEnduranceRank('plankHold', data.plankHold),
      pushUps: calculateEnduranceRank('pushUps', data.pushUps),
      jumpRope: calculateEnduranceRank('jumpRope', data.jumpRope),
      wallSit: calculateEnduranceRank('wallSit', data.wallSit),
      runMaxDistance: calculateEnduranceRank('runMaxDistance', data.runMaxDistance),
    };

    setResult(ranks);
    const averageResult = calculateAverageStrengthRank(Object.values(ranks));
    setAverage(averageResult);
  };

  return (
    <div className="py-10 px-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Endurance Stat Assessment</h1>
      <EnduranceInput onSubmit={handleSubmit} />

      {result && (
        <div className="mt-10 bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Endurance Ranks</h2>
          <RadarChart data={result} />
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mt-6">
            {Object.entries(result).map(([test, rank]) => (
              <li key={test} className="flex justify-between items-center border-b py-2">
                <span className="capitalize whitespace-nowrap">{test.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ')}</span>
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
