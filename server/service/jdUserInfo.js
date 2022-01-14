const { loadData, updateData } = require("../gists.js");
const router = require("../router.js");
const { now } = require("../utils/date.js");
const { queryJdUserInfo, queryJdBeanChange } = require("./jdApi");
const moment = require("moment");
const lodash = require("lodash");

function encryptKey(item) {
  let key = item.pt_key;
  let keyLen = key.length;
  let showLen = 5;
  let encryptKey = "";
  encryptKey = key.substring(0, showLen);
  for (let i = 0; i < keyLen - 2 * showLen; i++) {
    encryptKey += "*";
  }
  encryptKey += key.substring(key.length - showLen);

  item.pt_key = encryptKey;
}

/**
 *  查询jd用户信息
 */
router.get("/api/jdUserInfo", async (request, response) => {
  let data = await loadData();
  let jd_token = data.jd_token;
  // console.log(jd_token);
  for (let item of jd_token) {
    let cookie = `pt_pin=${item.pt_pin};pt_key=${item.pt_key};`;
    let resp = await queryJdUserInfo(cookie);
    // console.log(resp);
    encryptKey(item);
    item.jd = resp.data.base;
  }

  var r = { data: jd_token, code: "200" };
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

    if (!item || !item.pt_pin || !item.pt_key) {
      continue;
    }

    let match = false;
    let updateAt = now();
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

  for (let item of data) {
    encryptKey(item);
  }

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
  let newJdToken = data.filter((x) => !pins.includes(x.pt_pin));

  console.log(newJdToken);
  dataForSave.jd_token = newJdToken;
  updateData(dataForSave);

  var r = { data: newJdToken, code: "200" };
  for (let item of data) {
    encryptKey(item);
  }
  response.json(r);
  response.end();
});

/**
 *  查询jd用户信息
 */
router.get("/api/jdBeanChange", async (request, response) => {
  let data = await loadData();
  let jd_token = data.jd_token;
  // console.log(jd_token);
  let arr = [];
  for (let item of jd_token) {
    let cookie = `pt_pin=${item.pt_pin};pt_key=${item.pt_key};`;
    let day = 7;
    let resp = await queryJdBeanChange(cookie);
    // console.log(resp);
    /**
     * {
                "date": "2022-01-14 11:49:50",
                "amount": "32",
                "eventMassage": "PLUS会员购物10倍返京豆（商品:100012553293）"
            }
     */
    let detailList = resp.data.detailList;
    // var t_dt = lodash.groupBy(detailList, (item) =>
    //   moment(item.date).format("YYYY-MM-DD")
    // );

    var t_dt = lodash.map(detailList, (item) => {
      return {
        date: moment(item.date).format("YYYY-MM-DD"),
        amount: item.amount,
      };
    });

    console.log(t_dt);

    t_dt = lodash.countBy(t_dt, (sum, item) =>{
      return sum += item.amount
    })

    console.log(t_dt);

    arr.push(t_dt);
  }

  var r = { data: arr, code: "200" };
  response.json(r);
  response.end();
});
