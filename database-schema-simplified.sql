-- Simplified Portfolio Website Database Schema
-- Designed for PostgreSQL

-- Users table (for admin authentication only)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Personal information table
CREATE TABLE personal_info (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_en VARCHAR(255) NOT NULL,
    name_ja VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    title_ja VARCHAR(255) NOT NULL,
    bio_en TEXT NOT NULL,
    bio_ja TEXT NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    location VARCHAR(255),
    profile_image_url VARCHAR(500),
    cv_url_en VARCHAR(500),
    cv_url_ja VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Skills table
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(50),
    color VARCHAR(50),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Social links table
CREATE TABLE social_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    platform VARCHAR(50) NOT NULL, -- 'github', 'linkedin', 'instagram', 'email', 'youtube'
    url VARCHAR(500) NOT NULL,
    icon VARCHAR(50),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Work experiences table
CREATE TABLE work_experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company VARCHAR(255) NOT NULL,
    position_en VARCHAR(255) NOT NULL,
    position_ja VARCHAR(255) NOT NULL,
    period VARCHAR(100) NOT NULL, -- e.g., "Sept 2022 - Present"
    type_en VARCHAR(100) NOT NULL, -- e.g., "Financial Technology"
    type_ja VARCHAR(100) NOT NULL,
    logo_url VARCHAR(500),
    description_en TEXT,
    description_ja TEXT,
    key_achievements_en TEXT[], -- Array of achievements
    key_achievements_ja TEXT[], -- Array of achievements
    full_description_en TEXT,
    full_description_ja TEXT,
    detailed_achievements_en TEXT[],
    detailed_achievements_ja TEXT[],
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Education table
CREATE TABLE education (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_name VARCHAR(255) NOT NULL,
    degree_en VARCHAR(255) NOT NULL,
    degree_ja VARCHAR(255) NOT NULL,
    period VARCHAR(100) NOT NULL, -- e.g., "August 2018 - August 2022"
    gpa VARCHAR(50), -- e.g., "3.77 / 4.00"
    description_en TEXT,
    description_ja TEXT,
    certificate_url VARCHAR(500),
    transcript_url VARCHAR(500),
    icon VARCHAR(50), -- for display icon
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Projects table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    role_en VARCHAR(255) NOT NULL,
    role_ja VARCHAR(255) NOT NULL,
    description_en TEXT NOT NULL,
    description_ja TEXT NOT NULL,
    project_url VARCHAR(500),
    is_public BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Article categories table
CREATE TABLE article_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_en VARCHAR(255) NOT NULL,
    name_ja VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description_en TEXT,
    description_ja TEXT,
    icon VARCHAR(50),
    color VARCHAR(50),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Articles table
CREATE TABLE articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title_en VARCHAR(500) NOT NULL,
    title_ja VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    description_en TEXT NOT NULL,
    description_ja TEXT NOT NULL,
    content_en TEXT NOT NULL,
    content_ja TEXT NOT NULL,
    category_id UUID REFERENCES article_categories(id) ON DELETE SET NULL,
    author VARCHAR(255) NOT NULL,
    thumbnail_url VARCHAR(500),
    published_date DATE NOT NULL,
    read_time INTEGER, -- in minutes
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Contact messages table
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(500),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_articles_category ON articles(category_id);
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_published_date ON articles(published_date DESC);
CREATE INDEX idx_article_categories_slug ON article_categories(slug);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_personal_info_updated_at BEFORE UPDATE ON personal_info FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_social_links_updated_at BEFORE UPDATE ON social_links FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_work_experiences_updated_at BEFORE UPDATE ON work_experiences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_education_updated_at BEFORE UPDATE ON education FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_article_categories_updated_at BEFORE UPDATE ON article_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for personal info
INSERT INTO personal_info (
    name_en, name_ja, title_en, title_ja, bio_en, bio_ja, email, phone, location
) VALUES (
    'Muhammad Alfarizi Tazkia',
    'ムハンマド・アルファリジ・タズキア',
    'Backend Engineer Enthusiast',
    'バックエンドエンジニア',
    'Certified TensorFlow Developer and Informatics Engineering graduate from Sumatera Institute of Technology (GPA 3.77). I specialize in Backend Development, thriving on solving complex technical challenges. Proficient in Python, Java, JavaScript, PHP, and TypeScript, with extensive experience in Spring Boot, Laravel, NodeJS, and database technologies including MySQL, PostgreSQL, MongoDB, and Oracle SQL.',
    'スマトラ工科大学情報工学科卒業（GPA 3.77）、認定TensorFlow開発者です。バックエンド開発を専門とし、複雑な技術的課題の解決に情熱を注いでいます。Python、Java、JavaScript、PHP、TypeScriptに精通し、Spring Boot、Laravel、NodeJS、MySQL、PostgreSQL、MongoDB、Oracle SQLなどのデータベース技術において豊富な経験を持っています。',
    'muhammadalfarizi.t@gmail.com',
    '+62-xxx-xxxx-xxxx',
    'Indonesia'
);
