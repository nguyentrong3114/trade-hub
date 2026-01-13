import { getTranslations } from "next-intl/server";

export default async function TermsPage() {
  const t = await getTranslations("terms");

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-lg">{t("lastUpdated")}</p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Introduction */}
          <section className="border-b border-gray-200 pb-8">
            <p className="leading-relaxed">{t("introduction")}</p>
          </section>

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">{t("section1.title")}</h2>
            <div className="space-y-4">
              <p className="leading-relaxed">{t("section1.content")}</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{t("section1.item1")}</li>
                <li>{t("section1.item2")}</li>
                <li>{t("section1.item3")}</li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">{t("section2.title")}</h2>
            <div className="space-y-4">
              <p className="leading-relaxed">{t("section2.content")}</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{t("section2.item1")}</li>
                <li>{t("section2.item2")}</li>
                <li>{t("section2.item3")}</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">{t("section3.title")}</h2>
            <div className="space-y-4">
              <p className="leading-relaxed">{t("section3.content")}</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{t("section3.item1")}</li>
                <li>{t("section3.item2")}</li>
                <li>{t("section3.item3")}</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">{t("section4.title")}</h2>
            <div className="space-y-4">
              <p className="leading-relaxed">{t("section4.content")}</p>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">{t("section5.title")}</h2>
            <div className="space-y-4">
              <p className="leading-relaxed">{t("section5.content")}</p>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">{t("section6.title")}</h2>
            <div className="space-y-4">
              <p className="leading-relaxed">{t("section6.content")}</p>
            </div>
          </section>

          {/* Contact */}
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold mb-4">{t("contact.title")}</h2>
            <p className="leading-relaxed">{t("contact.content")}</p>
            <div className="mt-4 space-y-2">
              <p><strong>{t("contact.email")}:</strong> contact@tradehub.com</p>
              <p><strong>{t("contact.phone")}:</strong> +356 836 2335</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

