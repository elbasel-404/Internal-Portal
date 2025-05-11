#!/bin/sh
set -e

REPO_DIR="$HOME/InternalPortal"
BRANCH="main"

# Configuration
GIT_REPO_URL="git@ssh.dev.azure.com:v3/Algoriza/Monshaat/InternalPortal"

# Automatically accept the SSH host key.
export GIT_SSH_COMMAND="ssh -o StrictHostKeyChecking=accept-new"

# Install the SSH client if it is missing.
install_ssh_client() {
  if ! command -v ssh >/dev/null 2>&1; then
    echo "Installing OpenSSH client..."
    apk add --no-cache openssh-client
  fi
}

# Generate a new SSH key if one does not exist.
generate_ssh_key() {
  if [ ! -f "$HOME/.ssh/id_rsa" ]; then
    echo "Generating a new SSH key..."
    ssh-keygen -t rsa -N "" -f "$HOME/.ssh/id_rsa"
    SSH_KEY=$(cat "$HOME/.ssh/id_rsa.pub")
    echo -e "\e[1;34mYour SSH Key:\n$SSH_KEY\e[0m"
    echo "Please add this key to your remote repo settings and then press ENTER..."
    read -r
    echo "Retrying..."
    exec "$0"
    exit 1

  fi
}

# Test SSH connection to the git repository.
test_ssh_connection() {
  echo "Testing SSH connection to $GIT_REPO_URL..."
  if ! git ls-remote "$GIT_REPO_URL" >/dev/null 2>&1; then
    SSH_KEY=$(cat "$HOME/.ssh/id_rsa.pub")
    echo "SSH connection failed. Please ensure your SSH key is added to the remote repo settings."
    echo -e "\e[1;34mYour SSH Key:\n$SSH_KEY\e[0m"
    echo "Press ENTER once you have updated the settings..."
    read -r
    echo "Retrying..."
    exec "$0"
    exit 1
  fi
  echo "SSH connection successful."
}

# Build the application and start the server.
build_and_start_app() {
  echo "build_and_start_app()"
  pwd
  echo "Building the application..."
  # export "$(grep -v '^#' "$REPO_DIR/.env" | xargs)"
  # rm -rf "$REPO_DIR"
  # cd "$HOME"
  # git clone "$GIT_REPO_URL"
  # cd "$REPO_DIR"
  # git switch "$BRANCH"
  # git pull

  # Install dependencies and build the project.
  pnpm install
  pnpm build

  # Prepare standalone deployment folder.
  cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/
  mkdir -p .next/standalone/app/db
  cp app/db/db.json .next/standalone/app/db/

  # Start the server in the background.
  echo "Starting server..."
  # nohup node .next/standalone/server.js >"$REPO_DIR/server.log" 2>&1 &
  # SERVER_PID=$!
  node .next/standalone/server.js
  echo "Server started with PID: $SERVER_PID"
}

# Monitor for new commits and update the code.
update_loop() {
  while true; do
    git --no-pager log -n 3 --pretty=format:"%H: %s"
    cat "$REPO_DIR/server.log"
    echo "update_loop"
    printf "\n"
    echo "pwd:"
    pwd
    echo "REP_DIR:"
    echo "$REPO_DIR"
    echo "BRANCH:"
    echo "$BRANCH"
    echo "Checking for updates..."
    # Make sure we are inside the repository.
    cd "$REPO_DIR"
    git fetch origin $BRANCH

    LOCAL=$(git rev-parse HEAD)
    REMOTE=$(git rev-parse origin/$BRANCH)

    if [ "$LOCAL" != "$REMOTE" ]; then
      echo "New commit detected. Updating code..."
      if [ -n "$SERVER_PID" ]; then
        echo "Stopping running server (PID: $SERVER_PID)..."
        kill "$SERVER_PID"
        sleep 2
      fi
      git pull origin $BRANCH
      echo "Rebuilding application..."
      exec "$REPO_DIR/entrypoint.sh"
      exit 1
    else
      echo "No updates found."
    fi
    sleep 30
  done
}

main() {
  # install_ssh_client
  # generate_ssh_key
  # test_ssh_connection
  build_and_start_app
  # update_loop
}

main

# New Code API Explanation
# The `getFormAction` function is used to create a form action for a specific API endpoint and operation. It validates the request body, sends a POST request, and validates the response body.
# The `post` function is used to send a POST request to a specified URL with a request body and headers. It handles timeouts and returns the response.
# The `apiErrorAtom` is a Jotai atom used to store API errors.
# The `demoAtom` is a Jotai atom used to store the demo state.
# The `shouldRefreshAtom` is a Jotai atom used to store the refresh state.
