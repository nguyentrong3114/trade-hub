"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { FaMapMarkerAlt, FaUsers, FaPhone, FaCheck } from "react-icons/fa";
import type { ClientDetail } from "./types";

interface ClientLocationProps {
  client: ClientDetail;
}

export default function ClientLocation({ client }: ClientLocationProps) {
  const t = useTranslations("clientLocation");
  const [selectedLocation, setSelectedLocation] = useState(0);

  const locations = (client as any).locations || [
    {
      type: "Headquarters",
      address: "80 Aleja Armii Krajowej Rzeszów, Poland 35-328",
      employees: "21 - 30",
      phone: "+48533189252",
      coordinates: { lat: 50.0413, lng: 22.0041 },
    },
    {
      type: "Office",
      address: "Berlin, Germany",
      employees: "10 - 20",
      phone: "+49123456789",
      coordinates: { lat: 52.52, lng: 13.405 },
    },
    {
      type: "Office",
      address: "L'viv, Ukraine",
      employees: "15 - 25",
      phone: "+380123456789",
      coordinates: { lat: 49.8397, lng: 24.0297 },
    },
  ];

  const selectedLoc = locations[selectedLocation];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Locations List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">
            {t("locations")} ({locations.length})
          </h3>
        </div>
        <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
          {locations.map((location: any, index: number) => (
            <div
              key={index}
              className={`p-4 cursor-pointer transition-colors ${
                selectedLocation === index ? "bg-blue-50" : "hover:bg-gray-50"
              }`}
              onClick={() => setSelectedLocation(index)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <FaMapMarkerAlt
                    className={`w-5 h-5 mt-0.5 ${
                      selectedLocation === index ? "text-red-500" : "text-gray-400"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-1">{location.type}</div>
                    {selectedLocation === index && (
                      <div className="space-y-2 mt-2">
                        <div className="text-sm text-gray-700">{location.address}</div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FaUsers className="w-4 h-4" />
                          <span>{location.employees}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FaPhone className="w-4 h-4" />
                          <span>{location.phone}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {selectedLocation === index && (
                  <FaCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="bg-gray-100 border border-gray-200 rounded-lg overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <div className="text-center">
            <FaMapMarkerAlt className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <div className="bg-white rounded-lg p-4 shadow-lg max-w-xs">
              <div className="font-semibold text-gray-900 mb-1">{selectedLoc.type}</div>
              <div className="text-sm text-gray-700 mb-2">{selectedLoc.address}</div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <FaUsers className="w-4 h-4" />
                <span>{selectedLoc.employees}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FaPhone className="w-4 h-4" />
                <span>{selectedLoc.phone}</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-4">
              © MapTiler © OpenStreetMap contributors
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

