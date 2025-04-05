CREATE DATABASE exam;

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
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (companyId) REFERENCES Company(id),
    FOREIGN KEY (postedBy) REFERENCES Users(id)
);

CREATE TYPE application_status AS ENUM ('submitted', 'reviewed', 'interviewing', 'hired', 'rejected');
CREATE TABLE application (
    id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
    jobId UUID NOT NULL,
    userId UUID NOT NULL,
    resumeUrl VARCHAR(255),
    coverLetter TEXT,
    status application_status NOT NULL DEFAULT 'submitted',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (jobId) REFERENCES JobListing(id),
    FOREIGN KEY (userId) REFERENCES Users(id)
);

CREATE TYPE review_status AS ENUM ('approved', 'pending', 'rejected')
CREATE TABLE review (
    id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
    companyId UUID NOT NULL,
    userId UUID NOT NULL,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    status review_status NOT NULL DEFAULT 'pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (companyId) REFERENCES Company(id),
    FOREIGN KEY (userId) REFERENCES Users(id)
);

