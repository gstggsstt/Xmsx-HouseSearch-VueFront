module.exports = {
    devServer: {
        open: true,
        host: "localhost",
        port: "8080",
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