<!-- ## [![Docker CI/CD](https://github.com/elbasel42/temp-portal-repo-github/actions/workflows/docker.yml/badge.svg)](https://github.com/elbasel42/temp-portal-repo-github/actions/workflows/docker.yml) -->

## Documentation

- [Form Submission Guide](./docs/form-submission-guide.md) - Guide for using the unified form submission logic
- [Migration Guide](./docs/migration-guide.md) - Guide for migrating existing forms to the unified submission logic
- [Form Unification Changelog](./docs/form-unification-changelog.md) - Summary of changes made during form submission unification
- [Form Test Plan](./docs/form-test-plan.md) - Test plan for verifying form submission functionality
- [Testing](./docs/testing.md) - Information about running unit tests
- [Implementation Summary](./docs/implementation-summary.md) - Comprehensive summary of the form unification implementation

# ! Building & running docker image:

# Building

## Local

For troubleshooting, refer to [Troubleshooting](#troubleshooting)

### Install dependencies

`pnpm i`

### Build the app

`pnpm build`

### Run the node server:

`node .next/standalone/server.js`

### (optional) To use the nextjs server instead:

<sub>if using this command to run the server you don't need to copy static files or database</sub>
<br>

<sub>CAUTION: might produce unexpected results see: [Next.js Documentation](https://nextjs.org/docs/app/api-reference/config/next-config-js/output)</sub>
<br>
`pnpm start`

## Troubleshooting

### Cleaning local files

Run the following commands in case you face any unexpected errors:
<br>
`rm -rf node_modules`
<br>
`rm -rf .next`
<br>
remove all data from `app/db/db.json`;
<br>
`rm -rf pnpm-lock.yaml`
<br>

#### Or copy/past the following to run all commands at once:

rm -rf .next && \
rm -rf pnpm-lock.yaml && \
mkdir -p .next/standalone/app/db && \
cp app/db/db.json .next/standalone/app/db/ && \
=pnpm build && \
cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/ && \
node .next/standalone/server.js
