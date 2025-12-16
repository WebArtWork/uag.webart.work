# NGX Platform Client (Angular 21)

Angular 21 app built with standalone components, zoneless change detection, and the Wacom platform services (routing meta, CRUD helpers, signals-first state). The project ships with ready-to-use UI libraries, feature modules, and example pages for guest, public, user, and admin flows.

## Prerequisites

- Node 20+ and npm 10+ (Angular CLI 21 is provided locally via devDependencies)
- Chrome/Chromium for Playwright E2E (install once with `npx playwright install` if browsers are missing)

## Getting Started

```sh
npm install          # install dependencies
npm start            # serves on http://localhost:4200 with proxy.conf.json
```

Environments live in `src/environments/`:

- `environment.ts` for local development (extends `environment.prod.ts`)
- `environment.prod.ts` for production builds (API URL, meta tags, languages, defaults)

## Scripts

- `npm start` – run the dev server with proxying to the configured API URL
- `npm run build` – production build to `dist/`
- `npm run test` – unit tests with Jest
- `npm run e2e` – Playwright end-to-end tests (ensure browsers are installed)

## Project Structure (key paths)

- `src/app/app.config.ts` – root providers (zoneless change detection, Wacom config, TinyMCE, router)
- `src/app/app.routes.ts` – route map for public, guest, user, and admin areas
- `src/app/layouts/` – layout shells for public/guest/user routes
- `src/app/pages/` – routed pages per role (`guest/sign`, `public/components`, `user/profile`)
- `src/app/modules/` – feature domains (auth/users with guards, translate flows, bird sample CRUD)
- `src/app/libs/` – reusable UI building blocks (alert, button, file picker/cropper, form builder, input, modal, select, table, etc.)
- `src/app/form-components/` + `src/app/app.formcomponents.ts` – template registry for the dynamic form system
- `src/app/page-components/` – marketing/section blocks (hero, stats, gallery, pagination, etc.)
- `src/app/icons/` – icon packs used across the UI
- `src/environments/` – API/meta/language configuration

## Development Notes

- Components are standalone and use signals; favor `computed`/`signal`/`effect` plus OnPush change detection.
- Wacom services power guards (`MetaGuard`), CRUD helpers, store/http access, and meta tags. Update `environment.meta` when changing branding.
- Dynamic form templates must be registered in `FORM_TEMPLATE_COMPONENTS` so schemas can reference them by name.
- Auth/user settings (roles, themes, defaults) and language options come from the environment files; update those when wiring to a new backend.

## Component Structure

Keep component classes consistent in this order:

1. Injections (via `inject()`)
2. Inputs / outputs / view queries
3. Variables (readonly/public first, then private)
4. Constructor (only when needed)
5. Lifecycle hooks (`ngOnInit`, `ngOnDestroy`, etc.)
6. Functions (public, then private)

### Naming Conventions

- Private variables and functions start with an underscore (`_`).
- Services injected in constructors should follow:
  ```ts
  public configService: ConfigService
  private _configService: ConfigService
  ```

## WAW CLI Helpers

Scaffolding commands (requires global `waw` CLI):

- `waw add MODULENAME` – creates a module with interfaces, services, pages, selectors, form-components, and forms
- `waw page ROLE PAGENAME` – creates a page under a specific role
- `waw service SERVICENAME` – creates a service in the `services` folder

Examples:

```sh
waw add user
waw page user dashboard
waw service user
```

## Contributing

1. Fork and create a feature branch.
2. Keep changes aligned with the existing standalone + signals pattern.
3. Add or update tests where relevant (`npm run test` / `npm run e2e`).
4. Open a pull request.
   . Create a new branch for your feature.
5. Follow the coding guidelines outlined in this document.
6. Submit a pull request for review.
