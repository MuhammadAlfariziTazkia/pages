"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  Youtube,
  Download,
  ExternalLink,
  ChevronDown,
  Code,
  Database,
  Server,
  Zap,
  ArrowRight,
  Calendar,
  Clock,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/language-context";
import Link from "next/link";

const socialLinks = [
  { icon: Github, href: "https://github.com/MuhammadAlfariziTazkia", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/muhammad-alfarizi-tazkia/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/muhammadalfarizi.t/", label: "Instagram" },
  { icon: Mail, href: "mailto:muhammadalfarizi.t@gmail.com", label: "Email" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<number | null>(
    null
  );
  const { language, setLanguage, t } = useLanguage();
  const [loading, setLoading] = useState(true);
  // Dynamic data states
  const [skills, setSkills] = useState<any[]>([]);
  const [workExperiences, setWorkExperiences] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [articleCategories, setArticleCategories] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    setIsLoaded(true);
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [
        skillsRes,
        workExpRes,
        projectsRes,
        educationRes,
        categoriesRes,
        articlesRes,
      ] = await Promise.all([
        fetch("/api/skills"),
        fetch("/api/work-experiences"),
        fetch("/api/projects"),
        fetch("/api/education"),
        fetch("/api/article-categories"),
        fetch("/api/articles"),
      ]);

      const [
        skillsData,
        workExpData,
        projectsData,
        educationData,
        categoriesData,
        articlesData,
      ] = await Promise.all([
        skillsRes.json(),
        workExpRes.json(),
        projectsRes.json(),
        educationRes.json(),
        categoriesRes.json(),
        articlesRes.json(),
      ]);

      setSkills(skillsData);
      setWorkExperiences(workExpData);
      setProjects(projectsData);
      setEducation(educationData);
      setArticleCategories(categoriesData);
      setArticles(articlesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  const latestArticles = articles.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-x-hidden transition-colors duration-300">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-xl border-b border-white/10"
      >
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex justify-center flex-1">
              <div className="flex space-x-2 sm:space-x-8 overflow-x-auto">
                {[
                  "home",
                  "about",
                  "experience",
                  "projects",
                  "education",
                  "articles",
                ].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`relative px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-300 hover:text-cyan-400 whitespace-nowrap ${
                      activeSection === section
                        ? "text-cyan-400"
                        : "text-white/70"
                    }`}
                  >
                    {t(section)}
                    {activeSection === section && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Controls */}
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguage("en")}
                className={`p-2 text-xs ${
                  language === "en" ? "text-cyan-400" : "text-white/70"
                }`}
              >
                EN
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguage("ja")}
                className={`p-2 text-xs ${
                  language === "ja" ? "text-cyan-400" : "text-white/70"
                }`}
              >
                JP
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6"
      >
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -50 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 text-center lg:text-left"
            >
              <div className="space-y-4">
                <motion.h1
                  className="text-4xl sm:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {t("greeting")}
                </motion.h1>
                <motion.h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-semibold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  I am <span className="text-cyan-400">{t("name")}</span>
                </motion.h2>
                <motion.p
                  className="text-lg sm:text-xl text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {t("title")}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 sm:px-8 py-3 rounded-full">
                  <Download className="w-4 h-4 mr-2" />
                  {t("downloadCV")}
                </Button>
                <Button
                  variant="outline"
                  className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-6 sm:px-8 py-3 rounded-full"
                  onClick={() => scrollToSection("about")}
                >
                  {t("learnMore")}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex justify-center lg:justify-start space-x-4"
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/10 hover:bg-cyan-400/20 transition-all duration-300 hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative order-first lg:order-last"
            >
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <img
                  src="/profil.jpg?height=320&width=320"
                  alt="Muhammad Alfarizi Tazkia"
                  className="relative z-10 w-full h-full object-cover rounded-full border-4 border-cyan-400/50"
                />
              </div>
            </motion.div>
          </div>

          {/* Skills Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-12 lg:mt-16"
          >
            <Card className="bg-black/30 backdrop-blur-xl border-white/10">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-cyan-400">
                  {t("technicalSkills")}
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.4 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Badge
                        className={`${skill.color} text-white px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium`}
                      >
                        <span className="mr-2">{skill.icon}</span>
                        {skill.name}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {t("whoAmI")}
            </h2>
            <div className="max-w-4xl mx-auto">
              <Card className="bg-black/30 backdrop-blur-xl border-white/10">
                <CardContent className="p-6 sm:p-8">
                  <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                    {t("aboutDescription")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {t("workExperience")}
            </h2>
          </motion.div>

          {/* Horizontal Scrolling Experience Cards */}
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-4 horizontal-scroll snap-x snap-mandatory">
              {workExperiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-80 sm:w-96 snap-start"
                >
                  <Card className="bg-black/30 backdrop-blur-xl border-white/10 hover:border-cyan-400/30 transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={exp.logo || "/placeholder.svg"}
                          alt={exp.company}
                          className="w-12 h-12 rounded-lg bg-white/10 p-2"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-cyan-400">
                            {exp.company}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {language == "en" ? exp.type_en : exp.type_jp}
                          </p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-base font-semibold text-white mb-1">
                          {language == "en" ? exp.position_en : exp.position_jp}
                        </h4>
                        <Badge className="bg-gray-700/50 text-gray-300 border-gray-600/30 text-xs">
                          {exp.period}
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-300 mb-4 line-clamp-3">
                        {language == "en" ? exp.description_en : exp.description_jp}
                      </p>

                      <div className="mb-4">
                        <h5 className="text-sm font-medium text-cyan-400 mb-2">
                          {t("keyAchievements")}
                        </h5>
                        <div className="flex flex-wrap gap-1">
                          {(language == "en"
                            ? exp.keyAchievements_en
                            : exp.keyAchievements_jp
                          )
                            .split(", ")
                            .map((achievement: string, i: number) => (
                              <Badge
                                key={i}
                                className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs"
                              >
                                {achievement}
                              </Badge>
                            ))}
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 text-sm"
                        onClick={() => setSelectedExperience(index)}
                      >
                        {t("learnMoreBtn")}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Experience Detail Modal */}
          {selectedExperience !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedExperience(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-cyan-400">
                      {language == "en" ? workExperiences[selectedExperience].position_en : workExperiences[selectedExperience].position_jp}
                    </h3>
                    <h4 className="text-xl text-white">
                      {workExperiences[selectedExperience].company}
                    </h4>
                    <p className="text-gray-400">
                      {language == "en" ? workExperiences[selectedExperience].type_en : workExperiences[selectedExperience].type_jp}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedExperience(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </Button>
                </div>

                <Badge className="bg-gray-700/50 text-gray-300 border-gray-600/30 mb-4">
                  {workExperiences[selectedExperience].period}
                </Badge>

                <p className="text-gray-300 mb-6">
                  {
                    workExperiences[selectedExperience].fullDescription[
                      language
                    ]
                  }
                </p>

                <h5 className="text-lg font-semibold text-cyan-400 mb-4">
                  {t("detailedContributions")}
                </h5>
                <ul className="space-y-3">
                  {(language == "en"
                    ? workExperiences[selectedExperience]
                        .detailed_achievements_en
                    : workExperiences[selectedExperience]
                        .detailed_achievements_jp
                  )
                    .split(", ")
                    .map((achievement: string, i: number) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-gray-300"
                      >
                        <Zap className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                        <span className="text-sm">{achievement}</span>
                      </li>
                    ))}
                </ul>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {t("projectExperience")}
            </h2>
          </motion.div>

          {/* Horizontal Scrolling Project Cards */}
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-4 horizontal-scroll snap-x snap-mandatory">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-80 sm:w-96 snap-start"
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="bg-black/30 backdrop-blur-xl border-white/10 hover:border-cyan-400/30 transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Code className="w-6 h-6 text-cyan-400" />
                        <h3 className="text-lg sm:text-xl font-bold text-cyan-400">
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-blue-300 mb-4 text-sm">
                        {language == "en" ? project.role_en : project.role_jp}
                      </p>
                      <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                        {language == "en" ? project.description_en : project.description_jp}
                      </p>
                      {project.isPublic ? (
                        <Button
                          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-sm"
                          onClick={() => window.open(project.link, "_blank")}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {t("visitWebsite")}
                        </Button>
                      ) : (
                        <Button
                          variant="secondary"
                          className="w-full text-sm"
                          disabled
                        >
                          {t("privateProject")}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section id="articles" className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {t("articlesTitle")}
            </h2>
          </motion.div>

          {/* Article Categories */}
          <div className="mb-12">
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-8 text-cyan-400">
              Categories
            </h3>
            <div className="relative">
              <div className="flex gap-6 overflow-x-auto pb-4 horizontal-scroll snap-x snap-mandatory">
                {articleCategories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex-shrink-0 w-72 snap-start"
                  >
                    <Link href={`/articles/category/${category.id}`}>
                      <Card className="bg-black/30 backdrop-blur-xl border-white/10 hover:border-cyan-400/30 transition-all duration-300 h-full cursor-pointer group">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div
                              className={`p-3 rounded-full ${category.color} text-white text-2xl`}
                            >
                              {category.icon}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-lg font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                                {language == "en"
                                  ? category.name_en
                                  : category.name_jp}
                              </h4>
                              <Badge className="bg-gray-700/50 text-gray-300 border-gray-600/30 text-xs">
                                {category.articleCount} articles
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-gray-300 mb-4">
                            {language == "en"
                              ? category.description_en
                              : category.description_jp}
                          </p>
                          <div className="flex items-center text-cyan-400 text-sm group-hover:text-cyan-300 transition-colors">
                            <span>View Articles</span>
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Latest Articles */}
          <div>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-cyan-400">
                Latest Articles
              </h3>
              <Link href="/articles">
                <Button
                  variant="outline"
                  className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10"
                >
                  {t("viewAllArticles")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Link href={`/articles/${article.slug}`}>
                    <Card className="bg-black/30 backdrop-blur-xl border-white/10 hover:border-cyan-400/30 transition-all duration-300 h-full cursor-pointer group">
                      <CardContent className="p-0">
                        <img
                          src={process.env.NEXT_PUBLIC_BACKEND + article.thumbnail || "/placeholder.svg"}
                          alt={language == "en" ? article.title_en : article.title_jp}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="p-6">
                          <h4 className="text-lg font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors mb-2 line-clamp-2">
                            {language == "en" ? article.title_en : article.title_jp}
                          </h4>

                          <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              <span>Muhammad Alfarizi Tazkia</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{article.published_date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{article.read_time} min</span>
                            </div>
                          </div>

                          <p className="text-sm text-gray-300 mb-4 line-clamp-3">
                            {language == "en" ? article.description_en : article.description_jp}
                          </p>

                          <div className="flex items-center text-cyan-400 text-sm group-hover:text-cyan-300 transition-colors">
                            <span>{t("readMore")}</span>
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {t("educationTitle")}
            </h2>
          </motion.div>

          <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/30 backdrop-blur-xl border-white/10">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                    <div className="p-3 rounded-full bg-cyan-400/20 w-fit">
                      <Database className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <Badge className="bg-gray-700/50 text-gray-300 border-gray-600/30 mb-2">
                        August 2018 - August 2022
                      </Badge>
                      <h3 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-2">
                        Institut Teknologi Sumatera
                      </h3>
                      <p className="text-base sm:text-lg text-white">
                        Informatics Engineering, GPA 3.77 / 4.00
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="bg-blue-500 hover:bg-blue-600">
                      <Download className="w-4 h-4 mr-2" />
                      {t("certificate")}
                    </Button>
                    <Button className="bg-yellow-500 hover:bg-yellow-600">
                      <Download className="w-4 h-4 mr-2" />
                      {t("transcript")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/30 backdrop-blur-xl border-white/10">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                    <div className="p-3 rounded-full bg-cyan-400/20 w-fit">
                      <Server className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <Badge className="bg-gray-700/50 text-gray-300 border-gray-600/30 mb-2">
                        August 2018 - August 2022
                      </Badge>
                      <h3 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-2">
                        Bangkit Academy Led By Google, Gojek, Tokopedia, and
                        Traveloka
                      </h3>
                      <p className="text-base sm:text-lg text-white">
                        Machine Learning, GPA 4.00 / 4.00
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="bg-blue-500 hover:bg-blue-600">
                      <Download className="w-4 h-4 mr-2" />
                      {t("certificate")}
                    </Button>
                    <Button className="bg-yellow-500 hover:bg-yellow-600">
                      <Download className="w-4 h-4 mr-2" />
                      {t("tensorflowCert")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black/50 backdrop-blur-xl border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-400">
            {t("developedBy")}{" "}
            <span className="text-cyan-400 font-semibold">{t("name")}</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
