import { FaCheckCircle } from "react-icons/fa";

interface Props {
  certifications: string[];
}

export default function ClientCertifications({ certifications }: Props) {
  if (!certifications || certifications.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">
        Chứng nhận
      </h2>
      <div className="flex flex-wrap gap-2">
        {certifications.map((cert) => (
          <span
            key={cert}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-xs font-medium text-green-700"
          >
            <FaCheckCircle className="w-3 h-3" />
            {cert}
          </span>
        ))}
      </div>
    </div>
  );
}

