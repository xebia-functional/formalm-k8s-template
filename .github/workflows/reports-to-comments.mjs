console.log("it works!");
/*const fs = require('fs');
const execSync = require('child_process').execSync;
const files = execSync('find /home/gradle/reports/ -type f').toString().split('\n').filter(Boolean);

files.forEach(file => {
  const filenameWithExtension = file.substring(file.lastIndexOf("/") + 1);
  const filename = filenameWithExtension.substring(0, filenameWithExtension.lastIndexOf("."));
  if (filename.startsWith("summary")) {
    const body = fs.readFileSync(file, 'utf8');
    github.rest.issues.createComment({
      issue_number: context.issue.number,
      owner: context.repo.owner,
      repo: context.repo.repo,
      body: body
    });
  } else if (filename.startsWith("suggestion")) {
    const content = fs.readFileSync(file, 'utf8');
    const body = content.split("\n");
    const path = body.shift(); // side-effectful: gets path and removes first line from body
    const info = filename.split("-");
    const size = info.length;
    const startLine = parseInt(info[size - 2]);
    const endLine = parseInt(info[size - 1]);

    console.log("------DEBUG------");
    console.log(`path ${path}`);
    console.log(`start ${startLine}`);
    console.log(`end ${endLine}`);
    console.log("-----------------");

    github.rest.pulls.createReviewComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: context.issue.number,
      body: body.join("\n"),
      commit_id: context.payload.pull_request.head.sha,
      path: path,
      side: "RIGHT",
      start_line: startLine,
      start_side: "RIGHT",
      line: endLine
    });
  } else {
    console.log(`Unexpected file ${filename}`);
  }
});*/
