const gulp = require('gulp');
const del  = require('del');
const bs   = require('browser-sync').create();
const $    = require('gulp-load-plugins')();

const isProd = () => {
	return process.env.NODE_ENV === 'production';
};

const getDist = (path) => {
	return `./dist/${path ? path : ''}`;
}

const toDist = (path) => {
	return gulp.dest(getDist(path));
};

gulp.task('styles', ['clean'], () => {
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
});

gulp.task('vector', ['styles'], () => {
	return gulp.src('dist/images/**/*.svg')
		.pipe($.svgo())
		.pipe(toDist('images'));
});

gulp.task('pages', ['clean'], () => {
	return gulp.src('pages/**/*.html')
		.pipe($.htmlmin({
			collapseWhitespace: true
		}))
		.pipe(toDist());
});

gulp.task('public', ['clean'], () => {
	return gulp.src('public/**/*.*')
		.pipe(toDist())
});

gulp.task('serve', ['build'], () => {
	bs.init({
		open: false,
		server: {
			baseDir: './dist'
		}
	});

	gulp
		.watch(
			'styles/**/*.css',
			['styles']
		);

	gulp
		.watch([
			'pages/**/*.html',
			'public/**/*.*'
		])
		.on('change', bs.reload);
});

gulp.task('clean', () => {
	return del([
		getDist()
	]);
});

gulp.task('build', [
	'clean',
	'public',
	'pages',
	'styles',
	'vector'
]);

gulp.task('default', [
	'build'
]);
