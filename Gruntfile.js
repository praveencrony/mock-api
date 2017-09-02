module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        babel: {
            options: {
            sourceMap: true,
            presets: ['es2015']
            },

        dist: {
            files: {
            'public/js/build/indexHandler.js': 'public/js/indexHandler.js'
            }
        }
    }
});

    grunt.loadNpmTasks('grunt-babel');
    grunt.registerTask('build', ['babel']);

};
