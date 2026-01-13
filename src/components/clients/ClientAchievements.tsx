import { FaTrophy } from "react-icons/fa";
import type { Achievement } from "./types";

interface Props {
  achievements: Achievement[];
}

export default function ClientAchievements({ achievements }: Props) {
  if (achievements.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <FaTrophy className="w-5 h-5 text-yellow-500" />
        Thành tựu nổi bật
      </h2>
      <div className="space-y-4">
        {achievements.map((achievement, idx) => (
          <div key={idx} className="border-l-2 border-blue-500 pl-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {achievement.year}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 text-sm">
              {achievement.title}
            </h3>
            <p className="text-xs text-gray-600">
              {achievement.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

