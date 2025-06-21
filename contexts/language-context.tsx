"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "ja"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Navigation
    home: "Home",
    about: "About",
    experience: "Experience",
    projects: "Projects",
    education: "Education",
    articles: "Articles",

    // Hero Section
    greeting: "Holla!",
    name: "Muhammad Alfarizi Tazkia",
    title: "Backend Engineer Enthusiast",
    downloadCV: "Download CV",
    learnMore: "Learn More",
    technicalSkills: "Technical Skills",

    // About Section
    whoAmI: "Who am I?",
    aboutDescription:
      "Certified TensorFlow Developer and Informatics Engineering graduate from Sumatera Institute of Technology (GPA 3.77). I specialize in Backend Development, thriving on solving complex technical challenges. Proficient in Python, Java, JavaScript, PHP, and TypeScript, with extensive experience in Spring Boot, Laravel, NodeJS, and database technologies including MySQL, PostgreSQL, MongoDB, and Oracle SQL.",

    // Experience Section
    workExperience: "Work Experience",
    keyAchievements: "Key Achievements:",
    learnMoreBtn: "Learn More",
    detailedContributions: "Detailed Contributions:",

    // Projects Section
    projectExperience: "Project Experience",
    visitWebsite: "Visit Website",
    privateProject: "Private Project",

    // Education Section
    educationTitle: "Education",
    certificate: "Certificate",
    transcript: "Transcript",
    tensorflowCert: "TensorFlow Developer Certifications",

    // Articles Section
    articlesTitle: "Latest Articles",
    viewAllArticles: "View All Articles",
    readMore: "Read More",
    postedBy: "Posted by",

    // Footer
    developedBy: "Developed by",

    // Theme
    darkMode: "Dark Mode",
    lightMode: "Light Mode",

    // Language
    language: "Language",
    english: "English",
    japanese: "Japanese",
  },
  ja: {
    // Navigation
    home: "ホーム",
    about: "私について",
    experience: "経験",
    projects: "プロジェクト",
    education: "学歴",
    articles: "記事",

    // Hero Section
    greeting: "こんにちは！",
    name: "ムハンマド・アルファリジ・タズキア",
    title: "バックエンドエンジニア",
    downloadCV: "履歴書ダウンロード",
    learnMore: "詳細を見る",
    technicalSkills: "技術スキル",

    // About Section
    whoAmI: "私について",
    aboutDescription:
      "スマトラ工科大学情報工学科卒業（GPA 3.77）、認定TensorFlow開発者です。バックエンド開発を専門とし、複雑な技術的課題の解決に情熱を注いでいます。Python、Java、JavaScript、PHP、TypeScriptに精通し、Spring Boot、Laravel、NodeJS、MySQL、PostgreSQL、MongoDB、Oracle SQLなどのデータベース技術において豊富な経験を持っています。",

    // Experience Section
    workExperience: "職歴",
    keyAchievements: "主な成果：",
    learnMoreBtn: "詳細を見る",
    detailedContributions: "詳細な貢献：",

    // Projects Section
    projectExperience: "プロジェクト経験",
    visitWebsite: "ウェブサイトを見る",
    privateProject: "プライベートプロジェクト",

    // Education Section
    educationTitle: "学歴",
    certificate: "証明書",
    transcript: "成績証明書",
    tensorflowCert: "TensorFlow開発者認定",

    // Articles Section
    articlesTitle: "最新記事",
    viewAllArticles: "すべての記事を見る",
    readMore: "続きを読む",
    postedBy: "投稿者",

    // Footer
    developedBy: "開発者",

    // Theme
    darkMode: "ダークモード",
    lightMode: "ライトモード",

    // Language
    language: "言語",
    english: "英語",
    japanese: "日本語",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    // Check if language is stored in localStorage
    const storedLanguage = localStorage.getItem("language") as Language
    if (storedLanguage && (storedLanguage === "en" || storedLanguage === "ja")) {
      setLanguage(storedLanguage)
    } else {
      // Auto-detect based on location/timezone
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      const isJapan = timezone.includes("Asia/Tokyo") || timezone.includes("Japan")
      const defaultLang = isJapan ? "ja" : "en"
      setLanguage(defaultLang)
      localStorage.setItem("language", defaultLang)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)["en"]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
