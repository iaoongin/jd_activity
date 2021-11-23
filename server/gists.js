const auth = require("./auth.js");
const { now } = require("./utils/date.js");
const { Octokit } = require("octokit");
const octokit = new Octokit({ auth: auth.GistsToken });

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html>`);
const $ = require("jQuery")(window);

module.exports.loadData = async () => {
  let gistResp = await octokit.request("GET /gists/{gist_id}", {
    gist_id: auth.GistId,
  });

  let data = JSON.parse(gistResp.data.files["jd_activity.json"].content);

  return data;
};

module.exports.loadDataSync = () => {
  let ajaxResp = $.ajax({
    url: "https://api.github.com/gists/" + auth.GistId,
    type: "GET",
    async: false,
    headers: {
      Authorization: "token " + auth.GistsToken,
    },
  });

  let gistResp = ajaxResp.responseJSON;

  let data = JSON.parse(gistResp.files["jd_activity.json"].content);

  return data;
};

module.exports.loadData = async () => {
  let gistResp = await octokit.request("GET /gists/{gist_id}", {
    gist_id: auth.GistId,
  });

  let data = JSON.parse(gistResp.data.files["jd_activity.json"].content);

  return data;
};

module.exports.updateData = async (data) => {
  data.updateAt = now();

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
