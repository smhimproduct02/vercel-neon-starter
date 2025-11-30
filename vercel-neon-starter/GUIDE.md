# Vercel + Neon + GitHub Starter Guide

This guide will walk you through deploying a Next.js application with a serverless Postgres database.

## Prerequisites
- A [GitHub](https://github.com/) account.
- A [Vercel](https://vercel.com/) account (can sign up with GitHub).
- A [Neon](https://neon.tech/) account (can sign up with GitHub).

## Step 1: Push Code to GitHub

1.  **Initialize Git**:
    Open your terminal in the `vercel-neon-starter` folder and run:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```

2.  **Create a Repository**:
    - Go to GitHub and create a new repository named `vercel-neon-starter`.
    - **Do not** initialize with README, .gitignore, or License (we already have them).

3.  **Push Code**:
    Follow the instructions on GitHub to push your existing code:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/vercel-neon-starter.git
    git branch -M main
    git push -u origin main
    ```

## Step 2: Set up Neon Database

1.  **Create a Project**:
    - Log in to the Neon Console.
    - Click **New Project**.
    - Name it `vercel-neon-starter`.
    - Choose the latest Postgres version.
    - Click **Create Project**.

2.  **Get Connection String**:
    - Once created, you will see a **Connection Details** section.
    - Select **Prisma** from the dropdown menu (if available) or just copy the connection string.
    - It looks like: `postgres://user:password@ep-something.region.aws.neon.tech/neondb?sslmode=require`

## Step 3: Deploy to Vercel

1.  **Import Project**:
    - Log in to Vercel.
    - Click **Add New...** -> **Project**.
    - Select your `vercel-neon-starter` repository from GitHub.
    - Click **Import**.

2.  **Configure Environment Variables**:
    - In the **Environment Variables** section, add a new variable:
        - **Key**: `DATABASE_URL`
        - **Value**: Paste the connection string you copied from Neon.
    - Click **Add**.

3.  **Deploy**:
    - Click **Deploy**.
    - Vercel will build your application. This might take a minute.
    - Once done, you will see a "Congratulations!" screen.

## Step 4: Verify

1.  **Visit your Dashboard**:
    - Click on the screenshot of your app to visit the live URL.
    - You should see the "Vercel + Neon + GitHub Starter" page.
    - The database status might say "Not connected or empty" because we haven't run migrations yet.

2.  **Run Migrations (Cloud Way)**:
    - Since you don't have Node.js installed locally, we will tell Vercel to run the migrations for you.
    - Go to your Vercel Project **Settings** > **Build & Development Settings**.
    - Toggle **Override** for the **Build Command**.
    - Enter: `npx prisma migrate deploy && next build`
    - Click **Save**.
    - Go to **Deployments** and **Redeploy**.
    - This will apply your database schema to Neon every time you deploy.

## Local Development (If you install Node.js)

1.  Install dependencies: `npm install`
2.  Create a `.env` file with `DATABASE_URL=...`
3.  Run migrations: `npx prisma migrate dev --name init`
4.  Start server: `npm run dev`

## Troubleshooting

### Vercel Error: "No Output Directory named 'public' found"
This happens if Vercel doesn't recognize your project as a Next.js app.
1.  Go to **Settings** > **Build & Development Settings**.
2.  Check **Framework Preset**. It should be **Next.js**.
3.  If it says "Other" or something else, change it to **Next.js** and save.
4.  Redeploy.

### Vercel Error: 404 Not Found
This often happens if your code is in a subdirectory (like `vercel-neon-starter`) but Vercel expects it at the root.
1.  Go to **Settings** > **General**.
2.  Change **Root Directory** to `vercel-neon-starter`.
3.  Save and Redeploy.

