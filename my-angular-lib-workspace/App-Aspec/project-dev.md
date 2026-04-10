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


