"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/language-context";
import { getArticleById, articleCategories } from "@/data/articles";
import Link from "next/link";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const { language } = useLanguage();
  const [article, setArticle] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);

  // Ambil artikel berdasarkan slug
  useEffect(() => {
    const loadArticle = async () => {
      const res = await fetch("/api/articles/" + slug);
      if (!res.ok) return setArticle(null);

      const data = await res.json();
      setArticle(data);
    };

    if (slug) loadArticle();
  }, [slug]);

  // Ambil kategori berdasarkan article.category_id
  useEffect(() => {
    const loadCategory = async () => {
      if (article?.category_id) {
        const res = await fetch(
          "/api/article-categories/" + article.category_id
        );
        if (res.ok) {
          const data = await res.json();
          setCategory(data);
        }
      }
    };

    loadCategory();
  }, [article]); // akan jalan hanya jika `article` berubah

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white pt-20 px-4 sm:px-6">
      <div className="container mx-auto py-8 max-w-4xl">
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

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          {/* Thumbnail */}
          <img
            src={process.env.NEXT_PUBLIC_BACKEND + article.thumbnail || "/placeholder.svg"}
            alt={language == "en" ? article.title_en : article.title_jp}
            className="w-full h-64 sm:h-80 object-cover rounded-lg mb-6"
          />

          {/* Category Badge */}
          {category && (
            <div className="flex items-center gap-2 mb-4">
              <Badge className={`${category.color} text-white px-3 py-1`}>
                <span className="mr-2">{category.icon}</span>
                {language == "en" ? category.name_en : category.name_jp}
              </Badge>
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            {language == "en" ? article.title_en : article.title_jp}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Muhammad Alfarizi Tazkia</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{article.published_date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{article.read_time} min read</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-cyan-400 hover:text-cyan-300"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-300 leading-relaxed">
            {language == "en" ? article.description_en : article.description_jp}
          </p>
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="bg-black/30 backdrop-blur-xl border-white/10">
            <CardContent className="p-8">
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold text-cyan-400 mb-6">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-bold text-cyan-400 mb-4 mt-8">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-bold text-cyan-400 mb-3 mt-6">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {children}
                      </p>
                    ),
                    code: ({ children }) => (
                      <code className="bg-gray-800 px-2 py-1 rounded text-cyan-400">
                        {children}
                      </code>
                    ),
                    pre: ({ children }) => (
                      <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4">
                        {children}
                      </pre>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => <li className="mb-1">{children}</li>,
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-cyan-400 pl-4 italic text-gray-400 mb-4">
                        {children}
                      </blockquote>
                    ),
                  }}
                >
                  {language == "en" ? article.content_en : article.content_jp}
                </ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Related Articles or Back to Category */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center"
        >
          {category && (
            <Link href={`/articles/category/${category.id}`}>
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                More {language == "en" ? category.name_en : category.name_jp}{" "}
                Articles
              </Button>
            </Link>
          )}
        </motion.div>
      </div>
    </div>
  );
}
