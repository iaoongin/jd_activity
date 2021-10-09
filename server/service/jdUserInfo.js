const { loadData, updateData } = require("../gists.js");
const router = require("../router.js");
const moment = require('moment');

/**
 *  查询jd用户信息
 */
router.get("/api/jdUserInfo", async (request, response) => {
  let data = await loadData();

  var r = { data: data.jd_token, code: "200" };
  response.json(r);
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

    if(!item || !item.pt_pin || !item.pt_key){
      continue;
    }

    let match = false;
    let updateAt = moment().format('YYY-MM-DD HH:mm:ss')
    for (let itemDb of data) {
      //   console.log("itemDb", itemDb);
      if (itemDb.pt_pin == item.pt_pin) {
        itemDb.pt_key = item.pt_key;
        itemDb.update_at = updateAt;
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

  var r = { data: data, code: "200" };
  response.json(r);
  response.end();
});

/**
 *  删除jd用户信息
 */
router.delete("/api/jdUserInfo", async (request, response) => {
  let pins = request.body || [];

  console.log(pins);

  let dataForSave = await loadData();
  let data = dataForSave.jd_token;
  let newJdToken = data.filter(x=> !(pins.includes(x.pt_pin)))

  console.log(newJdToken);
  dataForSave.jd_token = newJdToken;
  updateData(dataForSave);

  var r = { data: newJdToken, code: "200" };
  response.json(r);
  response.end();
});
