import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";
import type { Testimonial } from "./types";

interface Props {
  testimonials: Testimonial[];
}

export default function ClientTestimonials({ testimonials }: Props) {
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FaQuoteLeft className="w-5 h-5 text-blue-600" />
        Đánh giá từ đối tác
      </h2>
      <div className="space-y-4">
        {testimonials.map((testimonial, idx) => (
          <div
            key={idx}
            className="bg-gray-50 rounded-xl p-5"
          >
            <p className="text-gray-700 leading-relaxed mb-4 italic">
              &ldquo;{testimonial.content}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                {testimonial.avatar ? (
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-100">
                    <span className="text-sm font-bold text-blue-600">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  {testimonial.author}
                </p>
                <p className="text-xs text-gray-500">
                  {testimonial.company}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

