## Dev Workflow Scripts

- Install concurrently to run multiple npm scripts in parallel:
```shell
npm install -D concurrently
```

- Add to root package.json:
```json
{
  "scripts": {
    "dev": "concurrently \"ng build my-lib --watch\" \"ng serve my-app\"",
    "storybook": "ng build my-lib --watch & npx storybook dev -p 6006",
    "build:lib": "ng build my-lib --configuration production",
    "test:lib": "ng test my-lib"
  }
}
```

- create a new component in lib
```shell
ng generate component button --project=my-lib
```

- build storybook
```shell
npm run storybook:build
```

- run the dev server and storybook in parallel
```shell
npm run storybook:serve
```

- build all projects in the workspace
```shell
npm build:all
```
