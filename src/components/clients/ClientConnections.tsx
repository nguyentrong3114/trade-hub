"use client";

import { useTranslations } from "next-intl";
import type { ClientDetail } from "./types";

interface ClientConnectionsProps {
  client: ClientDetail;
}

export default function ClientConnections({ client }: ClientConnectionsProps) {
  const t = useTranslations("clientConnections");

  const connections = (client as any).connections || {
    partners: ["Microsoft", "AWS", "Google Cloud", "Oracle"],
    certifications: ["ISO 27001", "ISO 9001", "CMMI Level 5"],
    associations: ["Vietnam Software Association", "ASEAN IT Alliance"],
  };

  return (
    <div className="space-y-6">
      <p className="text-gray-700 leading-relaxed">{t("description")}</p>

      {/* Partners */}
      {connections.partners && connections.partners.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">{t("partners")}</h3>
          <div className="flex flex-wrap gap-2">
            {connections.partners.map((partner: string, index: number) => (
              <span
                key={index}
                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {connections.certifications && connections.certifications.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">{t("certifications")}</h3>
          <div className="flex flex-wrap gap-2">
            {connections.certifications.map((cert: string, index: number) => (
              <span
                key={index}
                className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Associations */}
      {connections.associations && connections.associations.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">{t("associations")}</h3>
          <div className="flex flex-wrap gap-2">
            {connections.associations.map((association: string, index: number) => (
              <span
                key={index}
                className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium"
              >
                {association}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

