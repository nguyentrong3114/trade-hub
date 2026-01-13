"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, useSpring, MotionValue } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaPlay, FaQuoteLeft } from "react-icons/fa";
import ComingSoon from "@/components/comingsoon";

// Smooth spring config for buttery animations
const smoothSpring = {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001,
};

// Use smooth spring for parallax
const useSmoothTransform = (value: MotionValue<number>, inputRange: number[], outputRange: number[]) => {
  const transform = useTransform(value, inputRange, outputRange);
  return useSpring(transform, smoothSpring);
};

// Animated counter component
const Counter = ({ value, suffix = "" }: { value: string; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="tabular-nums"
    >
      {value}{suffix}
    </motion.span>
  );
};

// Smooth reveal animation
const RevealText = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 1.2,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

// Parallax section wrapper
const ParallaxWrapper = ({
  children,
  offset = 50,
  className = ""
}: {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useSmoothTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

export default function About() {
  const t = useTranslations("about.newPage");
  const containerRef = useRef<HTMLDivElement>(null);

  // Main scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth parallax values
  const heroY = useSmoothTransform(scrollYProgress, [0, 0.3], [0, -150]);
  const heroOpacity = useSmoothTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const backgroundScale = useSmoothTransform(scrollYProgress, [0, 0.3], [1, 1.2]);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    let lenisInstance: { raf: (time: number) => void; destroy: () => void } | null = null;
    let rafId: number | null = null;

    const initLenis = async () => {
      const Lenis = (await import("lenis")).default;

      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      function raf(time: number) {
        if (lenisInstance) {
          lenisInstance.raf(time);
          rafId = requestAnimationFrame(raf);
        }
      }

      rafId = requestAnimationFrame(raf);
    };

    initLenis();

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if (lenisInstance) {
        lenisInstance.destroy();
      }
    };
  }, []);

  const stats = [
    { value: "500", suffix: "+", label: t("stats.partners") },
    { value: "50", suffix: "+", label: t("stats.countries") },
    { value: "10", suffix: "K+", label: t("stats.transactions") },
    { value: "99", suffix: "%", label: t("stats.satisfaction") },
  ];

  const team = [
    {
      name: t("team.member1.name"),
      role: t("team.member1.role"),
      quote: t("team.member1.quote"),
    },
    {
      name: t("team.member2.name"),
      role: t("team.member2.role"),
      quote: t("team.member2.quote"),
    },
    {
      name: t("team.member3.name"),
      role: t("team.member3.role"),
      quote: t("team.member3.quote"),
    },
  ];

  const milestones = [
    {
      year: t("timeline.milestone1.year"),
      title: t("timeline.milestone1.title"),
      desc: t("timeline.milestone1.desc")
    },
    {
      year: t("timeline.milestone2.year"),
      title: t("timeline.milestone2.title"),
      desc: t("timeline.milestone2.desc")
    },
    {
      year: t("timeline.milestone3.year"),
      title: t("timeline.milestone3.title"),
      desc: t("timeline.milestone3.desc")
    },
    {
      year: t("timeline.milestone4.year"),
      title: t("timeline.milestone4.title"),
      desc: t("timeline.milestone4.desc")
    },
  ];

  const values = [
    {
      num: "01",
      title: t("values.value1.title"),
      desc: t("values.value1.desc"),
    },
    {
      num: "02",
      title: t("values.value2.title"),
      desc: t("values.value2.desc"),
    },
    {
      num: "03",
      title: t("values.value3.title"),
      desc: t("values.value3.desc"),
    },
    {
      num: "04",
      title: t("values.value4.title"),
      desc: t("values.value4.desc"),
    },
  ];

  return (
    <div ref={containerRef} className="overflow-hidden">
      {/* Hero Section */}

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Image */}
            <ParallaxWrapper offset={40}>
              <RevealText>
                <div className="relative max-w-sm mx-auto lg:max-w-[75%]">
                  <motion.div
                    className="aspect-4/5 rounded-3xl overflow-hidden shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <Image
                      src="/img/section1.jpg"
                      alt="TradeHub Story"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  {/* Floating Card */}
                  <motion.div
                    initial={{ opacity: 0, x: 50, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    whileHover={{ y: -5 }}
                    className="absolute -bottom-8 -right-8 bg-white text-gray-900 p-6 rounded-2xl shadow-2xl max-w-xs border border-gray-100"
                  >
                    <FaQuoteLeft className="w-8 h-8 text-gray-200 mb-3" />
                    <p className="text-sm leading-relaxed text-gray-700">
                      &quot;{t("story.quote")}&quot;
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100" />
                      <div>
                        <div className="font-semibold text-sm text-gray-900">{t("story.founder")}</div>
                        <div className="text-xs text-gray-500">{t("story.company")}</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </RevealText>
            </ParallaxWrapper>

            {/* Right - Content */}
            <div className="lg:pl-8">
              <RevealText>
                <span className="text-sm text-blue-600 uppercase tracking-wider font-semibold">
                  {t("story.badge")}
                </span>
              </RevealText>

              <RevealText delay={0.15}>
                <h2 className="text-4xl sm:text-5xl font-bold mt-4 mb-6 leading-tight text-gray-900">
                  {t("story.title")}{" "}
                  <span className="text-blue-500">{t("story.titleGray")}</span>
                </h2>
              </RevealText>

              <RevealText delay={0.3}>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {t("story.desc1")}
                </p>
              </RevealText>

              <RevealText delay={0.45}>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {t("story.desc2")}
                </p>
              </RevealText>

              <RevealText delay={0.6}>
                <p className="text-gray-500 leading-relaxed mb-6">
                  {t("story.desc3")}
                </p>
              </RevealText>

              <RevealText delay={0.75}>
                <p className="text-gray-500 leading-relaxed mb-8">
                  {t("story.desc4")}
                </p>
              </RevealText>

              <RevealText delay={0.9}>
                <Link
                  href="/clients"
                  className="group inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  {t("story.cta")}
                  <FaArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </RevealText>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-6">
          <RevealText>
            <div className="text-center mb-20">
              <span className="text-sm text-blue-600 uppercase tracking-wider font-semibold">
                {t("timeline.badge")}
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold mt-4 text-gray-900">
                {t("timeline.title")}
              </h2>
            </div>
          </RevealText>

          <div className="space-y-24">
            {milestones.map((milestone, idx) => {
              const isEven = idx % 2 === 0;
              // Use fallback image if timeline images don't exist
              const imageSrc = `/img/about/startup.jpg`;

              return (
                <ParallaxWrapper key={milestone.year} offset={20 + idx * 10}>
                  <RevealText delay={idx * 0.2}>
                    <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${!isEven ? "lg:flex-row-reverse" : ""}`}>
                      {/* Image - Left for even, Right for odd */}
                      <div className={`${isEven ? "lg:order-1" : "lg:order-2"}`}>
                        <motion.div
                          className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-xl"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                          <Image
                            src={imageSrc}
                            alt={milestone.title}
                            fill
                            className="object-cover"
                            priority={idx === 0}
                          />
                          {/* Year Badge Overlay */}
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                            <span className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                              {milestone.year}
                            </span>
                          </div>
                        </motion.div>
                      </div>

                      {/* Content - Right for even, Left for odd */}
                      <div className={`${isEven ? "lg:order-2" : "lg:order-1"}`}>
                        <div className="space-y-4">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100">
                            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                              {milestone.year}
                            </span>
                          </div>
                          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900">{milestone.title}</h3>
                          <p className="text-lg text-gray-600 leading-relaxed">{milestone.desc}</p>
                        </div>
                      </div>
                    </div>
                  </RevealText>
                </ParallaxWrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <RevealText>
            <div className="text-center mb-16">
              <span className="text-sm text-blue-600 uppercase tracking-wider font-semibold">
                {t("mission.badge")}
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold mt-4 text-gray-900">
                {t("mission.title")}
              </h2>
            </div>
          </RevealText>

          <div className="max-w-4xl mx-auto space-y-16">
            {/* Mission */}
            <ParallaxWrapper offset={30}>
              <RevealText>
                <div className="bg-blue-50 rounded-2xl p-8 lg:p-12 border border-blue-100">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">{t("mission.missionTitle")}</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {t("mission.missionDesc")}
                  </p>
                </div>
              </RevealText>
            </ParallaxWrapper>

            {/* Vision */}
            <ParallaxWrapper offset={30}>
              <RevealText delay={0.2}>
                <div className="bg-purple-50 rounded-2xl p-8 lg:p-12 border border-purple-100">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">{t("mission.visionTitle")}</h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {t("mission.visionDesc")}
                  </p>
                </div>
              </RevealText>
            </ParallaxWrapper>

            {/* Goals */}
            <ParallaxWrapper offset={30}>
              <RevealText delay={0.4}>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{t("mission.goalsTitle")}</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((num) => (
                      <div key={num} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
                            {num}
                          </div>
                          <p className="text-gray-700 leading-relaxed">{t(`mission.goal${num}`)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealText>
            </ParallaxWrapper>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-6">
          <RevealText>
            <div className="text-center mb-20">
              <span className="text-sm text-blue-600 uppercase tracking-wider font-semibold">
                {t("services.badge")}
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold mt-4 text-gray-900">
                {t("services.title")}
              </h2>
              <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
                {t("services.subtitle")}
              </p>
            </div>
          </RevealText>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <ParallaxWrapper key={num} offset={20}>
                <RevealText delay={(num - 1) * 0.1}>
                  <motion.div
                    className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 h-full"
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {t(`services.service${num}.title`)}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t(`services.service${num}.desc`)}
                    </p>
                  </motion.div>
                </RevealText>
              </ParallaxWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <RevealText>
            <div className="text-center mb-20">
              <span className="text-sm text-blue-600 uppercase tracking-wider font-semibold">
                {t("technology.badge")}
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold mt-4 text-gray-900">
                {t("technology.title")}
              </h2>
              <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
                {t("technology.subtitle")}
              </p>
            </div>
          </RevealText>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[1, 2, 3, 4].map((num) => (
              <ParallaxWrapper key={num} offset={25}>
                <RevealText delay={(num - 1) * 0.15}>
                  <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {t(`technology.tech${num}.title`)}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t(`technology.tech${num}.desc`)}
                    </p>
                  </div>
                </RevealText>
              </ParallaxWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-6">
          <RevealText>
            <div className="text-center mb-20">
              <span className="text-sm text-blue-600 uppercase tracking-wider font-semibold">
                {t("culture.badge")}
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold mt-4 text-gray-900">
                {t("culture.title")}
              </h2>
              <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
                {t("culture.subtitle")}
              </p>
            </div>
          </RevealText>

          <div className="max-w-4xl mx-auto space-y-8">
            <ParallaxWrapper offset={30}>
              <RevealText>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t("culture.desc1")}
                </p>
              </RevealText>
            </ParallaxWrapper>

            <ParallaxWrapper offset={30}>
              <RevealText delay={0.2}>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t("culture.desc2")}
                </p>
              </RevealText>
            </ParallaxWrapper>

            <ParallaxWrapper offset={30}>
              <RevealText delay={0.4}>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  {t("culture.desc3")}
                </p>
              </RevealText>
            </ParallaxWrapper>

            <ParallaxWrapper offset={30}>
              <RevealText delay={0.6}>
                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {t("culture.benefits.title")}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <div key={num} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0" />
                        <p className="text-gray-700">{t(`culture.benefits.item${num}`)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealText>
            </ParallaxWrapper>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <RevealText>
            <div className="text-center mb-20">
              <span className="text-sm text-blue-600 uppercase tracking-wider font-semibold">
                {t("team.badge")}
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold mt-4 text-gray-900">
                {t("team.title")}
              </h2>
            </div>
          </RevealText>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <ParallaxWrapper key={member.name} offset={30}>
                <RevealText delay={idx * 0.2}>
                  <motion.div
                    className="group relative"
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <div className="aspect-3/4 rounded-2xl overflow-hidden mb-6 shadow-lg">
                      <div className="w-full h-full bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <span className="text-6xl font-bold text-gray-300">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-gray-900/80 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                        <p className="text-sm text-white italic">&quot;{member.quote}&quot;</p>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-gray-500">{member.role}</p>
                  </motion.div>
                </RevealText>
              </ParallaxWrapper>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
