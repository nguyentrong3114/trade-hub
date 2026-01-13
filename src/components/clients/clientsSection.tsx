import { getTranslations } from "next-intl/server";
import Image from "next/image";

export interface Client {
  id: string | number;
  name: string;
  description?: string;
  logo: string;
}

interface ClientsSectionProps {
  clients: Client[];
}

export default async function ClientsSection({ clients }: ClientsSectionProps) {
  const t = await getTranslations("Home.clients");

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid gap-12 lg:grid-cols-2 items-start">
        {/* Left column - text content */}
        <div className="max-w-xl">
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900">
            {t("title")}
          </h2>
          <p className="mt-6 text-base sm:text-lg text-gray-600">
            {t("subtitle")}
          </p>

          <div className="mt-8 space-y-2 text-sm text-gray-500">
            <p className="font-semibold text-gray-800">
              We’ve worked with first-time founders and seasoned brand teams alike.
            </p>
            <p>
              Always with the same goal: bring clarity, raise the bar, and make it
              count.
            </p>
          </div>

          <button className="cursor-pointer mt-10 inline-flex items-center justify-center rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-gray-900/20 transition-colors hover:bg-black">
            {t("viewMore")}
          </button>
        </div>

        {/* Right column - clients grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 lg:gap-6">
          {clients.map((client) => {
            return (
              <div
                key={client.id}
                className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white/70 text-gray-700 hover:border-transparent hover:shadow-[0_22px_55px_rgba(15,23,42,0.14)] transition-all duration-300 flex items-center justify-center px-6 py-12 sm:px-8 sm:py-16 min-h-[180px] sm:min-h-[140px]"
                title={client.description || client.name}
              >
                {/* Logo background - covers entire card */}
                {client.logo && (
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover rounded-3xl"
                    />
                  </div>
                )}

                {/* Overlay that covers entire image on hover */}
                {client.description && (
                  <div className="absolute inset-0 z-10 bg-white/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl flex items-center justify-center px-4 py-6">
                    <p className="text-sm leading-relaxed text-gray-800 text-center">
                      {client.description}
                    </p>
                  </div>
                )}

                {/* Content overlay */}
                <div className="relative z-20 flex w-full flex-col items-start justify-center gap-4 min-h-full">
                  {/* Fallback name if no logo */}
                  {!client.logo && (
                    <div className="inline-flex rounded-lg bg-gray-100 px-3 py-2">
                      <span className="text-xs font-semibold text-gray-500">
                        {client.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


