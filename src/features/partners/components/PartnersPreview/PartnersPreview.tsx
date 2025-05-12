import Link from "next/link"; // Import Link
import { Button } from "@/components/ui/button"; // Import Button
import Image from "next/image"; // Import Next Image
import { directus } from "@/lib/directus";
import type { Partner } from "@/lib/directus";
import { readItems } from "@directus/sdk";

async function getPartners() {
  const response = await directus.request(
    readItems('partner', {
      fields: ['*'],
    })
  )
  return response as Partner[]
}

export default async function PartnersPreview() {
  const partners = await getPartners()

  // Filter partners that have a logo and construct the image URL
  const partnersWithLogos = partners
    .filter((partner) => partner.logo)
    .map((partner) => ({
      ...partner,
      logoUrl: `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${partner.logo}`,
    }));

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden bg-gradient-to-b from-background to-muted/20">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-secondary/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-accent/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Đơn vị đồng hành
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kết nối và phát triển cùng các đối tác chiến lược
          </p>
        </div>

        {/* Partners Grid */}
        {partnersWithLogos.length > 0 ? (
          <div className="relative mt-12">
            {/* Gradient fade edges */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

            {/* Auto-scrolling container */}
            <div className="overflow-hidden">
              <div className="flex flex-nowrap w-max animate-scroll space-x-16 py-8 hover:pause-animation">
                {[...partnersWithLogos, ...partnersWithLogos].map((partner, index) => (
                  <div
                    key={`${partner.id}-${index}`}
                    className="flex-shrink-0 group"
                  >
                    <a
                      href={partner.website_url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block transition-all duration-300 hover:scale-110"
                      title={partner.name}
                    >
                      <div className="relative p-4 rounded-xl bg-card/50 backdrop-blur-sm transition-colors duration-300">
                        <Image
                          src={partner.logoUrl}
                          alt={`${partner.name} logo`}
                          width={160}
                          height={80}
                          className="h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground bg-card/50 backdrop-blur-sm rounded-2xl border border-border">
            <div className="text-5xl mb-4">🤝</div>
            <p className="text-lg">Chưa có đối tác nào.</p>
          </div>
        )}

        {/* Join Us Button */}
        <div className="mt-16 text-center">
          <Link href="/contact" passHref>
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-content px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/20"
            >
              Trở thành đối tác
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
