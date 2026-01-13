import Image from "next/image";

export default async function HeroSection({
    title,
    description,
    image,
    cta,
    cta2,
}: {
    title: string;
    description: string;
    image: string;
    cta: string;
    cta2: string;
}) {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative w-full h-[650px] rounded-2xl overflow-hidden">
                {/* Background Image */}
                <Image
                    src={image}
                    alt="TradeHub Logo"
                    fill
                    className="object-cover"
                    priority
                />

                {/* Overlay (làm chữ nổi hơn) */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-20 text-white max-w-3xl">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                        {title}
                    </h1>

                    <p className="text-base sm:text-lg text-white/90 mb-8">
                        {description}
                    </p>
                    {/* CTA buttons */}
                    <div className="flex flex-wrap gap-4">
                        <button
                            className="
                            px-6 py-3 rounded-xl
                            bg-primary text-white font-semibold
                            border-2 border-transparent
                            hover:border-blue-500 hover:text-white
                            transition-all duration-200
                            hover:shadow-xl hover:-translate-y-0.5 hover:scale-105"
                        >
                            {cta}
                        </button>

                        <button className="px-6 py-3 rounded-xl bg-white/10 border border-white/30 text-white font-semibold hover:bg-white/20 transition">
                            {cta2}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
