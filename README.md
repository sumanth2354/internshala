# Smart Leads Dashboard

A production-ready full-stack CRM application for managing sales leads, built with the MERN stack and TypeScript.

## Tech Stack

### Backend
- **Runtime**: Node.js 20 + Express.js
- **Language**: TypeScript
- **Database**: MongoDB Atlas + Mongoose
- **Auth**: JWT + bcryptjs
- **Validation**: Zod
- **Security**: helmet, cors, express-rate-limit
- **Utilities**: json2csv

### Frontend
- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: TailwindCSS v3 (dark mode)
- **Routing**: React Router DOM v6
- **State/Data**: TanStack Query (React Query v5)
- **HTTP**: Axios
- **Forms**: React Hook Form + Zod
- **Icons**: lucide-react
- **Toasts**: react-toastify

## Features

- **JWT authentication** (login/register) with role-based access control (Admin/Sales)
- **Full CRUD operations** for leads (Admin only for create/edit/delete)
- **Advanced filtering**: status, source, text search, sort
- **Paginated leads table** (10 per page)
- **Dark mode** with system preference detection
- **CSV export** with current filters
- **Responsive design** for all screen sizes
- **Stats bar** showing lead counts by status

## Project Structure

```
project/
├── server/                # Express API
│   ├── src/
│   │   ├── config/        # DB connection
│   │   ├── controllers/   # Route handlers
│   │   ├── middleware/     # Auth, RBAC, error handling
│   │   ├── models/        # Mongoose schemas
│   │   ├── routes/        # Express routes
│   │   ├── types/         # TypeScript interfaces
│   │   └── utils/         # Helpers (CSV, response, async)
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── client/                # React SPA
│   ├── src/
│   │   ├── api/           # Axios client + API functions
│   │   ├── components/    # UI, layout, leads components
│   │   ├── context/       # Auth + Theme providers
│   │   ├── hooks/         # React Query + custom hooks
│   │   ├── pages/         # Login, Register, Dashboard
│   │   ├── types/         # TypeScript interfaces
│   │   └── utils/         # Constants
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   ├── tailwind.config.ts
│   └── tsconfig.json
├── docker-compose.yml
├── .env.example
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 20+
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### 1. Clone & Setup Environment

```bash
# Clone the repository
git clone <repo-url>
cd smart-leads-dashboard

# Copy environment files
cp .env.example .env
cp server/.env.example server/.env
cp client/.env.example client/.env
# Edit each .env with your values
```

### 2. Start the Backend

```bash
cd server
npm install
npm run dev
```

Server runs at: `http://localhost:5000`

### 3. Start the Frontend

```bash
cd client
npm install
npm run dev
```

Client runs at: `http://localhost:3000`

## Docker Deployment

```bash
# Copy and configure env
cp .env.example .env
# Edit .env with production values

# Build and start all services
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## API Reference

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login |
| GET | `/api/auth/me` | Yes | Get current user |

### Leads

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/api/leads` | Yes | Any | Get paginated leads with filters |
| POST | `/api/leads` | Yes | Admin | Create lead |
| GET | `/api/leads/:id` | Yes | Any | Get single lead |
| PUT | `/api/leads/:id` | Yes | Admin | Update lead |
| DELETE | `/api/leads/:id` | Yes | Admin | Delete lead |
| GET | `/api/leads/export/csv` | Yes | Admin | Export leads as CSV |

### Query Parameters for GET /api/leads

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | `New\|Contacted\|Qualified\|Lost` | Filter by status |
| `source` | `Website\|Instagram\|Referral` | Filter by source |
| `search` | string | Text search on name and email |
| `sort` | `latest\|oldest` | Sort order |
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 10) |

### Response Format

```json
// Success
{ "success": true, "message": "...", "data": { ... } }

// Error
{ "success": false, "message": "...", "error": "..." }
```

## Lead Statuses

| Status | Color | Badge Class |
|--------|-------|-------------|
| New | Blue | `bg-blue-100 text-blue-700` |
| Contacted | Yellow | `bg-yellow-100 text-yellow-700` |
| Qualified | Green | `bg-green-100 text-green-700` |
| Lost | Red | `bg-red-100 text-red-700` |

## Environment Variables

### Server (`server/.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | 5000 | Server port |
| `NODE_ENV` | No | development | Environment mode |
| `MONGO_URI` | **Yes** | — | MongoDB connection string |
| `JWT_SECRET` | **Yes** | — | JWT signing secret |
| `JWT_EXPIRES_IN` | No | 7d | Token expiry |
| `CLIENT_URL` | No | http://localhost:3000 | Frontend URL for CORS |

### Client (`client/.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_API_URL` | **Yes** | http://localhost:5000/api | Backend API base URL |

## User Roles

| Role | Permissions |
|------|------------|
| **Admin** | View, create, edit, delete leads. Export CSV. |
| **Sales** | View leads only. |

## Scripts

### Server

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run production build |

### Client

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## License

MIT
