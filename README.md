# web launcher

Kickstart web projects with Gulp, Bower, SASS, Jade, Bourbon and more.

## Get started
You need to have [Node.js](https://nodejs.org/) installed to use the Web Launcher. After that, clone this repository to your computer and use it as the foundation of your next web project.

To get started, run `NPM install` in the root folder of your project. This installs the node modules, that Web Launcher requires. NPM is a package manager, that comes with Node.js - read more about it [here](https://www.npmjs.com/).

Next, run `bower install` to install the Bower packages that is used by Web Launcher. Bower is a front-end package manager and you can read more about [here](http://bower.io/).

You are now ready to `gulp` and get cracking with some front-endin'. 

## Jade
In Web Launcher you use the templating language Jade instead of writing plain HTML. The task runner, Gulp, will then be used to compile Jade til HTML. A few of the advantages of Jade is that its shorter and faster to write and that you can "extend" Jade files into each other (I recommend placing your websites header and footer in `layout/layout.jade`). Read more about Jade [here](http://jade-lang.com/). 

## Sass
The CSS preprocessor in Web Launcher is Sass and we use the [libsass](http://libsass.org/) variant since it does not require Ruby and is much faster than the Ruby version. Read more about Sass [here](http://sass-lang.com/).

Sass files are separated in the folders `pages`, `modules`, `utilities` and `base`. The styles in `base` contains the base styling from [Bitters](http://bitters.bourbon.io/) - change these styles as needed in your project.

### Bourbon
Bourbon is a popular and lightweight mixin library for Sass. Use it as little or as much as you wish. Since a lot of people use it, it is easy to find help online. Bourbon also has [excellent documentation](http://bourbon.io/docs/).

### Neat
Neat a simple, semantic (meaning "not class-based") grid system for Sass. It is built on top of Bourbon, and like Bourbon it has a big community of users and great [documentation](http://thoughtbot.github.io/neat-docs/latest/) and [examples](http://neat.bourbon.io/examples/).

## gulp

## Styleguide

## Heroku
- Link + guide

