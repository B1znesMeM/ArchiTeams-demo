let syntax     = 'sass', // Syntax - .sass or .scss
fileswatch = 'html,htm,txt,json,md,woff2' // List of files extensions for watching & hard reload

import pkg from 'gulp'
const { src, dest, parallel, series, watch } = pkg

import browserSync   from 'browser-sync'
import gulpSass      from 'gulp-sass'
import * as dartSass from 'sass'
const  sass          = gulpSass(dartSass)
import postCss       from 'gulp-postcss'
import cssnano       from 'cssnano'
import concat        from 'gulp-concat'
import uglify        from 'gulp-uglify'
import autoprefixer  from 'autoprefixer'
import rsyncModule   from 'gulp-rsync'
import clean     	 from 'gulp-clean'
import webp      	 from	'gulp-webp'
import imagemin  	 from	'gulp-imagemin'
import newer     	 from	'gulp-newer'
import fonter    	 from 'gulp-fonter'
import ttf2woff2 	 from'gulp-ttf2woff2'

function browsersync() {
	browserSync.init({
		server: {
			baseDir: 'app/'
		},
		ghostMode: { clicks: false },
		notify: false,
		online: true,
		// tunnel: 'yousutename', // Attempt to use the URL https://yousutename.loca.lt
	})
}

function fonts() {
    return src('app/fonts/src/*.*')
    .pipe(fonter({
        formats: ['woff', 'ttf']
    }))
    .pipe(ttf2woff2())
    .pipe(dest('app/fonts'))
}

function images() {
    return src(['app/images/src/*.*', '!app/images/src/*.svg', '!app/images/src/*.ico', '!app/images/src/*.json'])
    .pipe(newer('app/images'))
    .pipe(avif({ quality: 50 }))

    .pipe(src('app/images/src/*.*'))
    .pipe(newer('app/images'))
    .pipe(webp())

    .pipe(src('app/images/src/*.*'))
    .pipe(newer('app/images'))
    .pipe(imagemin())

    .pipe(dest('app/images'))
}

function scripts() {
	return src([
		'app/js/scripts.js', // Always at the end
		])
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(dest('app/js'))
		.pipe(browserSync.stream())
}

function styles() {
	return src([`app/${syntax}/**/*.${syntax}`])
		.pipe(sass({ 'include css': true }))
		.pipe(postCss([
			autoprefixer({ grid: 'autoplace' }),
			cssnano({ preset: ['default', { discardComments: { removeAll: true } }] })
		]))
		.pipe(concat('main.min.css'))
		.pipe(dest('app/css'))
		.pipe(browserSync.stream())
}

function startwatch() {
	watch([`app/${syntax}/**/*.${syntax}`], { usePolling: true }, styles)
	watch(['app/js/scripts.js', 'libs/**/*.js'], { usePolling: true }, scripts)
	watch([`*.{${fileswatch}}`, `app/**/*.{${fileswatch}}`], { usePolling: true }).on('change', browserSync.reload)
}

function cleanDist() {
    return src('dist')
    .pipe(clean())
}

function build() {
    return src([
        'app/css/main.min.css',
        'app/images/*.webp',
        'app/images/*.svg',
        'app/fonts/*.woff2',
        'app/js/main.min.js',
        'app/**/*.html'
    ], {base: 'app'})
    .pipe(dest('dist'))
} 

export { scripts, styles, build, images, fonts }
export let assets = series(scripts, styles)
export let building = series(cleanDist, build);

export default series(scripts, styles, parallel(browsersync, startwatch))