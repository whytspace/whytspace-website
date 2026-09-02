#!/bin/bash
# this script is supposed to be called from the project root (e.g. sh .devcontainer/postCreate.sh)

# node_modules is a named volume, so a host-side install is masked rather than inherited;
# the mount arrives root-owned and has to be handed to the container user
sudo chown node /home/node/whytspace-website/node_modules

# set store location outside of (vscode) workspace, because .pnpm would set up in workspace root
# this is similar to what pnpm would do on a host machine outside .devcontainer
sudo chown node /home/node/.npm
sudo chown node /home/node/.pnpm-store
pnpm config set store-dir /home/node/.pnpm-store

# git reports the repository as "dubious ownership" because the files are owned by the host
# easily verifyable with `git rev-parse --show-toplevel` inside the container (it fails without this line)
git config --global --add safe.directory "$(pwd -P)"

# reinstall dependencies
pnpm install
pnpm astro telemetry disable
