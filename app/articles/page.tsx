"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/language-context";
import Link from "next/link";

export default function ArticlesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { language, t } = useLanguage();
  const [articleCategories, setArticleCategories] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const [articleRes, categoriesRes] = await Promise.all([
      fetch("/api/articles"),
      fetch("/api/article-categories"),
    ]);
    setArticleCategories(await categoriesRes.json());
    setArticles(await articleRes.json());
  };

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      (language == "en" ? article.title_en : article.title_jp)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (language == "en" ? article.description_en : article.description_jp)
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || article.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white pt-20 px-4 sm:px-6">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="text-cyan-400 hover:text-cyan-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            All Articles
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore my thoughts and insights on programming, technology, and
            software development.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/30 border-white/10 text-white"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className={
                selectedCategory === null
                  ? "bg-cyan-500 hover:bg-cyan-600"
                  : "border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10"
              }
            >
              All Categories
            </Button>
            {articleCategories.map((category: any) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={
                  selectedCategory === category.id
                    ? "bg-cyan-500 hover:bg-cyan-600"
                    : "bg-transparent border-cyan-400 text-cyan-400 hover:bg-white hover:text-black"
                }
              >
                <span className="mr-2">{category.icon}</span>
                {language == "en" ? category.name_en : category.name_jp}
              </Button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Link href={`/articles/${article.id}`}>
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

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">
              No articles found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
