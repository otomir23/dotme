# otomir23/dotme

[otomir23.me](https://otomir23.me) is my personal website with my portfolio, socials,
blog and biography. 

- Made with `NextJS`, `TailwindCSS` and `TypeScript`.
- Built with `React Server Components` and works with JS disabled in browser.
- Uses `Vercel Postgres` database through `DrizzleORM`.

## Local development

### Setup
- Clone the repo and install dependencies using [`pnpm`](https://pnpm.io).
  ```bash
  git clone https://github.com/otomir23/dotme
  pnpm install
  ```
- Create a [`Vercel Postgres`](https://vercel.com/storage/postgres) database.
- Configure env variables based on [`.env.example`](.env.example).

### Scripts

- `dev`: Starts the development server.
- `build`: Builds the app for production.
- `start`: Runs the built app in production mode.
- `lint`: Runs ESLint.
- `db:push`: Update Vercel Postgres database schema
- `db:studio`: Open Drizzle Studio
