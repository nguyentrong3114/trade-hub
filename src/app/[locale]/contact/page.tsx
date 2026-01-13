"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", message: "" });
    // You can add toast notification or API call here
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {t("talkWith")}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("talkDescription")}{" "}
            <a
              href={`mailto:${t("contactEmail")}`}
              className="text-blue-600 hover:text-blue-700 underline font-medium"
            >
              {t("contactEmail")}
            </a>{" "}
            {t("talkDescriptionEnd")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl shadow-lg p-6 lg:p-8">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {t("formTitle")}
                </h2>
                <p className="text-gray-600 mb-6">
                  {t("formSubtitle")}
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {t("nameLabel")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t("namePlaceholder")}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {t("emailLabel")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t("emailPlaceholder")}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Message field */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {t("messageLabel")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t("messagePlaceholder")}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
                  >
                    {t("submitButton")}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Contact Details Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 h-fit">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Thông tin liên hệ
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaEnvelope className="w-5 h-5 text-blue-600 mt-1 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <a
                      href={`mailto:${t("contactEmail")}`}
                      className="text-gray-900 font-medium hover:text-blue-600 transition-colors"
                    >
                      {t("contactEmail")}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaPhone className="w-5 h-5 text-blue-600 mt-1 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Điện thoại</p>
                    <a
                      href={`tel:${t("phone")}`}
                      className="text-gray-900 font-medium hover:text-blue-600 transition-colors"
                    >
                      {t("phone")}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="w-5 h-5 text-blue-600 mt-1 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Địa chỉ</p>
                    <p className="text-gray-900 font-medium">{t("location")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaClock className="w-5 h-5 text-blue-600 mt-1 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Giờ làm việc</p>
                    <p className="text-gray-900 font-medium font-mono">
                      {new Date().toLocaleTimeString("en-US", {
                        hour12: false,
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-4">
                  Theo dõi chúng tôi
                </p>
                <div className="flex items-center gap-4">
                  <a
                    href="https://x.com/tradehub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                  >
                    X.
                  </a>
                  <a
                    href="https://www.instagram.com/tradehub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                  >
                    IG.
                  </a>
                  <a
                    href="https://dribbble.com/tradehub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                  >
                    DB.
                  </a>
                  <a
                    href="https://www.behance.net/tradehub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                  >
                    BE.
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Embed */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Bản đồ</h3>
          <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d760.9304445381915!2d8.685269587583418!3d50.09649496845699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1767690721277!5m2!1svi!2s"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
