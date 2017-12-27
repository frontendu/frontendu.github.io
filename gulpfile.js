const gulp = require('gulp');
const del  = require('del');
const bs   = require('browser-sync').create();
const rs   = require('run-sequence');
const $    = require('gulp-load-plugins')();

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

const getCleanTask = (name, files) => {
	return gulp.task(getCleanTaskName(name), ['clean'], () => {
		return del(files);
	})
}

getCleanTask('styles', [
	`${getDist()}/*.css`,
	`${getDist()}/*.css.map`
]);

gulp.task('styles', [getCleanTaskName('styles')], () => {
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
	return gulp.src(`${getDist('images')}/**/*.svg`)
		.pipe($.svgo())
		.pipe(toDist('images'));
});

getCleanTask('pages', [
	`${getDist()}/*.html`
]);

gulp.task('pages', [getCleanTaskName('pages')], () => {
	return gulp.src('pages/**/*.html')
		.pipe($.htmlmin({
			collapseWhitespace: true
		}))
		.pipe(toDist());
});

gulp.task('public', ['clean'], () => {
	return gulp.src('public/**/*')
		.pipe(toDist())
});

gulp.task('serve', ['build'], () => {
	bs.init({
		open: false,
		server: {
			baseDir: getDist()
		}
	});

	gulp
		.watch(
			'pages/**/*.html',
			['pages']
		);

	gulp
		.watch(
			'styles/**/*.css',
			['styles']
		);

	gulp
		.watch([
			`${getDist()}/**/*.html`,
			'public/**/*.*'
		])
		.on('change', bs.reload);
});

gulp.task('clean', () => {
	return del([
		getDist()
	]);
});

gulp.task('prebuild', [
	'clean'
]);

gulp.task('inbuild', [
	'public',
	'pages',
	'styles',
	'vector'
])

gulp.task('build', (cb) => rs([
	'prebuild',
	'inbuild'
], cb));

gulp.task('default', [
	'build'
]);
