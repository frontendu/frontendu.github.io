const gulp 	= require('gulp');
const babel	= require('gulp-babel');
const minify = require('gulp-minify');
const del  	= require('rimraf');
const bs   	= require('browser-sync').create();
const $    	= require('gulp-load-plugins')();

const isProd = () => {
	return process.env.NODE_ENV === 'production';
};

const getDist = (path) => {
	return `./docs/${path ? path : ''}`;
}

const toDist = (path) => {
	return gulp.dest(getDist(path));
};

const getCleanTaskName = (name) => {
	return `clean:${name}`;
}

gulp.task('clean', (cb) => {
	del(getDist(), cb);
});

const getCleanTask = (name, files) => {
	return gulp.task(getCleanTaskName(name), (cb) => {
		del(files, cb);
	})
}

getCleanTask('styles', `${getDist()}/*.css*`);

gulp.task('styles', gulp.series(getCleanTaskName('styles'), () => {
	const copyOptions = [
		{ url: 'inline', maxSize: 10 }
	];

	const plugins = [
		require('postcss-cssnext'),
		require('postcss-url')(copyOptions),
		require('postcss-copy')({
			dest: getDist(),
			template: 'images/[hash].[ext][query]'
		})
	];

	if (isProd()) {
		plugins.push(...[
			require('cssnano')({ autoprefixer: false })
		]);
	}

	let stylesPipe = gulp.src('styles/**/*.css');

	if (!isProd()) {
		stylesPipe = stylesPipe.pipe(
			$.sourcemaps.init()
		);
	}

	stylesPipe = stylesPipe
		.pipe($.postcss(plugins))
		.pipe($.concat('./index.css'));

	if (!isProd()) {
		stylesPipe = stylesPipe
			.pipe($.sourcemaps.write('.'))
	}

	return stylesPipe
		.pipe(toDist())
		.pipe(bs.stream());
}));

gulp.task('vector', () => {
	return gulp.src(`${getDist('images')}/**/*.svg`)
		.pipe($.svgo())
		.pipe(toDist('images'));
});

getCleanTask('pages', `${getDist()}/*.html`);

gulp.task('pages', gulp.series(getCleanTaskName('pages'), () => {
	return gulp.src('pages/**/*.html')
		.pipe($.htmlmin({
			collapseWhitespace: true
		}))
		.pipe(toDist());
}));

gulp.task('public', () => {
	return gulp.src('public/**/*')
		.pipe(toDist())
});

gulp.task('js', () => 
	gulp.src('js/**/*.js')
		.pipe(babel({
				presets: ['env']
		}))
		.pipe(minify({
			noSource: true
		}))
		.pipe(toDist())
);

gulp.task('prebuild', gulp.series('clean'));

gulp.task('inbuild', gulp.series(
	'public',
	'pages',
	'styles',
	'js',
	'vector'
));

gulp.task('build', gulp.series(
	'prebuild',
	'inbuild'
));

gulp.task('default', gulp.series(
	'build'
));

gulp.task('serve', gulp.series('build', () => {
	bs.init({
		open: false,
		server: {
			baseDir: getDist()
		}
	});

	gulp
		.watch(
			'pages/**/*.html',
			gulp.series('pages')
		);

	gulp
		.watch(
			'styles/**/*.css',
			gulp.series('styles')
		);

	gulp
		.watch(
			'js/**/*.js',
			gulp.series('js')
		);	

	gulp
		.watch([
			`${getDist()}/**/*.html`,
			'public/**/*.*'
		])
		.on('change', bs.reload);
}));
