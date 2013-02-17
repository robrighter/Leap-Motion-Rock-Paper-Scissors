var srcDir = './www';
var gruntConfig = {
	lint: {
			files: [ srcDir+'/js/app/*.js']
	},
	jshint: {
			options: {
				curly: false,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				browser: true
			},
			globals: {
				jQuery: true,
				define: true,
				require: true
			}
	},
	uglify: {},
	jade: {
		html: {
			src: [srcDir+'/*.jade'],
			dest: srcDir,
			options: {
				client: false
			}
		}
	},
	server: {
    	port: 8000,
    	base: './www'
  	},
  	qunit: {
  		all: ['test/**/*.html']
  	},
  	watch: {
      src: {
      	files: [srcDir+'/**', './test/**'],
        tasks: ['lint','jade', 'qunit']
      }
  }

};

module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-jade');
	grunt.initConfig(gruntConfig);
	grunt.registerTask('default', 'lint jade');
	grunt.registerTask('devserver', 'lint jade server watch');
};
//grunt.registerTask('default', 'lint qunit requirejs recess copy:images clean:dist min copy:zipsrc compress clean:zipsrc');