## changeset is used to track changes in the project and generate release notes.

- Install changeset:
```shell
cd my-angular-lib
npm install -D @changesets/cli @changesets/changelog-github
```

- init changeset:
```shell
npx changeset init
```

- add scripts
```json
{
  "scripts": {
    "changeset": "npx changeset",
    "version-packages": "npx changeset version",
    "publish-packages": "npx changeset publish"
  }
}
```

- configure changest 
```json
{
  "changelog": ["@changesets/changelog-github", { "repo": "my-angular-lib" }],
  "commit": false,
  "linked": [],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": []
}
```

- add a changeset and version the packages:
```shell
npx changeset
npx changeset version
npm install    ## this will update the version in package.json and install the new version in node_modules
```
