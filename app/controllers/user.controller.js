// 驗證套件
const Joi = require('joi');
// 加密套件
const bcrypt = require('bcrypt');
const saltRounds = 10;
// 資料庫引入
const db = require("../models");
const User = db.users;

// 注冊
exports.register = async (req, res) => {
  // 資料格式防呆
  const data = req.body;
  const schema = Joi.object({
    name: Joi.string().required(),
    account: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,12}$'))
  });
  const invalidData = schema.validate(data, { abortEarly: false }).error;
  if (invalidData)
    return res.status(200).send({
      retCode: 0,
      retMsg: "資料格式錯誤",
      retData: invalidData.details.map(e => ({
        message: e.message,
        context: e.context
      }))
    });
  // 通過格式防呆，溝通資料庫
  // 檢查帳號是否已存在
  if (await User.findByPk(data.account))
    return res.send({
      retCode: 0,
      retMsg: "此帳號已被注冊"
    });
  User.create({
    ...data,
    password: bcrypt.hashSync(data.password, saltRounds)
  })
    .then(result => {
      res.send({
        retCode: 1,
        retMsg: '成功'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        retCode: 0,
        retMsg: "資料庫錯誤"
      });
    });
};

// 登入
exports.login = (req, res) => {
  // 資料格式防呆
  const data = req.body;
  const schema = Joi.object({
    account: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,12}$'))
  });
  const invalidData = schema.validate(data, { abortEarly: false }).error;
  if (invalidData)
    return res.send({
      retCode: 0,
      retMsg: "資料格式錯誤",
      retData: invalidData.details.map(e => ({
        message: e.message,
        context: e.context
      }))
    });
  // 通過格式防呆，溝通資料庫
  User.findByPk(data.account)
    .then(result => {
      if (result && bcrypt.compareSync(data.password, result.password))
        res.send({
          retCode: 1,
          retMsg: '成功',
          retData: {
            name: result.name,
            account: result.account
          }
        });
      else
        res.send({
          retCode: 0,
          retMsg: '帳號不存在或密碼錯誤'
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        retCode: 0,
        retMsg: "資料庫錯誤"
      });
    });
};