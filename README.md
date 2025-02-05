# Notifier

This application aims to let your close ones notified, that you are thinking about them.

## Running Locally

```shell
$ yarn install # install dependencies. Yarn is preferred
$ echo "NEXT_PUBLIC_BASE_URL=\"http://localhost:8000\"" >> .env # prepare the environmental variables
$ yarn dev # run the dev server
```

## Tech. Stack

### Frontend:

- Next.js: SSR/G
- React.js: UI library
- tailwindcss: styling
- shadcn/ui: component library
- RTK+Query: State management & data caching

written in Typescript 5.

### Backend:

- FastAPI: Opinionated web framework for Python
- Webpush: Push notification
- fastapi-pagination: Pagination plugin for FastAPI
- invoke: program management tool

written in Python 3.13
