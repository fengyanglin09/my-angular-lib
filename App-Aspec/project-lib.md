## manual publishing to npm

- check if you are logged in to npm with the correct account:
```shell
npm whoami
```

- if you are not logged in, or want to switch accounts, run:
```shell
npm login
```
- publish the library to npm:
```shell
ng build my-lib
cd dist/my-lib
npm publish --access public
```
- if you want to publish a new version, update the version in `projects/my-lib/package.json` and repeat the steps above.
- if you want to unpublish, you will need to use the npm CLI:
```shell
npm unpublish my-lib@version --force
```
- note that unpublishing a package can have consequences for users who depend on it, so use this command with caution, and you can only do it within 72 hours of publishing.
