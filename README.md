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

## Groq API Integration

This project uses the Groq API for live company enrichment. To set this up locally:

1.  **Get a Groq API Key**: Create an account at [Groq Console](https://console.groq.com/) and generate an API key.
2.  **Environment Variables**: Create a `.env.local` file in the root directory (if it doesn't exist) and add your key:
    ```bash
    GROQ_API_KEY=your_groq_api_key_here
    ```
    > [!IMPORTANT]
    > Never prefix this variable with `NEXT_PUBLIC_` to ensure it stays server-side only.

## Vercel Deployment

When deploying to Vercel, you must add the `GROQ_API_KEY` to your project's environment variables:

1.  Go to your project in the **Vercel Dashboard**.
2.  Navigate to **Settings** → **Environment Variables**.
3.  Add a new variable:
    - **Key**: `GROQ_API_KEY`
    - **Value**: Your Groq API key.
4.  Click **Save**.
5.  Redeploy your application for the changes to take effect.

## Security Note

The enrichment logic runs strictly server-side in `src/app/api/enrich/route.ts`. The API key is never exposed to the browser, and web scraping is performed using standard fetch requests to public pages.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
