"use client";

import { Resource } from "../types";
import { ResourceCard } from "./ResourceCard";
import { ResourceDialog } from "./ResourceDialog";
import { useState } from "react";

interface ResourceGridProps {
  resources: Resource[];
}

export const ResourceGrid = ({ resources }: ResourceGridProps) => {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <ResourceCard
            key={resource.id} // Use Directus primary key 'id'
            resource={resource}
            onOpen={setSelectedResource}
          />
        ))}
      </div>

      {selectedResource && (
        <ResourceDialog
          resource={selectedResource}
          isOpen={!!selectedResource}
          onClose={() => setSelectedResource(null)}
        />
      )}
    </>
  );
};
