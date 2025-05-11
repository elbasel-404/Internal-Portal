# ! Building & running docker image:

# Clone the repo

<!-- See file://./.gitmodules for more info -->

`git clone --recurse-submodules git@ssh.dev.azure.com:v3/Algoriza/Monshaat/InternalPortal`

# To pull latest changes

`git pull --recurse-submodules git@ssh.dev.azure.com:v3/Algoriza/Monshaat/InternalPortal`

# Setup git aliases to make this automatic

```
git config --global alias.clone-all 'clone --recurse-submodules'
git config --global alias.pull-all 'pull --recurse-submodules'
```

Now you can use `git pull-all` and `git clone-all`

# Building

## Local

For troubleshooting, refer to [Troubleshooting](#troubleshooting)

### Install dependencies

`pnpm i`

### Build the app

`pnpm build`

### Copy static files to the server directory

`cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/`

### Copy database to server directory:

`mkdir -p .next/standalone/app/db`
<br>
`cp app/db/db.json .next/standalone/app/db/`

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
`pnpm update`

#### Or copy/past the following to run all commands at once:

rm -rf .next && \
rm -rf pnpm-lock.yaml && \
mkdir -p .next/standalone/app/db && \
cp app/db/db.json .next/standalone/app/db/ && \
pnpm update && \
=pnpm build && \
cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/ && \
node .next/standalone/server.js
