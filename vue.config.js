module.exports = {
    configureWebpack: {
        devServer: {
            before(app) {
                app.get('/api/goods', function (req,res) {
                    res.json({
                        code: 0,
                        list: [
                            {
                                id:1,text:'华为p9',price:'3988'
                            },
                            {
                                id:2,text:'iphoneX',price:'7888'
                            }                            
                        ]
                    })
                })
            }
        }
    }
}