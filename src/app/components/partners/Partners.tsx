"use client";

import { motion } from "motion/react";
import { PartnerCard } from "./PartnerCard";
import type { Partner } from "@/types/wordpress";

interface PartnersProps {
  partners: Partner[];
}

export function Partners({ partners }: PartnersProps) {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white"></div>

        {/* Hexagon Grid Pattern */}
        <svg
          width="100%"
          height="100%"
          className="absolute inset-0 opacity-[0.03]"
        >
          <pattern
            id="hexagon-pattern"
            x="0"
            y="0"
            width="50"
            height="44"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(30)"
          >
            <path
              d="M25,0 L50,14.433756729740645 L50,43.30127018922193 L25,57.735026918962575 L0,43.30127018922193 L0,14.433756729740645 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hexagon-pattern)" />
        </svg>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-gradient-to-br from-navy-500/5 to-transparent"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-gradient-to-br from-cardinal-500/5 to-transparent"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center px-4 py-1.5 mb-3 rounded-full bg-sunflower-50 text-sunflower-600 text-sm font-medium"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-sunflower-500 mr-2"></span>
            Đối tác
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold mb-6 bg-gradient-to-r from-sunflower-600 to-sunflower-400 bg-clip-text text-transparent"
          >
            Đơn vị đồng hành
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Kết nối và phát triển cùng các đối tác chiến lược
          </motion.p>
        </div>

        {/* Partners Grid */}
        {partners.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 h-[280px]">
              {partners
                .filter((partner) => partner.featuredImage)
                .slice(0, 4)
                .map((partner, index) => (
                  <motion.div
                    key={partner.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 * index }}
                    className="h-full"
                  >
                    <PartnerCard partner={partner} />
                  </motion.div>
                ))}
            </div>
            {partners.length > 4 && (
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="text-center mt-8 text-slate-600"
              >
                Và {partners.length - 4} đối tác khác
              </motion.p>
            )}
          </>
        ) : (
          <div className="text-center py-16 text-base-content/60 bg-white/50 rounded-xl backdrop-blur-sm border border-slate-200/60">
            <div className="text-5xl mb-4">🤝</div>
            <p>Chưa có đối tác nào.</p>
          </div>
        )}

        {/* Join Us Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <a
            href="/contact"
            className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-full bg-gradient-to-r from-sunflower-500 to-sunflower-400 text-white font-semibold shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-sunflower-400 focus:ring-offset-2"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-sunflower-500 to-sunflower-400"></span>
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2)_0%,transparent_50%)]"></span>
            <span className="absolute -end-full -start-full top-1/2 h-48 -translate-y-1/2 translate-x-0 bg-white/10 transition-all duration-500 ease-out group-hover:translate-x-full"></span>
            <span className="relative">Trở thành đối tác</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
