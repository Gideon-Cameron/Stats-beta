import { useState } from 'react';
import { FlexibilityTest } from '../data/flexibilityRankThresholds';

type Props = {
  onSubmit: (data: Record<FlexibilityTest, number>) => void;
  initialData?: Record<FlexibilityTest, number>;
};

const tests: { key: FlexibilityTest; label: string }[] = [
  { key: 'frontSplitLeft', label: 'Front Split (Left)' },
  { key: 'frontSplitRight', label: 'Front Split (Right)' },
  { key: 'middleSplit', label: 'Middle Split' },
  { key: 'toeTouch', label: 'Toe Touch' },
  { key: 'wallReach', label: 'Wall Reach' },
  { key: 'pancakeFold', label: 'Pancake Fold' },
  { key: 'bridgeDepth', label: 'Bridge Depth' },
];

const FlexibilityInput: React.FC<Props> = ({ onSubmit, initialData }) => {
  const [data, setData] = useState<Record<FlexibilityTest, number>>(() => {
    const initial: Record<FlexibilityTest, number> = {
      frontSplitLeft: 0,
      frontSplitRight: 0,
      middleSplit: 0,
      toeTouch: 0,
      wallReach: 0,
      pancakeFold: 0,
      bridgeDepth: 0,
    };
    return initialData ? { ...initial, ...initialData } : initial;
  });

  const handleChange = (key: FlexibilityTest, value: number) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {tests.map((test) => (
        <div key={test.key} className="flex flex-col">
          <label className="mb-1 font-medium">{test.label}</label>
          <input
            type="number"
            min={0}
            max={100}
            step={1}
            value={data[test.key]}
            onChange={(e) => handleChange(test.key, parseInt(e.target.value))}
            className="border border-gray-300 px-2 py-1 rounded"
            placeholder="% of range (0–100)"
          />
        </div>
      ))}
      <button type="submit" className="mt-4 bg-blue-600 text-white py-2 px-4 rounded">
        Submit
      </button>
    </form>
  );
};

export default FlexibilityInput;
