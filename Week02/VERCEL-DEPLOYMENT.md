# Deploying to Vercel

This guide provides step-by-step instructions for deploying your full-stack Go/React authentication system to Vercel.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. [Vercel CLI](https://vercel.com/download) installed
   ```bash
   npm install -g vercel
   ```
3. Your project should have the `vercel.json` file at the root of your repository

## Important Considerations

### Database Persistence

Vercel's serverless functions are stateless, which means:

- The SQLite database in `/tmp/users.db` will be temporary and may be lost between function invocations
- For a production application, consider using:
  - A managed database service (like PostgreSQL on Railway, Supabase, etc.)
  - Or implement a caching mechanism

### Environment Variables

Set up the following environment variables in your Vercel project:

1. `JWT_SECRET`: A secure random string for JWT token signing
   
To set up environment variables:
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add each key-value pair

## Deployment Steps

### 1. Preparing Your Project

Ensure your project structure matches what's configured in `vercel.json`:

```
.
├── backend/        # Your Go backend
├── frontend/       # Your React frontend
└── vercel.json     # Vercel configuration
```

### 2. Login to Vercel

Run the following command and follow the prompts to log in:

```bash
vercel login
```

### 3. Deploy the Project

From the root directory of your project, run:

```bash
vercel
```

During deployment, Vercel will:
- Ask if you want to link to an existing project or create a new one
- Confirm the project settings
- Deploy your application

### 4. Production Deployment

When you're ready to deploy to production:

```bash
vercel --prod
```

## Troubleshooting

### 1. Backend API Routes Not Working

- Check that your frontend is correctly calling the API endpoints with the right URL
- Ensure your API routes are correctly configured in `vercel.json`
- Check the logs in your Vercel dashboard for any errors

### 2. Frontend Not Building

- Check the build logs in your Vercel dashboard
- Ensure all dependencies are correctly listed in `package.json`

### 3. Database Connectivity Issues

- Remember that SQLite on Vercel is ephemeral - data will be lost between function invocations
- Consider migrating to a persistent database service

## Updating Your Deployment

To deploy updates to your application:

1. Push changes to your connected repository (if using Git integration)
2. Or run `vercel` again from your local project directory

## Monitoring and Logs

Vercel provides detailed logs and monitoring:

1. Go to your Vercel dashboard
2. Select your project
3. Click on "Deployments" to see all deployments
4. Select a specific deployment to view detailed logs 