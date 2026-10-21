# docket-note-app
A micro interaction note app with framer motion and nextjs

## Development

This project uses Next.js App Router, TypeScript, Tailwind CSS, and ESLint.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Edit `src/app/page.tsx` to update the homepage.

## Checks and production

```bash
npm run lint
npm run build
npm start
```

Run `npm run typecheck` to generate route types and check the app with TypeScript 7.

### Tooling compatibility

TypeScript 7 is installed as `@typescript/native` and provides `tsc`. The
`typescript` dependency aliases Microsoft's TypeScript 6 compatibility package
for tools that require the JavaScript compiler API. This follows Microsoft's
[side-by-side setup](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript-6.0).

ESLint uses the latest 9.x release because the React plugins bundled with the
current Next.js ESLint configuration do not yet support ESLint 10.
