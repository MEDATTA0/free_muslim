-- Table des utilisateurs
-- Cette table stocke les informations de base sur chaque utilisateur du site.
-- Elle est essentielle pour identifier et gérer les comptes d 'utilisateur.
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    profile_picture VARCHAR(255),
    date_of_birth DATE,
    place_of_birth VARCHAR(100),
    phone_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP
);
-- Table des rôles
-- Cette table définit les différents rôles que les utilisateurs peuvent avoir,
-- comme "Admin", "Modérateur", ou "Posteur". 
-- Un rôle détermine les permissions et les responsabilités d'un utilisateur sur le site
CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);
-- Table de liaison utilisateur-rôle
-- Cette table sert de table de liaison pour gérer la relation plusieurs-à-plusieurs entre
-- les utilisateurs et les rôles.
-- Un utilisateur peut avoir plusieurs rôles, et un rôle peut être attribué à plusieurs
-- utilisateurs.
CREATE TABLE user_roles (
    user_id INT,
    role_id INT,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);
-- Table des posts
-- Cette table stocke les contenus que les utilisateurs publient sur le site, comme des articles,
-- des blogs, ou des messages. Elle est au cœur de la gestion du contenu.
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_published BOOLEAN DEFAULT TRUE,
    is_deleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE
    SET NULL
);
-- Table des commentaires
-- Cette table stocke les commentaires que les utilisateurs laissent sur les posts.
-- Elle est essentielle pour gérer les interactions et les discussions autour du contenu publié.
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT,
    user_id INT,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE
    SET NULL
);
-- Table des actions de modération
-- Cette table enregistre toutes les actions de modération prises par les modérateurs du site,
-- comme la suppression de posts, la suspension de comptes, etc.
-- Elle est cruciale pour maintenir un environnement sûr et conforme aux règles du site.
CREATE TABLE moderation_actions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    action_type VARCHAR(255) NOT NULL,
    target_type VARCHAR(255) NOT NULL,
    target_id INT NOT NULL,
    performed_by INT,
    reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (performed_by) REFERENCES users(id) ON DELETE
    SET NULL
);
-- Table des sessions utilisateurs
-- Cette table garde une trace des sessions de connexion des utilisateurs.
-- Elle est importante pour la gestion des connexions et la sécurité des comptes.
CREATE TABLE user_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    session_token VARCHAR(255) NOT NULL UNIQUE,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
-- Table des tokens de réinitialisation de mot de passe:
-- Cette table gère les tokens utilisés pour la réinitialisation des mots de passe.
-- Elle permet aux utilisateurs de réinitialiser leur mot de passe de manière sécurisée.
CREATE TABLE password_reset_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    token VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    is_used BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
-- Table des tokens de vérification d' e - mail:
-- Cette table gère les tokens utilisés pour la réinitialisation des mots de passe.
-- Elle permet aux utilisateurs de réinitialiser leur mot de passe de manière sécurisée.
CREATE TABLE email_verification_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    token VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    is_used BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
-- Table des logs d'audit:
-- Cette table enregistre les actions importantes pour des raisons d'audit et de sécurité, telles que les modifications de rôle, les actions sensibles, etc.
-- Elle est essentielle pour le suivi des actions critiques et la conformité.
CREATE TABLE audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(255) NOT NULL,
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE
    SET NULL
);
-- Table des biographies
CREATE TABLE biographies(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    place_of_birth VARCHAR(100) NOT NULL,
    date_of_death DATE,
    place_of_death VARCHAR(100),
    profession VARCHAR(255),
    nationality VARCHAR(50) NOT NULL,
    biography TEXT NOT NULL,
    picture_s_url VARCHAR(255),
    source VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE
    SET NULL,
        FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE
    SET NULL
);