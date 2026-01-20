"use client";

import { useTranslations } from "next-intl";
import {
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaGlobe,
} from "react-icons/fa";
import type { ClientDetail } from "./types";

interface ClientContactSectionProps {
  client: ClientDetail;
}

export default function ClientContactSection({ client }: ClientContactSectionProps) {
  const t = useTranslations("clientContact");

  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">{t("contactInformation") || "Thông tin liên hệ"}</h3>
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
            <div>
              <dt className="text-gray-500 text-sm mb-1">{t("address") || "Địa chỉ"}</dt>
              <dd className="text-gray-900">{client.address}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FaEnvelope className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
            <div>
              <dt className="text-gray-500 text-sm mb-1">{t("email") || "Email"}</dt>
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
            <FaPhone className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
            <div>
              <dt className="text-gray-500 text-sm mb-1">{t("phone") || "Điện thoại"}</dt>
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
              <FaGlobe className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <dt className="text-gray-500 text-sm mb-1">{t("website") || "Website"}</dt>
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
        </div>
      </div>

      {/* Contact Card */}
      <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-xl">{client.name.charAt(0)}</span>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 mb-1">{t("contactCompany", { company: client.name }) || `Contact ${client.name}`}</h3>
            <p className="text-sm text-gray-600 mb-1">{t("customMessage1")}</p>
            <p className="text-sm text-gray-600">{t("customMessage2")}</p>
          </div>
        </div>
        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer">
          {t("sendMessage")}
        </button>
      </div>

      {/* Social Media */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">{t("connectOnSocial", { company: client.name }) || `Connect with ${client.name} on Social`}</h3>
        <div className="flex flex-wrap gap-3">
          {client.socialMedia?.linkedin && (
            <a
              href={client.socialMedia.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <FaLinkedin className="w-5 h-5 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">LinkedIn</span>
            </a>
          )}
          {client.socialMedia?.facebook && (
            <a
              href={client.socialMedia.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <FaFacebook className="w-5 h-5 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">Facebook</span>
            </a>
          )}
          {client.socialMedia?.twitter && (
            <a
              href={client.socialMedia.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <FaTwitter className="w-5 h-5 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">X</span>
            </a>
          )}
          <a
            href="#"
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <FaInstagram className="w-5 h-5 text-gray-700" />
            <span className="text-sm font-medium text-gray-700">Instagram</span>
          </a>
        </div>
      </div>
    </div>
  );
}

