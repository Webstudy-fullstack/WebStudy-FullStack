var express = require('express');
var router = express.Router();
var Post = require('../models/post')
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const util = require('../modules/util');

//글작성(C)
router.post('/api',async(req,res)=>{
    const{name, title, content} = req.body;

    const idx = await Post.insert(name, title, content)
    if(idx === -1){
        return res.status(statusCode.DB_ERROR)
        .send(util.fail(statusCode.DB_ERROR,resMessage.DB_ERROR));
    }
    res.status(statusCode.OK)
    .send(util.success(statusCode.OK,resMessage.POST_INSERT_SUCCESS));
})

//selectAll(R)
router.get('/api/', async(req,res)=>{
    const list = await Post.selectAll()
    if(list === -1){
        return res.status(statusCode.DB_ERROR)
        .send(util.fail(statusCode.DB_ERROR,resMessage.DB_ERROR)); 
    }else if(list === NULL_VALUE){
        return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE));
    }
    res.json(list)
})

//selectOne(R)
router.get('/api/:idx',async(req,res)=>{
    var contentId = req.params.idx;
    const list = await Post.selectOne(contentId)
    if(list === -1){
        return res.status(statusCode.DB_ERROR)
        .send(util.fail(statusCode.DB_ERROR,resMessage.DB_ERROR)); 
    }else if(list === NULL_VALUE){
        return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE));
    }
    res.json(list)
})

//update
router.put('/api/:idx',async(req,res)=>{
    const contentIdx = req.params.idx
    const {title, content} = req.body
    
    const updateIdx = await Post.update(contentIdx, title,content);
    if(updateIdx === -1){
        return res.status(statusCode.DB_ERROR)
        .send(util.fail(statusCode.DB_ERROR,resMessage.DB_ERROR)); 
    }
    res.status(statusCode.OK)
    .send(util.success(statusCode.OK,resMessage.POST_UPDATE_SUCCESS));
})

router.delete('/api/:idx',async(req,res)=>{
    const contentIdx = req.params.idx
    const result = await Post.delete(contentIdx)
    if(result === -1){
        return res.status(statusCode.DB_ERROR)
        .send(util.fail(statusCode.DB_ERROR,resMessage.DB_ERROR)); 
    }
    res.status(statusCode.OK)
    .send(util.success(statusCode.OK,resMessage.POST_DELETE_SUCCESS))
})

module.exports = router;