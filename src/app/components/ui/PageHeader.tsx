interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({
  title,
  description,
  className = "",
}: PageHeaderProps) {
  return (
    <div className={`bg-base-200 py-8 ${className}`}>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-neutral-content">{title}</h1>
        {description && (
          <p className="mt-2 text-base-content/70">{description}</p>
        )}
      </div>
    </div>
  );
}
