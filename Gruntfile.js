module.exports = function(grunt) {
    grunt.initConfig({
        compass: {                          
            dist: {      
                options: {
                    sassDir: 'public/scss/',
                    cssDir: 'public/css/'
                }
            }
        },
        watch: {
            options: {
                // atBegin: true
            },
            livereload: {
                options: {
                    livereload: 35729
                },
                files: ['public/css/screen.css']
            },
            styles: {
                files: ['public/scss/**/*.scss'],
                tasks: ['compass:dist']                
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);
};