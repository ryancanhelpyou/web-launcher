# [ Web Launcher ](https://github.com/lkabell/web-launcher)

Kickstart web projects with Bourbon, Neat, Gulp, Bower, Sass, Jade, a simple styleguide and more. Web Launcher combines useful modern development tools in a boilerplate project and includes cherry-picked elements and inspiration from other great web scaffolding projects like [Google's Web Starter Kit](https://developers.google.com/web/starter-kit/) and [chriskjaer's Prototype Seed](https://github.com/chriskjaer/prototype-seed).

## Get started
You need to have [Node.js](https://nodejs.org/) installed to use the Web Launcher. After that, clone this repository to your computer and use it as the foundation of your next web project.

To get started, run `NPM install` in the root folder of your project. This installs the node modules that Web Launcher requires. NPM is a package manager, that comes with Node.js - read more about it [here](https://www.npmjs.com/).

Next, run `bower install` to install the Bower packages that is used by Web Launcher. Bower is a front-end package manager and you can read more about [here](http://bower.io/).

You are now ready to run `gulp` and get cracking with some front-endin'. 

## Jade
In Web Launcher you can use the templating language Jade instead of writing plain HTML (but you do not have to). The task runner, Gulp, will then be used to compile Jade files til HTML files. A few of the advantages of Jade is that its shorter and faster to write and that you can "extend" Jade files into each other (I recommend placing your websites header and footer in `layout/layout.jade`).

Read more about Jade [here](http://jade-lang.com/).

If you want, you can also write normal HTML files - or include a mix of Jade and HTML files, if that makes sense for you.

## Sass
The CSS preprocessor in Web Launcher is Sass and we use the [libsass](http://libsass.org/) variant since it does not require Ruby and is much faster than the Ruby version. Read more about Sass [here](http://sass-lang.com/).

Sass files are separated in the folders `/pages`, `/modules`, `/utilities` and `/base`. The styles in `/base` contains the base styling from [Bitters](http://bitters.bourbon.io/) - change these styles as needed in your project. When adding new Sass files, remember to add a reference to it in `main.scss`. All Sass files will be compiled into one big CSS file called `main.css`

### Bourbon
Bourbon is a popular and lightweight mixin library for Sass. Use it as little or as much as you wish. Since a lot of people use it, it is easy to find help online. Bourbon also has [excellent documentation](http://bourbon.io/docs/).

### Neat
Neat a simple, semantic (meaning not class-based) grid system for Sass. It is built on top of Bourbon, and like Bourbon it has a big community of users and great [documentation](http://thoughtbot.github.io/neat-docs/latest/) and [examples](http://neat.bourbon.io/examples/).

### Plain CSS

If you need to, you can write plain CSS files and place them in the `/app/styles` folder. These CSS files will be copied and placed alongside the `main.css` file.

## gulp
Web Launcher uses Gulp as task runner. To get started, all you need to do is run `gulp` which will start the default task. This tasks will
* Start a local server and open your website in the browser
* Refresh the browser when files change
* Compiles Jade and Sass files, when they are changed
* Minifies and concatinates JS-files
* Copies everything in the root level of the `app` folder to the `/dist` folder

You can see all Gulp tasks in the `gulpfile.js` in the root of the project. Learn more about Gulp and find Gulp plugins [here](http://gulpjs.com/).

## File structure
In Web launcher, all the files that will be edited is in the `/app` folder. This includes Sass files, Jade files, JS files, images, fonts and HTML files (if you include any). The Gulp tasks will process all the Sass/Jade/JS/etc. and output the production files to the `dist` folder. All other files at the root level of `app` will just be copied to the root level of `dist`.

## Styleguide

Web Launcher includes af styleguide page: `styleguide.html`. The styling of the elements comes directly from the Sass files in your projects, so changes in the Sass files will be reflected immetiately in the styleguide. Add new elements to the styleguide by following the pattern in the existing HTML. For instance:
 
```HTML
<!-- Buttons Start -->
<a name="buttons"></a>
<section class="styleguide__buttons">
    <h2 class="subsection-title"><strong class="subsection-number">#02</strong> Buttons</h2>

    <div>
        <strong class="subsection-number">Primary button</strong>

        <div class="code-sample">
            <button>Press me!</button>
        </div>
    </div>

    <div>
        <strong class="subsection-number">Secondary button</strong>

        <div class="code-sample">
            <button class="button--secondary">Press me!</button>
        </div>
    </div>
</section>
<!-- Buttons End -->
```

Place the elements code inside the DIVs with the `code-sample`-class. When the "Toggle code snippets" button is clicked, the HTML code for each element will be shown.

Do not forget to also edit the "table of contents" in the top of the page, that links directly to different elements in the styleguide.
 

## Heroku
- Link + guide

