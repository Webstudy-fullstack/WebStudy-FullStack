var express = require('express');
var router = express.Router();
var Post = require('../models/post')
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const util = require('../modules/util');
const Token = require('../modules/token');
const { NULL_VALUE } = require('../modules/responseMessage');

//글작성(C)
router.post('/api', async (req, res) => {
    try {
        console.log(req.cookies.user)
        await Token.checktoken(req.cookies.user)
        const { name, title, content } = req.body;

        const idx = await Post.insert(name, title, content)
        if (idx === -1) {
            return res.status(statusCode.DB_ERROR)
                .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
        res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.POST_INSERT_SUCCESS));
    } catch (err) {
        console.log(err)
        return res.status(statusCode.BAD_REQUEST)
            .send({ err: err })
    }
})

//selectAll(R)
router.get('/api/', async (req, res) => {
    try {
        await Token.checktoken(req.cookies.user);
        const list = await Post.selectAll()
        if (list === -1) {
            return res.status(statusCode.DB_ERROR)
                .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        } else if (list === NULL_VALUE) {
            return res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        }
        res.json(list)
    } catch (err) {
        console.log(err)
        return res.status(statusCode.BAD_REQUEST)
            .send({ err: err })
    }
})

//selectOne(R)
router.get('/api/:idx', async (req, res) => {
    try {
        await Token.checktoken(req.cookies.user);

        var contentId = req.params.idx;
        const list = await Post.selectOne(contentId)
        if (list === -1) {
            return res.status(statusCode.DB_ERROR)
                .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        } else if (list === NULL_VALUE) {
            return res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        }
        res.json(list)
    } catch (err) {
        console.log(err)
        return res.status(statusCode.BAD_REQUEST)
            .send({ err: err })
    }
})

//update
router.put('/api/:idx', async (req, res) => {
    try {
        await Token.checktoken(req.cookies.user);

        const contentIdx = req.params.idx
        const { title, content } = req.body

        const updateIdx = await Post.update(contentIdx, title, content);
        if (updateIdx === -1) {
            return res.status(statusCode.DB_ERROR)
                .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
        res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.POST_UPDATE_SUCCESS));
    } catch (err) {
        console.log(err)
        return res.status(statusCode.BAD_REQUEST)
            .send({ err: err })
    }
})

router.delete('/api/:idx', async (req, res) => {
    try {
        await Token.checktoken(req.cookies.user);

        const contentIdx = req.params.idx
        const result = await Post.delete(contentIdx)
        if (result === -1) {
            return res.status(statusCode.DB_ERROR)
                .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
        res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.POST_DELETE_SUCCESS))
    } catch (err) {
        console.log(err)
        return res.status(statusCode.BAD_REQUEST)
            .send({ err: err })
    }
})

module.exports = router;