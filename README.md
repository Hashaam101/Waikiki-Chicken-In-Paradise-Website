## Project Origin

This website was initially cloned from Sun Tea's site {which is based on TableTurnerr's Stack Website}, but it is now the official website for Waikiki Chicken In Paradise.

# Waikiki Chicken In Paradise Website

This site is now the official website for **Waikiki Chicken In Paradise**, a client of TableTurnerr. It is a modern, responsive web app built with Next.js and Tailwind CSS.


## Features & Sections

- **Animated Header & Navigation**: Smooth navigation with animated buttons and section scrolling.
- **Menu & Reviews**: Interactive menu cards, drag-to-scroll, and customer reviews.
- **Custom Review Popup**: Users can rate, leave feedback, and (optionally) provide a phone number. Reviews are validated (min 3 words, max 300, phone format) and submitted directly to a Google Sheet via a secure webhook. Multi-phase UI with sending/sent/confirmation states for a smooth experience. [View the live sheet here.](https://docs.google.com/spreadsheets/d/1AHVK5s7O1gm4Tg9zCI8e-NYa8dytvfta7jBKE3-HrwI/)
- **FAQ & Story**: Dynamic FAQ section and brand story.
- **Location & Contact**: Easy access to location info and call-to-action buttons.
- **Instagram Feed**: Displays recent Instagram posts and reels in a grid or carousel layout.

## Instagram Feed Section

For managing and displaying Instagram media, we recommend using the [Insta-Thumbnails-Importer](https://github.com/Hashaam101/Insta-Thumbnails-Importer) tool:

> **Insta-Thumbnails-Importer** is a Python script for downloading Instagram post thumbnails as `.jpg` images and reels as `.gif` files (first 5 seconds, looped). It clears the output directory before each run, shows progress bars, and outputs a TypeScript file with post metadata for easy integration. No login required for public posts/reels.

See the tool's repo for setup and usage instructions.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Cart Backup & Restore

This repository's `main` branch has the cart functionality removed for the production build. A complete backup of the cart implementation is preserved on a branch named `feature/cart` so the cart can be restored or iterated on later.

Quick facts
- Backup branch: `feature/cart`
- Files that contained cart functionality (examples):
	- `src/components/CartOverlay.tsx` (removed from `main`)
	- `src/app/menu/page.tsx` (cart state and handlers removed)
	- `src/components/ProductCard.tsx` (cart props removed)

How to inspect the backup branch

```bash
# fetch remote branches


# show files changed between main and the backup
To learn more about Next.js, take a look at the following resources:

# inspect the branch locally (no changes to main)

# or simply
# git checkout feature/cart
```

How to restore the cart (options)

Option A — Restore by merging the backup into main (recommended if you want the whole cart back):

```bash
# get latest
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
# create a temporary branch from main to merge into
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
# merge the backup branch

# resolve conflicts, test locally (npm run dev), then push
You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
# open a PR from restore/cart -> main when ready
```

Option B — Restore specific files from the backup branch (if you want selective restoration):

```bash
# ensure you are on main or a new branch based off main

# restore specific files from the backup branch
## Deploy on Vercel
# commit and test

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

```

Notes & recommendations
- I preserved the cart code on `feature/cart`; do not delete that branch unless you intentionally want to discard the backup.
- Prefer merging to a temporary branch and opening a PR to run CI/tests and review changes before merging into `main`.
- After restoring, run the app locally and test the user flow (menu, add/remove cart, overlay behavior).

If you want, I can also:
- Open a PR from `feature/cart` into `main` (or `restore/cart`) and include a short description.
- Create a small test script or checklist for smoke-testing the cart flow after restore.

```
Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
