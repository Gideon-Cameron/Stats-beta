import { useEffect, useState } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

export type SkillFormData = {
  pushSkill: string;
  pullSkill: string;
  handstandSkill: string;
  coreSkill: string;
  legSkill: string;
  leverSkill: string;
};

type Props = {
  onSubmit: (data: SkillFormData) => void;
  initialData?: SkillFormData;
};

type SkillLevel = {
  label: string;
  value: string;
  description: string;
};

const categories: { name: keyof SkillFormData; label: string; levels: SkillLevel[] }[] = [
  {
    name: 'pushSkill',
    label: 'Push Skill',
    levels: [
      { value: 'standard', label: 'Standard Push-Up', description: 'Regular push-up with chest to floor' },
      { value: 'decline', label: 'Decline Push-Up', description: 'Feet elevated push-up' },
      { value: 'archer', label: 'Archer Push-Up', description: 'Push-up with one arm extended out' },
      { value: 'explosive', label: 'Explosive Push-Up', description: 'Push-up that leaves the ground' },
      { value: 'clap', label: 'Clap Push-Up', description: 'Push-up with a mid-air clap' },
      { value: 'superman', label: 'Superman Push-Up', description: 'Arms & legs leave the ground at once' },
      { value: 'pseudoPlanche', label: 'Pseudo Planche Push-Up', description: 'Push-up with shoulders over hands' },
      { value: 'planche', label: 'Planche Push-Up', description: 'Full-body parallel, no feet on floor' },
    ],
  },
  {
    name: 'pullSkill',
    label: 'Pull Skill',
    levels: [
      { value: 'standard', label: 'Standard Pull-Up', description: 'Chin over bar, full ROM' },
      { value: 'chestToBar', label: 'Chest-to-Bar Pull-Up', description: 'Bar touches chest at top' },
      { value: 'archer', label: 'Archer Pull-Up', description: 'Side-to-side unilateral pull' },
      { value: 'explosive', label: 'Explosive Pull-Up', description: 'Pull fast enough to leave bar' },
      { value: 'high', label: 'High Pull-Up', description: 'Pull to lower chest/waist height' },
      { value: 'muscleUp', label: 'Muscle-Up', description: 'Pull over the bar into dip' },
      { value: 'oneArmAssist', label: 'One-Arm (Assisted)', description: 'One arm with band/support' },
      { value: 'oneArm', label: 'One-Arm Pull-Up', description: 'Strict, no assist' },
    ],
  },
  // ➕ Repeat for: handstandSkill, coreSkill, legSkill, leverSkill
];

const SkillInput: React.FC<Props> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<SkillFormData>({
    pushSkill: '',
    pullSkill: '',
    handstandSkill: '',
    coreSkill: '',
    legSkill: '',
    leverSkill: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-4">
      {categories.map(({ name, label, levels }) => (
        <div key={name} className="flex flex-col">
          <label className="mb-1 text-sm font-medium flex items-center">
            {label}
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <span className="ml-2 text-blue-600 cursor-help">❓</span>
              </Tooltip.Trigger>
              <Tooltip.Content
                side="right"
                className="bg-black text-white text-xs px-2 py-1 rounded shadow max-w-xs z-50"
              >
                Choose the highest level of progression you've mastered.
              </Tooltip.Content>
            </Tooltip.Root>
          </label>
          <select
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select skill level</option>
            {levels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
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

export default SkillInput;
