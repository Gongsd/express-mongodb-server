const express = require('express')
const router = express.Router();
const News = require('../model/news')

//查询所有新闻
router.post('/news', (req, res) => {
    News.find({})
        .sort({updateTime : -1})
        .then(news => {
            console.log(res.status(200))
            console.log(news)
            res.status(200).json(news)
        })
        .catch(err => {
            res.json(err)
        })
})

//获取单个news
router.get('/news/:id', (req, res) => {
    console.log(req.params.id)
    News.findById(req.params.id)
        .then(news => {
            
            res.json(news)
        })
        .catch(err => {
            req.json(err)
        })
})
//添加新闻
router.post('/news/add', (req, res) => {
    //使用 News  model上的create方法存储数据
    News.create(req.body, (err, news) => {
        if(err){
            console.log(res)
            res.json(err)
        }else{
            console.log(res)
            res.json(news)
        }
    })

    //使用实例的save方法保存数据
    // let news = new News({
    //     title : req.body.title,
    //     poster : req.body.poster,
    //     content : req.body.content,
    //     author : req.body.author,
    // });
    // news.save((err, news) =>{
    //     if(err){
    //         res.json(err)
    //     }else{
    //         res.json(news)
    //     }
    // }) 

})
//修改新闻
router.put('/news/:id', (req, res) => {
    News.findByIdAndUpdate({_id : req.params.id},
        { $set : {
            title: req.body.title,
            content : req.body.content,
            poster : req.body.poster,
            author : req.body.author 
         }},
        { new : true})
        .then(news => res.json(news))
        .catch(err => res.json(err))
})
//删除新闻
router.delete('/news/:id', (req, res) => {
    News.findOneAndRemove({_id : req.params.id})
        .then(news => res.send(`${News.title}删除成功`))
        .catch(err => res.json(err))
})


module.exports = router