import { useState } from 'react';

export type StrengthFormData = {
  benchPress: number;
  squat: number;
  deadlift: number;
  overheadPress: number;
  pullUps: number;
  pushUps: number;
  barHang: number;
  plankHold: number;
};

type Props = {
  onSubmit: (data: StrengthFormData) => void;
};

const StrengthInput: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<StrengthFormData>({
    benchPress: 0,
    squat: 0,
    deadlift: 0,
    overheadPress: 0,
    pullUps: 0,
    pushUps: 0,
    barHang: 0,
    plankHold: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const fields = [
    { label: 'Bench Press (kg)', name: 'benchPress' },
    { label: 'Squat (kg)', name: 'squat' },
    { label: 'Deadlift (kg)', name: 'deadlift' },
    { label: 'Overhead Press (kg)', name: 'overheadPress' },
    { label: 'Pull-Ups (reps)', name: 'pullUps' },
    { label: 'Push-Ups (reps)', name: 'pushUps' },
    { label: 'Bar Hang (sec)', name: 'barHang' },
    { label: 'Plank Hold (sec)', name: 'plankHold' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-4">
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col">
          <label htmlFor={field.name} className="mb-1 text-sm font-medium">
            {field.label}
          </label>
          <input
            type="number"
            name={field.name}
            id={field.name}
            value={formData[field.name as keyof StrengthFormData] ?? 0}
            onChange={handleChange}
            min={0}
            className="border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default StrengthInput;
