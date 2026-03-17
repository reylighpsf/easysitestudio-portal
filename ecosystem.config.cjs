module.exports = {
  apps: [
    {
      name: "easysites-portal",
      cwd: "/var/www/easysitestudio/easysitestudio-portal",
      script: "npm",
      args: "run dev",
      interpreter: "none",
      watch: false,
      autorestart: true,
      max_restarts: 10,
      restart_delay: 3000,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
