import { getTranslations } from 'next-intl/server';
import { 
  FaFileAlt, 
  FaCheck, 
  FaNetworkWired, 
  FaPlug, 
  FaArrowLeft
} from 'react-icons/fa';

export default async function FeaturesSection() {
  const t = await getTranslations("Home.features");

  const features = [
    { icon: FaFileAlt, title: t("item1.title"), description: t("item1.description") },
    { icon: FaCheck, title: t("item2.title"), description: t("item2.description") },
    { icon: FaFileAlt, title: t("item3.title"), description: t("item3.description") },
    { icon: FaCheck, title: t("item4.title"), description: t("item4.description") },
    { icon: FaNetworkWired, title: t("item5.title"), description: t("item5.description") },
    { icon: FaPlug, title: t("item6.title"), description: t("item6.description") },
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        {/* Left side - Title and CTA */}
        <div className="lg:w-1/2 space-y-6">
          {/* Title */}
          <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
            {t("title")}
          </h2>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 leading-relaxed">
            {t("subtitle")}
          </p>

          {/* Learn More button */}
          <button className="mt-8 px-6 py-3 border hover:border-blue-500 text-gray-700 rounded-4xl font-medium transition-colors">
            {t("exploreMore")}
          </button>
        </div>

        {/* Right side - Features Grid */}
        <div className="lg:w-1/2 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors group"
                >
                  {/* Icon */}
                  <div className="shrink-0 mt-1">
                    <IconComponent className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}