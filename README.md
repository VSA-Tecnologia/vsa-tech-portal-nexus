# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/e80bb646-99dc-4fce-ab3a-02671b4bb7fc

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/e80bb646-99dc-4fce-ab3a-02671b4bb7fc) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/e80bb646-99dc-4fce-ab3a-02671b4bb7fc) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Environment variables

Copy `.env.example` to `.env` and provide the values for your Supabase project:

```sh
cp .env.example .env
```

The variables are:

- `VITE_SUPABASE_URL` – URL of your Supabase project
- `VITE_SUPABASE_ANON_KEY` – public anon key

## Supabase setup

Install the [Supabase CLI](https://supabase.com/docs/guides/cli) and either run a local stack or connect to the hosted instance.

### Local database

```sh
supabase start
```

### Connect to the hosted project

```sh
supabase link --project-ref yeoddtpsfmufpvfmnski
```

After linking you can run migrations with `supabase db push`.

## Running the app

Install dependencies and start the development server:

```sh
npm install
npm run dev
```
