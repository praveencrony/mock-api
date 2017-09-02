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
						cwd: 'www/wp-content/themes/krds/',
						ext: '.js',
						src: ['**/*.js', '!*.min.js'],
						filter: 'isFile',
						dest: 'www/wp-content/themes/krds/'
					}]
				}
		},
			
		cssmin: {
			 build: {
				  files: [{
					expand: true,
					flatten: false,
					cwd: 'www/wp-content/themes/krds/',
					ext: '.css',
					src: ['**/*.css', '!*.min.css'],
					filter: 'isFile',
					dest: 'www/wp-content/themes/krds/'
					
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
