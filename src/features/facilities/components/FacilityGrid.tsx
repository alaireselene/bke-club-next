"use client";

import { Facility } from "../types";
import { FacilityCard } from "./FacilityCard";
import { FacilityDialog } from "./FacilityDialog";
import { useState } from "react";

interface FacilityGridProps {
  facilities: Facility[];
}

export const FacilityGrid = ({ facilities }: FacilityGridProps) => {
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(
    null
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((facility) => (
          <FacilityCard
            key={facility.id} // Use Directus primary key 'id'
            facility={facility}
            onOpen={setSelectedFacility}
          />
        ))}
      </div>

      {selectedFacility && (
        <FacilityDialog
          facility={selectedFacility}
          isOpen={!!selectedFacility}
          onClose={() => setSelectedFacility(null)}
        />
      )}
    </>
  );
};
