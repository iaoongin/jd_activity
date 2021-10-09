const { loadData, updateData } = require("../gists.js");
const router = require("../router.js");

/**
 *  查询jd用户信息
 */
router.get("/api/jdUserInfo", async (request, response) => {
  let data = await loadData();
  response.json(data.jd_token);
  response.end();
});

/**
 *  修改jd用户信息
 */
router.post("/api/jdUserInfo", async (request, response) => {
  let pinKeys = request.body || [];

  let dataForSave = await loadData();
  let data = dataForSave.jd_token;
  //   console.log(pinKeys);
  //   console.log("old", data);

  for (let item of pinKeys) {
    // console.log("item", item);

    let match = false;
    for (let itemDb of data) {
      //   console.log("itemDb", itemDb);
      if (itemDb.pt_pin == item.pt_pin) {
        itemDb.pt_key = item.pt_key;
        match = true;
        break;
      }
    }

    if (!match) {
      data.push({
        pt_pin: item.pt_pin,
        pt_key: item.pt_key,
      });
    }
  }

  //   console.log("new", data);

  dataForSave.jd_token = data;
  updateData(dataForSave);

  response.json(data);
  response.end();
});
