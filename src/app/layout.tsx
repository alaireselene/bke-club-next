import type {Metadata} from "next";
import "./globals.css";
import {Header} from "@/features/navbar/components";
import {Footer} from "@/components/layout/Footer";
import {Club, directus, School} from "@/lib/directus"; // Import directus client and School type
import {readItems} from "@directus/sdk"; // Import readItems function
import {Toaster} from "@/components/ui/sonner";
import {Analytics} from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { manrope, newsreader } from "./fonts";

export const revalidate = 60;

export const metadata: Metadata = {
    title: {
        default: "Mạng lưới CLB sinh viên nghiên cứu khoa học | HUST",
        template: "%s | HUST Research Clubs Network",
    },
    description:
        "Cổng thông tin của Mạng lưới CLB sinh viên nghiên cứu khoa học - Trung tâm Sáng tạo và Khởi nghiệp Sinh viên, Đại học Bách khoa Hà Nội",
    applicationName: "HUST Research Clubs Network Portal",
    authors: [{name: "BK Entrepreneurship Center"}],
    keywords: [
        "HUST",
        "Research Clubs",
        "Student Research",
        "Innovation",
        "Entrepreneurship",
        "Bách khoa Hà Nội",
        "CLB nghiên cứu",
    ],
    creator: "BK Entrepreneurship Center",
    publisher: "Hanoi University of Science and Technology",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    viewport: {
        width: "device-width",
        initialScale: 1,
        maximumScale: 1,
        userScalable: false,
    },
};

async function getNavigationData() {
    try {
        // Fetch schools and clubs in parallel
        const [schoolsData, clubsData] = await Promise.all([
            directus.request(readItems('school', {
                fields: ['*'],
                limit: -1
            })),
            directus.request(readItems('club', {
                fields: ['*'],
                limit: -1
            }))
        ]);

        const unsortedSchools = schoolsData as School[];
        const clubs = clubsData as Array<Club>;

        // Group clubs by school_id
        const clubsBySchool = clubs.reduce((acc, club) => {
            const schoolId = typeof club.school_id === 'number' ? club.school_id : 0;
            if (!acc[schoolId]) {
                acc[schoolId] = [];
            }
            acc[schoolId].push(club);
            return acc;
        }, {} as Record<number, typeof clubs>);

        // Add clubs to schools and apply sorting logic
        const schools = [
            ...unsortedSchools
                .filter((school) => school.name?.startsWith("Trường") ?? false)
                .map(school => ({
                    ...school,
                    clubs: clubsBySchool[school.id] || []
                })),
            ...unsortedSchools
                .filter((school) => school.name?.startsWith("Khoa") ?? false)
                .map(school => ({
                    ...school,
                    clubs: clubsBySchool[school.id] || []
                })),
            ...unsortedSchools
                .filter((school) =>
                    !(school.name?.startsWith("Trường") ?? false) &&
                    !(school.name?.startsWith("Khoa") ?? false)
                )
                .map(school => ({
                    ...school,
                    clubs: clubsBySchool[school.id] || []
                }))
        ];

        return {schools};
    } catch (error) {
        console.error("Error fetching navigation data:", error);
        return {schools: []};
    }
}

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const {schools} = await getNavigationData();

    return (
        <html lang="vi">
        <body
            className="bg-gradient-to-br from-white via-navy-50/10 to-cardinal-50/10 antialiased selection:bg-cardinal-600/10 selection:text-cardinal-900">
        <div
            className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"/>

        <div className="flex min-h-screen flex-col">
            <Header schools={schools}/>

            {/* Main Content */}
            <main className={`${manrope.variable} ${newsreader.variable} flex-grow transition-all duration-300`}>
                <div className="w-full">
                    {children}
                    <Analytics/>
                    <SpeedInsights />
                </div>
            </main>

            <Footer/>
        </div>
        <Toaster position="top-center" closeButton richColors/>
        </body>
        </html>
    );
}
