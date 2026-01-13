import Image from "next/image";
import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaGlobe,
  FaBuilding,
  FaUsers,
  FaCalendarAlt,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaStar,
  FaArrowLeft,
  FaExternalLinkAlt,
  FaComments,
} from "react-icons/fa";
import type { ClientDetail } from "./types";
import { getRankColor } from "./types";

interface Props {
  client: ClientDetail;
  locale: string;
}

export default function ClientProfileHeader({ client, locale }: Props) {
  return (
    <>
      {/* Cover Image */}
      <div className="relative h-64 sm:h-80 lg:h-96 w-full">
        <Image
          src={client.coverImage || "/img/section1.jpg"}
          alt={`${client.name} cover`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Back button */}
        <div className="absolute top-6 left-6 z-10">
          <Link
            href={`/${locale}/clients`}
            className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm px-4 py-2 text-sm font-medium text-gray-800 shadow-lg hover:bg-white transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>Quay lại</span>
          </Link>
        </div>
      </div>

      {/* Profile Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            {/* Logo & Basic Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
              <div className="relative h-28 w-28 sm:h-36 sm:w-36 rounded-2xl bg-white shadow-lg border-4 border-white overflow-hidden shrink-0">
                {client.logo ? (
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    className="object-contain p-2"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-100">
                    <span className="text-4xl font-bold text-blue-600">
                      {client.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                    {client.name}
                  </h1>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${getRankColor(client.rank)}`}
                  >
                    <FaStar className="w-3 h-3" />
                    {client.rank}
                  </span>
                </div>
                {client.slogan && (
                  <p className="text-lg text-gray-600 italic">{client.slogan}</p>
                )}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="inline-flex items-center gap-1">
                    <FaBuilding className="w-4 h-4" />
                    {client.category}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <FaMapMarkerAlt className="w-4 h-4" />
                    {client.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <FaUsers className="w-4 h-4" />
                    {client.employeeCount} nhân viên
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <FaCalendarAlt className="w-4 h-4" />
                    Thành lập {client.foundedYear}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {client.website && (
                <a
                  href={client.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-blue-700 transition-colors"
                >
                  <FaGlobe className="w-4 h-4" />
                  Website
                  <FaExternalLinkAlt className="w-3 h-3" />
                </a>
              )}
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 rounded-full border-2 border-gray-300 px-6 py-3 text-sm font-semibold text-gray-800 hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                <FaEnvelope className="w-4 h-4" />
                Liên hệ hợp tác
              </Link>
              <Link
                href={`/${locale}/contact?client=${encodeURIComponent(client.name)}`}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-emerald-600 transition-colors"
              >
                <FaComments className="w-4 h-4" />
                Chat ngay
              </Link>
            </div>
          </div>

          {/* Social Media */}
          {client.socialMedia && (
            <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-4">
              <span className="text-sm text-gray-500">Theo dõi:</span>
              {client.socialMedia.linkedin && (
                <a
                  href={client.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <FaLinkedin className="w-5 h-5" />
                </a>
              )}
              {client.socialMedia.twitter && (
                <a
                  href={client.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <FaTwitter className="w-5 h-5" />
                </a>
              )}
              {client.socialMedia.facebook && (
                <a
                  href={client.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <FaFacebook className="w-5 h-5" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

