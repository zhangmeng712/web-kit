/**
 * @author  sophie <zhangmeng712@gmail.com>
 * @fileOverview web-kit base workflow based on grunt http://gruntjs.com/
 */
module.exports = function(grunt) {

    var lrPort = 35729;
    var Path = require('path');
    var SEP =Path.sep;
    var Fs = require('fs');
    // 使用connect-livereload模块，生成一个与LiveReload脚本
    // <script src="http://127.0.0.1:35729/livereload.js?snipver=1" type="text/javascript"></script>
    var lrSnippet = require('connect-livereload')({
        port: lrPort
    });
    var project_dir = grunt.option('dir');
    
    var watch_files = [project_dir + '/**/*.html', project_dir + '/**/*.js', project_dir + '/**/*.js', project_dir + '/**/*.less'];
    // 项目配置(任务配置)
    grunt.initConfig({
        // 通过connect任务，创建一个静态服务器
        connect: {
            options: {
                // 服务器端口号
                port: 3000,
                // 服务器地址(可以使用主机名localhost，也能使用IP)
                hostname: 'localhost'
            },
            
            livereload: {
                options: {
                    open: {
                        target: 'http://localhost:3000/'
                       
                    },
                    // 通过LiveReload脚本，让页面重新加载。
                    middleware: function(connect, options, middlewares) {
                        return [
                            require('connect-livereload')({
                                port: lrPort
                            }),
                            connect.static(project_dir)
                        ];
                    }
                }
            }
        },
        less: {
            development: {
                files: {}
            }
        },
        watch: {
            options: {
                livereload: true,
                nospawn: true
            },
            files: watch_files
        }
    });

    //用于监控less变化进行编译
    grunt.event.on('watch', function(action, filepath) {
        var fileExts = Path.extname(filepath);
        if (fileExts == '.less') {
            var prefix = filepath.split('.less')[0];
            var lessObj = {};
            lessObj[prefix + '.css'] = prefix + '.less'
            console.log(lessObj)
            grunt.config('less.development.files', lessObj);
            grunt.task.run(['less']);
        }

    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.registerTask('live', ['connect', 'watch']);
};