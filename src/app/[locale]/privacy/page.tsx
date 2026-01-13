import { getTranslations } from "next-intl/server";

export default async function PrivacyPage() {
  const t = await getTranslations("privacy");

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">{t("title")}</h1>
          <p className="text-lg text-gray-600">{t("lastUpdated")}</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 space-y-8">
          {/* Introduction */}
          <section className="border-b border-gray-200 pb-8">
            <p className="leading-relaxed text-gray-700">{t("introduction")}</p>
          </section>

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">{t("section1.title")}</h2>
            <div className="space-y-4">
              <p className="leading-relaxed text-gray-700">{t("section1.content")}</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                <li>{t("section1.item1")}</li>
                <li>{t("section1.item2")}</li>
                <li>{t("section1.item3")}</li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">{t("section2.title")}</h2>
            <div className="space-y-4">
              <p className="leading-relaxed text-gray-700">{t("section2.content")}</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                <li>{t("section2.item1")}</li>
                <li>{t("section2.item2")}</li>
                <li>{t("section2.item3")}</li>
                <li>{t("section2.item4")}</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">{t("section3.title")}</h2>
            <div className="space-y-4">
              <p className="leading-relaxed text-gray-700">{t("section3.content")}</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                <li>{t("section3.item1")}</li>
                <li>{t("section3.item2")}</li>
                <li>{t("section3.item3")}</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">{t("section4.title")}</h2>
            <div className="space-y-4">
              <p className="leading-relaxed text-gray-700">{t("section4.content")}</p>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">{t("section5.title")}</h2>
            <div className="space-y-4">
              <p className="leading-relaxed text-gray-700">{t("section5.content")}</p>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">{t("section6.title")}</h2>
            <div className="space-y-4">
              <p className="leading-relaxed text-gray-700">{t("section6.content")}</p>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">{t("section7.title")}</h2>
            <div className="space-y-4">
              <p className="leading-relaxed text-gray-700">{t("section7.content")}</p>
            </div>
          </section>

          {/* Contact */}
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">{t("contact.title")}</h2>
            <p className="leading-relaxed text-gray-700 mb-4">{t("contact.content")}</p>
            <div className="mt-4 space-y-2 text-gray-700">
              <p><strong className="text-gray-900">{t("contact.email")}:</strong> contact@tradehub.com</p>
              <p><strong className="text-gray-900">{t("contact.phone")}:</strong> +356 836 2335</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

