import { FaBuilding, FaCheckCircle } from "react-icons/fa";
import type { ClientDetail } from "./types";

interface Props {
  client: ClientDetail;
}

export default function ClientAbout({ client }: Props) {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <FaBuilding className="w-5 h-5 text-blue-600" />
        Giới thiệu doanh nghiệp
      </h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        {client.overview}
      </p>

      {/* Mission & Vision */}
      {(client.mission || client.vision) && (
        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          {client.mission && (
            <div className="bg-blue-50 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">
                Sứ mệnh
              </h3>
              <p className="text-sm text-blue-800 leading-relaxed">
                {client.mission}
              </p>
            </div>
          )}
          {client.vision && (
            <div className="bg-green-50 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-green-900 mb-2">
                Tầm nhìn
              </h3>
              <p className="text-sm text-green-800 leading-relaxed">
                {client.vision}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Core Values */}
      {client.coreValues && client.coreValues.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Giá trị cốt lõi
          </h3>
          <div className="flex flex-wrap gap-2">
            {client.coreValues.map((value) => (
              <span
                key={value}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-700"
              >
                <FaCheckCircle className="w-3 h-3 text-green-500" />
                {value}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

