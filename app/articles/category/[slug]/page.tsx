"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { getArticlesByCategory, articleCategories } from "@/data/articles";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { language } = useLanguage();
  const [articles, setArticles] = useState<any[]>([]);
  const [category, setCategory] = useState<any>(null);

   useEffect(() => {
    const loadCategory = async () => {
      const res = await fetch("/api/article-categories/" + slug);
      if (!res.ok) return setCategory(null);

      const data = await res.json();
      setCategory(data);
    };

    if (slug) loadCategory();
  }, [slug]);
  
  
  // Ambil kategori berdasarkan article.category_id
  useEffect(() => {
    const loadArticle = async () => {
      if (category?.id) {
        const res = await fetch("/api/articles?category_id=" + category.id);
        if (res.ok) {
          const data = await res.json();
          setArticles(data);
        }
      }
    };

    loadArticle();
  }, [category]); // akan jalan hanya jika `article` berubah

  if (!category) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center text-gray-300"
    >
      <div className="flex flex-col items-center space-y-4">
        <svg
          className="animate-spin h-10 w-10 text-cyan-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
        <p className="text-lg">Loading category...</p>
      </div>
    </motion.div>
  );
}


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white pt-20 px-4 sm:px-6">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/articles">
            <Button
              variant="ghost"
              size="sm"
              className="text-cyan-400 hover:text-cyan-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div
              className={`p-4 rounded-full ${category.color} text-white text-3xl`}
            >
              {category.icon}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {language == "en" ? category.name_en : category.name_jp}
            </h1>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {language == "en" ? category.description_en : category.description_id}
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Link href={`/articles/${article.slug}`}>
                <Card className="bg-black/30 backdrop-blur-xl border-white/10 hover:border-cyan-400/30 transition-all duration-300 h-full cursor-pointer group">
                  <CardContent className="p-0">
                    <img
                      src={article.thumbnail || "/placeholder.svg"}
                      alt={language == "en" ? article.title_en : article.title_jp}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors mb-2 line-clamp-2">
                        {language == "en" ? article.title_en : article.title_jp}
                      </h3>

                      <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{article.publishedDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{article.readTime} min</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-300 line-clamp-3">
                        {language == "en" ? article.description_en : article.description_jp}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">
              No articles found in this category yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
