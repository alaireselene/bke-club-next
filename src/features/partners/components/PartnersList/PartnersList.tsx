"use client";

import { useState } from "react";
import { PartnerCard } from "../PartnerCard";
import type { RegionFilter, TypeFilter, PartnersListProps } from "./types";
import type { PartnerRegion, PartnerType } from "../../types";
import { MapPin, Building2 } from "lucide-react";

const regions: RegionFilter[] = [
  { id: "local", name: "Việt Nam", icon: MapPin },
  { id: "global", name: "Quốc tế", icon: MapPin },
];

const types: TypeFilter[] = [
  { id: "academic", name: "Học thuật", icon: Building2 },
  { id: "business", name: "Doanh nghiệp", icon: Building2 },
  { id: "organization", name: "Tổ chức", icon: Building2 },
];

export function PartnersList({ partners }: PartnersListProps) {
  const [selectedRegion, setSelectedRegion] = useState<PartnerRegion | null>(
    null
  );
  const [selectedType, setSelectedType] = useState<PartnerType | null>(null);

  const filteredPartners = partners.filter((partner) => {
    const matchesRegion =
      !selectedRegion || partner.region === selectedRegion; // Use direct property access
    const matchesType =
      !selectedType || partner.type === selectedType; // Use direct property access
    return matchesRegion && matchesType;
  });

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Region Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedRegion(null)}
            className={`btn btn-sm ${
              selectedRegion === null ? "btn-primary" : "btn-ghost"
            }`}
          >
            <MapPin className="h-4 w-4" />
            Tất cả khu vực
          </button>
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => setSelectedRegion(region.id)}
              className={`btn btn-sm ${
                selectedRegion === region.id ? "btn-primary" : "btn-ghost"
              }`}
            >
              <region.icon className="h-4 w-4" />
              {region.name}
            </button>
          ))}
        </div>

        {/* Type Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedType(null)}
            className={`btn btn-sm ${
              selectedType === null ? "btn-primary" : "btn-ghost"
            }`}
          >
            <Building2 className="h-4 w-4" />
            Tất cả loại hình
          </button>
          {types.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`btn btn-sm ${
                selectedType === type.id ? "btn-primary" : "btn-ghost"
              }`}
            >
              <type.icon className="h-4 w-4" />
              {type.name}
            </button>
          ))}
        </div>
      </div>

      {/* Partners Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPartners.map((partner) => (
          <PartnerCard key={partner.id} partner={partner} />
        ))}

        {filteredPartners.length === 0 && (
          <div className="col-span-full text-center py-16 text-base-content/60 bg-white/50 rounded-xl backdrop-blur-sm border border-slate-200/60">
            <div className="text-5xl mb-4">🤝</div>
            <p>Không tìm thấy đối tác nào phù hợp với bộ lọc.</p>
          </div>
        )}
      </div>
    </div>
  );
}
