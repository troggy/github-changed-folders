const http = require('https');

const token = process.env.GITHUB_KEY;

const getChangedFolders = (repo, commit) => new Promise((resolve, reject) => {
  http.get({
    hostname: 'api.github.com',
    path: `/repos/${repo}/commits/${commit}`,
    headers: {
      'User-Agent': 'Changed repo folders CLI by troggy',
      Authorization: `token ${token}`,
    },
  }, (res) => {
    res.setEncoding('utf8');
    let body = '';
    res.on('data', (chunk) => {
      body += chunk;
    });
    res.on('error', (err) => {
      reject(err);
    });
    res.on('end', () => {
      const response = JSON.parse(body);
      if (!response.files) return;
      let changedFolders = response.files.map(f => f.filename.split('/')[0]);
      changedFolders = [...new Set(changedFolders)];
      resolve(changedFolders); // eslint-disable-line no-console
    });
  });
});

module.exports = getChangedFolders;

// check for CLI mode

if (process.argv[1].split('/').slice(-1)[0].match(/^github-changed-folders(.js)?/)) {
  if (process.argv.length < 4) {
    console.log('Usage: node github-changed-folders <repo> <commit sha>'); // eslint-disable-line no-console
    process.exit(1);
  }

  getChangedFolders(process.argv[2], process.argv[3])
    .then(res => console.log(res)); // eslint-disable-line no-console
}
