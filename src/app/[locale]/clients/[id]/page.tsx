"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

// Import all components from the clients folder
import {
  ClientDetail,
  CLIENT_DETAILS,
  DEFAULT_CLIENT,
  BASIC_CLIENTS,
  ClientProfileHeader,
  ClientAbout,
  ClientBlog,
  ClientGallery,
  ClientAchievements,
  ClientCertifications,
  ClientCTA,
  ClientNavbar,
  ClientRecruitment,
  ClientVideoSection,
  ClientPricingSnapshot,
  ClientAccordionSection,
  ClientReviews,
  ClientPortfolioAwards,
  ClientAboutTeam,
  ClientVerification,
  ClientLocation,
  ClientContactSection,
  ClientConnections,
} from "@/components/clients";
import { useTranslations } from "next-intl";

export default function ClientDetailPage() {
  const params = useParams();
  const locale = params.locale as string;
  const clientId = parseInt(params.id as string, 10);
  const t = useTranslations("clientAccordion");

  // Tìm client chi tiết hoặc tạo từ basic data
  let client: ClientDetail | null = CLIENT_DETAILS.find((c) => c.id === clientId) || null;

  if (!client) {
    const basicClient = BASIC_CLIENTS.find((c) => c.id === clientId);
    if (basicClient) {
      client = {
        ...basicClient,
        ...DEFAULT_CLIENT,
      };
    }
  }

  if (!client) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy đối tác</h1>
          <Link
            href={`/${locale}/clients`}
            className="text-blue-600 hover:underline"
          >
            Quay lại danh sách đối tác
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header with Cover */}
      <ClientProfileHeader client={client} locale={locale} />

      {/* Client Navigation Bar */}
      <ClientNavbar clientName={client.name} clientLogo={client.logo} />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
          {/* Left Column */}
          <div className="space-y-8">
            <section id="about">
              <ClientAbout client={client} />
            </section>
            <section id="video">
              <ClientVideoSection client={client} />
            </section>
            <section id="pricing">
              <ClientPricingSnapshot client={client} />
            </section>

            {/* Accordion Sections */}
            <section id="accordion">
              <ClientAccordionSection
                items={[
                  {
                    id: "reviews",
                    title: t("reviews"),
                    content: <ClientReviews client={client} />,
                  },
                  {
                    id: "portfolio",
                    title: t("portfolioAwards"),
                    content: <ClientPortfolioAwards client={client} />,
                  },
                  {
                    id: "aboutTeam",
                    title: t("aboutTeam"),
                    content: <ClientAboutTeam client={client} />,
                  },
                  {
                    id: "verification",
                    title: t("verification"),
                    content: <ClientVerification client={client} />,
                  },
                  {
                    id: "location",
                    title: t("location"),
                    content: <ClientLocation client={client} />,
                  },
                  {
                    id: "contact",
                    title: t("contact"),
                    content: <ClientContactSection client={client} />,
                  },
                  {
                    id: "connections",
                    title: t("connections"),
                    content: <ClientConnections client={client} />,
                  },
                ]}
              />
            </section>

            <section id="blog">
              <ClientBlog companyName={client.name} locale={locale} clientId={client.id} />
            </section>
            <section id="recruitment">
              <ClientRecruitment companyName={client.name} locale={locale} />
            </section>
            <section id="gallery">
              <ClientGallery gallery={client.gallery || []} clientName={client.name} />
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <aside className="space-y-6">
            <ClientAchievements achievements={client.achievements} />
            <ClientCertifications certifications={client.certifications || []} />
            <ClientCTA locale={locale} />
          </aside>
        </div>
      </div>
    </div>
  );
}
