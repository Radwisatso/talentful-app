module.exports = {
  apps: [
    {
      name: 'api-gateway',
      script: 'dist/apps/attendance-api-gateway/main.js',
      instances: 1,
      exec_mode: 'fork',
      env_file: '.env',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3000
      }
    },
    {
      name: 'employee-service',
      script: 'dist/apps/employee/main.js',
      instances: 1,
      exec_mode: 'fork',
      env_file: '.env',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3001
      }
    },
    {
      name: 'attendance-service',
      script: 'dist/apps/attendance/main.js',
      instances: 1,
      exec_mode: 'fork',
      env_file: '.env',
      env: {
        NODE_ENV: 'production',
        PORT: 3002
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3002
      }
    }
  ]
};