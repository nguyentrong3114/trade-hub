import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaGlobe } from "react-icons/fa";
import type { ClientDetail } from "./types";

interface Props {
  client: ClientDetail;
}

export default function ClientContactCard({ client }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">
        Thông tin liên hệ
      </h2>
      <dl className="space-y-4 text-sm">
        <div className="flex items-start gap-3">
          <FaMapMarkerAlt className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
          <div>
            <dt className="text-gray-500 text-xs mb-0.5">Địa chỉ</dt>
            <dd className="text-gray-900">{client.address}</dd>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <FaEnvelope className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
          <div>
            <dt className="text-gray-500 text-xs mb-0.5">Email</dt>
            <dd>
              <a
                href={`mailto:${client.email}`}
                className="text-blue-600 hover:underline"
              >
                {client.email}
              </a>
            </dd>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <FaPhone className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
          <div>
            <dt className="text-gray-500 text-xs mb-0.5">Điện thoại</dt>
            <dd>
              <a
                href={`tel:${client.phone}`}
                className="text-blue-600 hover:underline"
              >
                {client.phone}
              </a>
            </dd>
          </div>
        </div>
        {client.website && (
          <div className="flex items-start gap-3">
            <FaGlobe className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
            <div>
              <dt className="text-gray-500 text-xs mb-0.5">Website</dt>
              <dd>
                <a
                  href={client.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {client.website}
                </a>
              </dd>
            </div>
          </div>
        )}
      </dl>
    </div>
  );
}

