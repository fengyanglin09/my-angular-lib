## Setup
```shell
# Create workspace with no default app
ng new my-workspace --no-create-application
cd my-workspace

# Create the demo app and the library
ng generate application my-app
ng generate library my-lib
```

- the structure of the workspace should look like this:
```yaml
my-workspace/
├── projects/
│   ├── my-app/
│   └── my-lib/
│       ├── src/
│       │   ├── lib/
│       │   └── public-api.ts    ← export everything from here
│       └── ng-package.json
├── angular.json
└── tsconfig.json
```

## Add Storybook
```shell
# Add Storybook to the workspace targeting the library
npm create storybook@latest
# When prompted, select my-lib as the project  
```
- or manually:
```shell
npx storybook@latest init --type angular
```
- this generates:
```yaml
my-workspace/
├── .storybook/
│   ├── main.ts          ← storybook config
│   └── preview.ts       ← global decorators/styles
```
