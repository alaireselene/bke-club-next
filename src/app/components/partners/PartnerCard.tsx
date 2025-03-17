"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPinned, Globe } from "lucide-react";
import { motion } from "motion/react";
import type { Partner, PartnerRegion, PartnerType } from "@/types/wordpress";

interface PartnerCardProps {
  partner: Partner;
}

const regionLabels: Record<PartnerRegion, string> = {
  local: "Việt Nam",
  global: "Quốc tế",
};

const typeLabels: Record<PartnerType, string> = {
  academic: "Học thuật",
  business: "Doanh nghiệp",
  organization: "Tổ chức",
};

export function PartnerCard({ partner }: PartnerCardProps) {
  const region = partner.partnerData.region[0];
  const type = partner.partnerData.type[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={partner.partnerData.website}>
        <motion.article
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="group h-full bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden"
        >
          {partner.featuredImage?.node.sourceUrl && (
            <div className="relative h-32 w-full overflow-hidden bg-white">
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={partner.featuredImage.node.sourceUrl}
                  alt={partner.title}
                  fill
                  className="object-contain p-4"
                />
              </motion.div>
            </div>
          )}
          <div className="p-6">
            <div className="space-y-4">
              {/* Region & Type Tags */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-2"
              >
                {region && (
                  <motion.span
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600"
                  >
                    <MapPinned className="h-3 w-3" />
                    {regionLabels[region]}
                  </motion.span>
                )}
                {type && (
                  <motion.span
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                      delay: 0.1,
                    }}
                    className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600"
                  >
                    {typeLabels[type]}
                  </motion.span>
                )}
              </motion.div>

              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg font-semibold line-clamp-2 group-hover:text-cardinal-600 transition-colors"
              >
                {partner.title}
              </motion.h3>

              {partner.partnerData.website && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-2 text-sm text-slate-600"
                >
                  <Globe className="h-4 w-4 text-cardinal-500" />
                  <span className="truncate">
                    {new URL(partner.partnerData.website).hostname.replace(
                      "www.",
                      ""
                    )}
                  </span>
                </motion.div>
              )}
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}
