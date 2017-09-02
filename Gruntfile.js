module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        uglify: {
			options: {
				},
				build: {
					files: [{
						expand: true,
						flatten: false,
						cwd: 'public/',
						ext: '.js',
						src: ['**/*.js', '!*.min.js'],
						filter: 'isFile',
						dest: 'public/'
					}]
				}
		},
			
		cssmin: {
			 build: {
				  files: [{
					expand: true,
					flatten: false,
					cwd: 'public/',
					ext: '.css',
					src: ['**/*.css', '!*.min.css'],
					filter: 'isFile',
					dest: 'public/'
					
				  }]
				}
		},
});

grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-uglify');

grunt.registerTask('production', 
        [
        'uglify:build', 
        'cssmin:build'

        ]);

};
