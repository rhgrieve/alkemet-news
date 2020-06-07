A Hacker News clone made with [Next.js](https://nextjs.org/) and [Tailwind.css](https://tailwindcss.com/)

## Getting Started

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Architecture

### Pages

#### pages/[[...page]].js

- Uses Next.js optional catch-all dynamic routes (experimental) to load paginated results

```text
ex.
localhost:3000/ : page 1
localhost:3000/2 : page 2
```

#### pages/[id].js

- Loads story view by ID
- Init comment load

### Components

#### components/Comment.js

- Loads comment data by ID
- Recursively builds nested comment structure

## TODO

### Views/Components

- [x] Top stories list
- [x] Story detail view
- [x] Comment view
- [x] Nested comment recursive component
- [ ] User view
- [ ] Componentize views
- [ ] Implement React.Suspense at listing + story level

### Performance

- [ ] Load nested comments at story level
- [ ] Caching

## Resources

[Hacker News API](https://github.com/HackerNews/API)

[Next.js](https://nextjs.org/)

[Tailwind.css](https://tailwindcss.com/)
