/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['*.replit.dev', '*.kirk.replit.dev', '*.replit.app'],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'ALLOWALL' },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors *"
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
