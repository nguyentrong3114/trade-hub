import Image from "next/image";

interface Props {
  gallery: string[];
  clientName: string;
}

export default function ClientGallery({ gallery, clientName }: Props) {
  if (!gallery || gallery.length === 0) return null;

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Hình ảnh doanh nghiệp
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {gallery.map((img, idx) => (
          <div
            key={idx}
            className="relative aspect-square rounded-xl overflow-hidden"
          >
            <Image
              src={img}
              alt={`${clientName} gallery ${idx + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

