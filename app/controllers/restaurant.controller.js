// 驗證套件
const Joi = require('joi');
// 資料庫引入
const db = require("../models");
const Restaurant = db.restaurants;

// 列表查詢
exports.findAll = async (req, res) => {
  Restaurant.findAll()
    .then(result => {
      res.send({
        retCode: 1,
        retMsg: '成功',
        retData: result
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

// 單筆查詢
exports.findOne = async (req, res) => {
  const id = req.params.id;
  Restaurant.findByPk(id)
    .then(result => {
      if (result)
        res.send({
          retCode: 1,
          retMsg: '成功',
          retData: result
        });
      else
        res.send({
          retCode: 0,
          retMsg: '查無此餐廳',
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

// 新增
exports.create = async (req, res) => {
  // 資料格式防呆
  const data = req.body;
  const schema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().allow("")
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
  Restaurant.create(data)
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

// 編輯
exports.update = async (req, res) => {
  // 資料格式防呆
  const id = req.params.id;
  const data = req.body;
  const schema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().allow("")
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
  Restaurant.update(data, {
    where: { id: id }
  })
    .then(result => {
      if (result[0] === 1) {
        res.send({
          retCode: 1,
          retMsg: '成功'
        });
      } else {
        res.send({
          retCode: 0,
          retMsg: '失敗，請確認 id 是否存在'
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        retCode: 0,
        retMsg: "資料庫錯誤"
      });
    });
};

// 刪除
exports.delete = async (req, res) => {
  const id = req.params.id;
  Restaurant.destroy({
    where: { id: id }
  })
    .then(result => {
      if (result === 1) {
        res.send({
          retCode: 1,
          retMsg: '成功'
        });
      } else {
        res.send({
          retCode: 0,
          retMsg: '失敗，請確認 id 是否存在'
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        retCode: 0,
        retMsg: "資料庫錯誤"
      });
    });
};