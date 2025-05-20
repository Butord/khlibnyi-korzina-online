
// Database configuration
export const DATABASE_CONFIG = {
  host: import.meta.env.VITE_DB_HOST || 'localhost',
  port: parseInt(import.meta.env.VITE_DB_PORT || '3306', 10),
  database: import.meta.env.VITE_DB_NAME || 'bakery_db',
  user: import.meta.env.VITE_DB_USER || 'root',
  password: import.meta.env.VITE_DB_PASSWORD || '',
};

// Flag to determine if we should use mock data or real database
// This will be useful when transitioning to MySQL
export const USE_MOCK_DATA = true;
