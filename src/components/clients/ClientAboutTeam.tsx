"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import type { ClientDetail } from "./types";

interface ClientAboutTeamProps {
  client: ClientDetail;
}

export default function ClientAboutTeam({ client }: ClientAboutTeamProps) {
  const t = useTranslations("clientAboutTeam");

  const ourStory = (client as any).ourStory || {
    paragraph1:
      "Years of experience in IT have taught us that success comes from building strong, mutually beneficial partnerships. We believe that what benefits our clients ultimately strengthens our business, creating a sustainable cycle of shared growth and value. This philosophy drives every decision we make and every relationship we build.",
    paragraph2:
      "Since 2005, we have completed over 400 successful projects for companies of all sizes, from small niche firms to large enterprises listed in Fortune 500 and Inc. 5000.",
  };

  const teamImage = (client as any).teamImage || "/img/auction/1.jpg";

  const whatSetsUsApart = (client as any).whatSetsUsApart || [
    {
      title: "Team Integration That Works",
      description:
        "Edvantis teams work as an extension of your organization, aligning with your processes to ensure the best outcomes. It's not just about finishing the project but working with you to achieve results.",
    },
    {
      title: "Trust and Industry Recognition",
      description:
        "Maintaining a 96% CSAT year after year, we are trusted by clients and recognized by global platforms such as Clutch, G2, and IAOP for our reliable delivery and commitment to customer success.",
    },
    {
      title: "Scalable Service Models",
      description:
        'Our "LEGO-like" service models allow us to build the perfect collaboration together. We provide rapid recruitment, high retention rates, and scalable teams that dynamically evolve alongside your business goals.',
    },
  ];

  const quickFacts = (client as any).quickFacts || [
    { icon: "👥", label: "Multilingual Team" },
    { icon: "⚙️", label: "39 Verified Clutch Clients" },
    { icon: "🏢", label: "20 years in business" },
  ];

  const tools = (client as any).tools || [
    "Jira",
    "SharePoint",
    "Confluence",
    "Azure DevOps",
    "AWS",
    "Microsoft Azure",
    "Google Cloud Platform",
    "Docker",
    "Kubernetes",
    "Power BI",
    "Heroku",
    "GitHub",
  ];

  return (
    <div className="space-y-8">
      {/* Our Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("ourStory")}</h3>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>{ourStory.paragraph1}</p>
            <p>{ourStory.paragraph2}</p>
          </div>
        </div>
        <div className="relative h-64 md:h-full min-h-[300px] rounded-lg overflow-hidden">
          <Image
            src={teamImage}
            alt="Team"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* What Sets Us Apart */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">
          {t("whatSetsUsApart")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {whatSetsUsApart.map((item: any, index: number) => (
            <div key={index}>
              <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
              <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Facts & Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quick Facts */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("quickFacts")}</h3>
          <ul className="space-y-3">
            {quickFacts.map((fact: any, index: number) => (
              <li key={index} className="flex items-center gap-3">
                <span className="text-2xl">{fact.icon}</span>
                <span className="text-gray-700">{fact.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tools and Technology */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("toolsAndTechnology")}</h3>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

