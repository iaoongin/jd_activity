
const moment = require('moment');

const auth = require("./auth.js");
const { Octokit } = require("octokit");
const octokit = new Octokit({ auth: auth.GistsToken });

module.exports.loadData = async () => {
  let gistResp = await octokit.request("GET /gists/{gist_id}", {
    gist_id: auth.GistId,
  });

  let data = JSON.parse(gistResp.data.files["jd_activity.json"].content);

  return data;
};

module.exports.updateData = async (data) => {

  data.updateAt = moment().format('YYY-MM-DD HH:mm:ss')

  let gistResp = await octokit.request("PATCH /gists/{gist_id}", {
    gist_id: auth.GistId,
    files: {
      "jd_activity.json": {
        content: JSON.stringify(data),
      },
    },
  });

  return gistResp;
};
