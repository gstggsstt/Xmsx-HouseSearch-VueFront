module.exports = {
    devServer: {
        disableHostCheck: true,
        open: true,
        host: "0.0.0.0",
        port: "8848",
        proxy: {
            "/api": {
                target: "http://localhost:8081/",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            }


        }
    }
}