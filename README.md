# github-changed-folders
NPM Module/CLI to get list of top level folders change in given commit in given Github repo

# Installation

```
npm install --save github-changed-folders
```

# Usage

Prerequisite: Github API key in `GITHUB_KEY` ENV variable.

```
const changedFolders = require('github-changed-folders');

changedFolders('paritytech/parity', 'd57944ffb9306d4322b9bfeb8be0d7dc57949856')
  .then((repos) => {
    repos.forEach((repo) => {
      // do something
    });
  });
```
