module.exports = ({github, context}) => {
  addComments(github, context);
}

function addComments(github, context) {
  const fs = require('fs');
    const execSync = require('child_process').execSync;
    const files = execSync('find /home/gradle/reports/ -type f').toString().split('\n').filter(Boolean);

    const suggestions = [];

    files.forEach(file => { // report file
      const filename = file.substring(file.lastIndexOf("/") + 1, file.lastIndexOf("."));
      if (filename.startsWith("suggestion")) {
        const info = filename.split("-");
        const startLine = parseInt(info[info.length - 2]);
        const endLine = parseInt(info[info.length - 1]); // parsing lines from report file's name

        const body = fs.readFileSync(file, 'utf8').split("\n");
        const targetPath = body.shift(); // side-effectful: gets path and removes first line from body

        const suggestion = {
          path: targetPath,
          body: body.join("\n"),
          start_line: startLine,
          start_side: "RIGHT",
          line: endLine,
          side: "RIGHT"
        };
        suggestions.push(suggestion);
      } else {
        console.log(`Unexpected file ${filename}`);
      }
    });

    console.log("----debug before github call----");

    if (suggestions.length != 0) {
      github.rest.pulls.createReview({
        owner: context.repo.owner,
        repo: context.repo.repo,
        pull_number: context.issue.number,
        commit_id: context.payload.pull_request.head.sha,
        event: "COMMENT",
        comments: suggestions
      });

      console.log("----debug github call----");
    }

    return "fino";
}
