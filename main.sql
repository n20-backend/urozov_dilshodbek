+CREATE DATABASE exam;

CREATE TABLE company (
    id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    website VARCHAR(255),
    location VARCHAR(255),
    industry VARCHAR(255),
    size INTEGER,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO company (name, description, website, location, industry, size)
VALUES 
('TechNova', 'Innovative software solutions for modern businesses.', 'https://www.technova.com', 'San Francisco, CA', 'Software', 250),

('EcoBuild', 'Sustainable construction and eco-friendly architecture.', 'https://www.ecobuild.org', 'Austin, TX', 'Construction', 120),

('MediCore', 'Healthcare technology for patient data management.', 'https://www.medicorehealth.com', 'Boston, MA', 'Healthcare', 300),

('FinScope', 'Financial tools and analytics for enterprises.', 'https://www.finscope.io', 'New York, NY', 'Finance', 500),

('EduSpark', 'Online learning platform with interactive courses.', 'https://www.eduspark.com', 'Seattle, WA', 'Education', 90),

('GreenLeaf', 'Organic food delivery and sustainable farming.', 'https://www.greenleaffoods.com', 'Portland, OR', 'Agriculture', 60),

('AutoEdge', 'Next-gen automotive technology and AI systems.', 'https://www.autoedge.tech', 'Detroit, MI', 'Automotive', 1000),

('CloudNest', 'Cloud storage and infrastructure solutions.', 'https://www.cloudnest.net', 'Denver, CO', 'Cloud Computing', 350),

('RetailMate', 'Retail analytics and inventory management tools.', 'https://www.retailmate.com', 'Chicago, IL', 'Retail', 150),

('GameForge', 'Indie game development studio.', 'https://www.gameforge.dev', 'Los Angeles, CA', 'Gaming', 45);

CREATE TYPE user_role AS ENUM ('job_seeker', 'recruiter', 'admin');
CREATE TYPE user_status AS ENUM ('active', 'inactive');
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role user_role NOT NULL,
    status user_status NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
);

INSERT INTO users (email, username, password, role, status, createdAt) 
VALUES 
    ('jobseeker1@example.com', 'job_seeker1', 'hashed_password_1', 'job_seeker', 'active', NOW()),
    ('jobseeker2@example.com', 'job_seeker2', 'hashed_password_2', 'job_seeker', 'inactive', NOW()),
    ('recruiter1@example.com', 'recruiter1', 'hashed_password_3', 'recruiter', 'active', NOW()),
    ('recruiter2@example.com', 'recruiter2', 'hashed_password_4', 'recruiter', 'inactive', NOW()),
    ('admin1@example.com', 'admin1', 'hashed_password_5', 'admin', 'active', NOW());


CREATE TYPE job_listing_status AS ENUM ('open', 'closed');
CREATE TABLE job_listing (
    id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    companyId UUID NOT NULL,
    location VARCHAR(255),
    salaryRange JSONB NOT NULL,
    requirements JSONB,
    status job_listing_status NOT NULL,
    postedBy UUID NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (companyId) REFERENCES company(id) ON DELETE CASCADE,
    FOREIGN KEY (postedBy) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO job_listing (
  title, description, companyId, location, salaryRange, requirements, status, postedBy
) VALUES
('Frontend Developer', 'React va Tailwind bilan ishlay oladigan developer kerak.', 
 (SELECT id FROM company limit 1), 'Tashkent', 
 '{"min": 1000, "max": 2000}', '["React", "Tailwind", "REST APIs"]', 'open', 
 (SELECT id FROM users limit 1)),

('Backend Developer', 'Node.js va PostgreSQL bo''yicha tajribali dasturchi.', 
 (SELECT id FROM company limit 1 OFFSET 1), 'Samarkand', 
 '{"min": 1200, "max": 2500}', '["Node.js", "PostgreSQL", "Docker"]', 'open', 
 (SELECT id FROM users LIMIT 1 OFFSET 1)),

('DevOps Engineer', 'CI/CD va AWS bo''yicha malakali mutaxassis.', 
 (SELECT id FROM company limit 1 OFFSET 2), 'Remote', 
 '{"min": 2000, "max": 3000}', '["AWS", "Terraform", "CI/CD"]', 'open', 
 (SELECT id FROM users LIMIT 1 OFFSET 2)),

('QA Engineer', 'Test yozish, avtomatlashtirish.', 
 (SELECT id FROM company limit 1 OFFSET 3), 'Bukhara', 
 '{"min": 1000, "max": 1800}', '["Selenium", "Cypress", "Manual Testing"]', 'closed', 
 (SELECT id FROM users LIMIT 1 OFFSET 3)),

('Full Stack Developer', 'Frontend va Backendni birday qamrab oladigan dasturchi.', 
 (SELECT id FROM company limit 1 OFFSET 4), 'Tashkent', 
 '{"min": 1500, "max": 2800}', '["React", "Node.js", "MongoDB"]', 'open', 
 (SELECT id FROM users LIMIT 1 OFFSET 4));



CREATE TYPE application_status AS ENUM ('submitted', 'reviewed', 'interviewing', 'hired', 'rejected');
CREATE TABLE application (
    id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
    jobId UUID NOT NULL,
    userId UUID NOT NULL,
    resumeUrl VARCHAR(255),
    coverLetter TEXT,
    status application_status NOT NULL DEFAULT 'submitted',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (jobId) REFERENCES job_listing(id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO application (
  jobId, userId, resumeUrl, coverLetter, status
) VALUES
((SELECT id FROM job_listing LIMIT 1), (SELECT id  FROM users LIMIT 1),
 'https://example.com/resumes/john_doe.pdf', 'I am excited to apply for this role.', 'submitted'),

((SELECT id FROM job_listing LIMIT 1 OFFSET 1), (SELECT id  FROM users LIMIT 1 OFFSET 1),
 'https://example.com/resumes/jane_smith.pdf', 'Looking forward to contributing to your team.', 'reviewed'),

((SELECT id FROM job_listing LIMIT 1 OFFSET 2), (SELECT id  FROM users LIMIT 1 OFFSET 2),
 'https://example.com/resumes/ali_khan.pdf', 'Please find my resume attached.', 'interviewing'),

((SELECT id FROM job_listing LIMIT 1 OFFSET 3), (SELECT id  FROM users LIMIT 1 OFFSET 3),
 'https://example.com/resumes/sara_lee.pdf', 'I believe I am a great fit for this position.', 'hired'),

((SELECT id FROM job_listing LIMIT 1 OFFSET 4), (SELECT id  FROM users LIMIT 1 OFFSET 4),
 'https://example.com/resumes/mike_tyson.pdf', 'This opportunity perfectly aligns with my skills.', 'rejected');


CREATE TYPE review_status AS ENUM ('approved', 'pending', 'rejected');
CREATE TABLE review (
    id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
    companyId UUID NOT NULL,
    userId UUID NOT NULL,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    status review_status NOT NULL DEFAULT 'pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (companyId) REFERENCES Company(id)  ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES Users(id)  ON DELETE CASCADE
);

INSERT INTO review (
  companyId, userId, rating, comment, status
) VALUES
((SELECT id FROM company LIMIT 1), (SELECT id FROM users LIMIT 1),
 5, 'Juda yaxshi kompaniya. Ish muhitidan mamnunman.', 'approved'),

((SELECT id FROM company LIMIT 1 OFFSET 1), (SELECT id FROM users LIMIT 1 OFFSET 1),
 4, 'Rahbariyat yaxshi, lekin ish yuklamasi ko''p.', 'pending'),

((SELECT id FROM company LIMIT 1 OFFSET 2), (SELECT id FROM users LIMIT 1 OFFSET 2),
 3, 'O''rtacha tajriba. Yaxshi ham, yomon ham emas.', 'rejected'),

((SELECT id FROM company LIMIT 1 OFFSET 3), (SELECT id FROM users LIMIT 1 OFFSET 3),
 2, 'Vaqtida ish haqi to''lanmaydi. Yaxshilanish kerak.', 'pending'),

((SELECT id FROM company LIMIT 1 OFFSET 4), (SELECT id FROM users LIMIT 1 OFFSET 4),
 5, 'Zo''r jamoa va yaxshi rahbariyat!', 'approved');
