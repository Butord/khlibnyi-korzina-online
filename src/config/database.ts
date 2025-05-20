
// Database configuration
export const DATABASE_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  database: process.env.DB_NAME || 'bakery_db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
};

// Flag to determine if we should use mock data or real database
// This will be useful when transitioning to MySQL
export const USE_MOCK_DATA = true;
