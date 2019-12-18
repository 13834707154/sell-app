const {seller,goods,ratings} = require('./data.json')
console.log(seller)
module.exports = {
    lintOnSave: true,
    devServer:{
        open:true,
        before(app){
            app.get('/api/seller',(req,res)=>{
                res.json({
                    erron:0,
                    data:seller
                })
            }),
            app.get('/api/goods',(req,res)=>{
                res.json({
                    erron:0,
                    data:goods
                })
            }),
            app.get('/api/ratings',(req,res)=>{
                res.json({
                    erron:0,
                    data:ratings
                })
            })
        }
    }
}