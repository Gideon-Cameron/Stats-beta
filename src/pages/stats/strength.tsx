import React, { useState } from 'react';
import StrengthInput, { StrengthFormData} from '../../components/statInputs/StrengthInput';
import { calculateStrengthRank } from '../../utils/calculateStrengthRank';
import { StrengthTest, Rank } from '../../data/strengthRankThresholds';

const StrengthStatPage: React.FC = () => {
    const [result, setResult] = useState<Record<StrengthTest, Rank> | null>(null);
    
    const handleSubmit = (data: StrengthFormData) => {
        const ranks: Record<StrengthTest, Rank> = {
            benchPress: calculateStrengthRank('benchPress', data.benchPress),
            squat: calculateStrengthRank('squat', data.squat),
            deadlift: calculateStrengthRank('deadlift', data.deadlift),
            overheadPress: calculateStrengthRank('overheadPress', data.overheadPress),
            pullUps: calculateStrengthRank('pullUps', data.pullUps),
            pushUps: calculateStrengthRank('pushUps', data.pushUps),
            barHang: calculateStrengthRank('barHang', data.barHang),
            plankHold: calculateStrengthRank('plankHold', data.plankHold),
        };

        setResult(ranks);
    };

    return (
        <div className="py-10 px-6 max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-center">Strength Stat Assessment</h1>
          <StrengthInput onSubmit={handleSubmit} />
    
          {result && (
            <div className="mt-10 bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Your Strength Ranks</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
                {Object.entries(result).map(([test, rank]) => (
                  <li key={test} className="flex justify-between border-b py-1">
                    <span className="capitalize">{test.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="font-bold text-blue-700">{rank}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
} ;

export default StrengthStatPage