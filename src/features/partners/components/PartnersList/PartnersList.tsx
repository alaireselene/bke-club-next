"use client";

import { useState } from "react";
import { PartnerCard } from "../PartnerCard";
import type { RegionFilter, TypeFilter, PartnersListProps } from "./types";
import type { PartnerRegion, PartnerType } from "../../types";
import { MapPin, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button"; // Import Button

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
          <Button
            variant={selectedRegion === null ? "default" : "ghost"}
            size="sm"
            onClick={() => setSelectedRegion(null)}
          >
            <MapPin className="mr-2 h-4 w-4" /> {/* Added margin */}
            Tất cả khu vực
          </Button>
          {regions.map((region) => (
            <Button
              key={region.id}
              variant={selectedRegion === region.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedRegion(region.id)}
            >
              <region.icon className="mr-2 h-4 w-4" /> {/* Added margin */}
              {region.name}
            </Button>
          ))}
        </div>

        {/* Type Filter */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedType === null ? "default" : "ghost"}
            size="sm"
            onClick={() => setSelectedType(null)}
          >
            <Building2 className="mr-2 h-4 w-4" /> {/* Added margin */}
            Tất cả loại hình
          </Button>
          {types.map((type) => (
            <Button
              key={type.id}
              variant={selectedType === type.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedType(type.id)}
            >
              <type.icon className="mr-2 h-4 w-4" /> {/* Added margin */}
              {type.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Partners Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPartners.map((partner) => (
          <PartnerCard key={partner.id} partner={partner} />
        ))}

        {filteredPartners.length === 0 && (
          <div className="col-span-full text-center py-12 sm:py-16 text-muted-foreground bg-card rounded-lg border border-border"> {/* Use theme colors/border, adjusted padding */}
            <div className="text-4xl sm:text-5xl mb-4">🤝</div> {/* Adjusted size */}
            <p className="text-base sm:text-lg">Không tìm thấy đối tác nào phù hợp với bộ lọc.</p> {/* Adjusted size */}
          </div>
        )}
      </div>
    </div>
  );
}
