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

2.  **Run Migrations (Optional for now)**:
    - To create the tables in your production database, you can run this locally if you have Node.js installed:
      ```bash
      npx prisma migrate deploy
      ```
    - *Note: You need to set the `DATABASE_URL` in your local `.env` file to your Neon connection string to do this.*

## Local Development (If you install Node.js)

1.  Install dependencies: `npm install`
2.  Create a `.env` file with `DATABASE_URL=...`
3.  Run migrations: `npx prisma migrate dev --name init`
4.  Start server: `npm run dev`
