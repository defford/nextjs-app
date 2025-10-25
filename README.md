# Defford Tech Website

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Real-time Chess Setup

The chess game uses Pusher Channels for real-time move synchronization across multiple browsers.

### Environment Setup

1. Create a Pusher app at [https://dashboard.pusher.com/](https://dashboard.pusher.com/)
2. Copy `env.example` to `.env.local`
3. Fill in your Pusher credentials:

```bash
cp env.example .env.local
```

Required environment variables:
- `PUSHER_APP_ID` - Your Pusher app ID
- `PUSHER_KEY` - Your Pusher key
- `PUSHER_SECRET` - Your Pusher secret
- `PUSHER_CLUSTER` - Your Pusher cluster (default: us2)
- `NEXT_PUBLIC_PUSHER_KEY` - Same as PUSHER_KEY (for client-side)
- `NEXT_PUBLIC_PUSHER_CLUSTER` - Same as PUSHER_CLUSTER (for client-side)

### How it Works

- **Before**: Client polls API every 500ms for updates
- **After**: Client makes move → API updates state → Pusher broadcasts to all connected clients instantly

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
