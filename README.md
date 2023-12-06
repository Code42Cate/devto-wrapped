# Dev.to wrapped 2023

Source Code for https://devto-wrapped.sliplane.app

This is based on my [hackathon starter template](https://github.com/Code42Cate/hackathon-starter).

It includes:

- [Next.js](https://nextjs.org/) for the frontend
- [shadcn/ui](https://ui.shadcn.com/) for the UI component library
- [Docker](https://www.docker.com/) for containerization
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- And some more of the usual goodies such as prettier, eslint, etc.

## Use this locally

Clone the repository:

```sh
git clone https://github.com/Code42Cate/devto-wrapped.git
```


Install dependencies:

```sh
pnpm install
```

Start the web app:

```sh
pnpm run dev --filter web
```

### Add ui components

Use the pre-made script:

```sh
pnpm install # if you haven't already
pnpm ui:add <component-name>
```

> This works just like the add command in the `shadcn/ui` CLI.

### Docker

Build the image:

```sh
docker build -t devto-wrapped -f web.Dockerfile .
```

## License

MIT
