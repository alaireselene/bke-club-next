"use client";

import { NewsCard } from "@/features/news";
import type { News } from "../../types";

interface FeaturedNewsProps {
    news: News[];
}

export function FeaturedNews({ news }: FeaturedNewsProps) {
    const featuredArticles = news.filter(article => article.featured);

    return (
        <div className="space-y-4">
            <h2 className="font-sans text-2xl sm:text-3xl">Tin tức nổi bật</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {featuredArticles.length > 0 ? (
                    featuredArticles.map(article => (
                        <NewsCard key={article.id} news={article} />
                    ))
                ) : (
                    <p>Hiện chưa có tin tức nổi bật.</p>
                )}
            </div>
        </div>
    );
}
