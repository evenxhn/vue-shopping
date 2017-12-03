var path=require('path');

// 导入html-webpack-plugin    用于刷新
var htmlwp=require('html-webpack-plugin');

// 导入webpack这个包
var webpack=require('webpack');


module.exports={
    // 1.0指定webpack的打包的入口文件
    entry:'./src/main.js',
    //2.0指定打包完成以后的输出文件
    output:{
        // 指定build.js为打包生成的文件--路径一定要绝对路径
        path:path.join(__dirname,'/dist'),
        filename:'build.js'
    } ,
    // 导入jquery这个包
    resolve:{
            alias:{
                //   导入node_modules文件夹中的jquery这个包
                'jquery':'jquery' 
            }
    },
    // 3.0配置webpack相对于的loaderd的包
    module:{
        // 在这里配置的是具体的某一个的包
        loaders:[
            // 3.1
            //配置的是用来解析.css文件的loader(style-loader和css-loader)
            {            
            test: /\.css$/,//  用正则匹配当前访问的文件的后缀名是.css
            loader:'style-loader!css-loader'  //webpack底层调用这些包的顺序是从右到左
            },
             // 3.0.2 配置的是用来解析.less文件的loader(style-loader和css-loader和less-loader)
            // {            
            // test: /\.less$/,//  用正则匹配当前访问的文件的后缀名是.css
            // loader:'style-loader!css-loader!less-loader'  //webpack底层调用这些包的顺序是从右到左
            // },
             // 3.0.3 配置的是用来解析.scss文件的loader(style-loader和css-loader和sass-loader)
            {            
            test: /\.scss$/,//  用正则匹配当前访问的文件的后缀名是.css
            loader:'style-loader!css-loader!sass-loader'  //webpack底层调用这些包的顺序是从右到左
             },
            //   // 3.0.4 配置的是用来解析.png,.jpg,.gif......文件的loader(url-loader)
             {  
             test: /\.(png|jpg|gif|woff|ttf|eot|svg|ttf)$/,//  用正则匹配当前访问的文件的后缀名是.css
             // 可以在url-loader?limit=设定的限定值大小(单位：Byte  1K=1024Byte )
             loader:'url-loader?limit=10240'  //注意这个地方不需要使用file-loader
             },
             // 3.0.6 配置的是用来解析.vue文件的loader(vue-loader)
             {
             test: /\.vue$/,//  用正则匹配当前访问的文件的后缀名是.css    
             loader:'vue-loader'  //注意这个地方不需要使用file-loader
             }
        ],
    },
    // webpack需要使用的插件配置在这里
    plugins:[
    new htmlwp({
        filename:'index.html',  // 在内存中生成的html的文件名称
        //在内存中生成的文件的内容是参考index1.html来生成，同时将webpack在内存中生成好的bulid.js
        // 通过script标签加载到index.html的底部
        template:'index1.html' 
    }),

    // 将jqeruy对象映射为$和jQuery
    new webpack.ProvidePlugin({
        $:'jquery',
        jQuery:  "jquery"
    })
]
}
