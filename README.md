# meshflow-backend

Express + TypeScript REST API backend with Keycloak authentication, Redis sessions, and MySQL via Drizzle ORM.

## Requirements

- Node.js 24.15.0
- MySQL (local)
- Redis (local)
- Keycloak server

## Setup

```bash
npm install
```

Create a `.env` file in the root:

```env
PORT=3000
NODE_ENV=development

# MySQL
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=yourdbname

# Redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_SECRET=yoursecret

# Keycloak
KEYCLOAK_URL=http://localhost:8080
KEYCLOAK_REALM=yourrealm
KEYCLOAK_CLIENTID=yourclientid
KEYCLOAK_PRIVATE_KEY=yourrealmPublicKey
KEYCLOAK_PORT=0
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled output |
| `npm run migration:generate` | Generate Drizzle migrations from schema |
| `npm run migration:run` | Apply pending migrations to MySQL |
| `npm run seed` | Run database seed script |

## Project Structure

```
src/
  index.ts                   # App entry — middleware wiring, server start
  keycloak-config.ts         # Keycloak client setup (bearer-only)
  type.ts                    # Shared TypeScript types
  constant.ts                # App-wide constants
  db/
    data-source.ts           # Drizzle db instance (MySQL pool)
    schema.ts                # Drizzle table definitions
    migrate.ts               # Migration runner
    seed.ts                  # Seed script
  features/
    v1/
      index.ts               # Versioned router (dev/prod route split)
      scripts/
        scripts.routes.ts    # GET /v1/scripts/
        scripts.controllers.ts
  middlewares/
    rbac.ts                  # Role-based access control (Keycloak + JWT)
    error-handler.ts         # ApiError class + global error middleware
    morgan.ts                # HTTP request loggers
    multer.ts                # File upload config
    success-handler.ts       # Success response formatter
  helpers/
    logger.ts                # Winston logger (console + file)
    common.ts                # Shared helper functions
    batch-processor.ts       # Batch processing utilities
  services/
    queue/
      interface.ts           # Queue service interface
      queue-service.ts       # Queue service stub (not yet implemented)
  utils/
    api-error.ts             # ApiError utility
redis-session.ts             # Redis session + store (shared with Keycloak)
```

## API Routes

All routes are prefixed with `/v1`.

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/v1/scripts/` | — | Dummy script endpoint |

## Authentication

Routes are protected using Keycloak in bearer-only mode. Apply the `Rbac` middleware to require specific roles:

```ts
import Rbac, { IRoles } from '../middlewares/rbac';

router.get('/admin-only', Rbac([IRoles.ADMIN]), controller);
```

The middleware validates the Keycloak token and checks `resource_access` roles for the configured client.

## Database

Schema is defined in `src/db/schema.ts` using Drizzle ORM. After modifying the schema:

```bash
npm run migration:generate   # generates SQL in drizzle/
npm run migration:run        # applies migrations to MySQL
```

## Logging

Winston logs to:
- Console (colorized in development)
- `logs/error.log` — error level only
- `logs/all.log` — all levels
