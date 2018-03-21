# gulp-static-template-resolver
Resolve ES6 style templates in files, together with some helper functions for generating static HTMLs based on templates.

# Why is it useful
User of templates usually spend a lot of time going through a template to replace the dummy information with what they want. 
The idea is to define all the information in a separate JSON file, and pass that file to a gulp task which then resolve those data. Essentially, very similiar to what happens in a dynamic web page, only that this is useful for static web pages using gulp.

# How to install
npm i -D gulp-es6-template-resolver

# How to use

In your gulp file, define a `templateResolver` object, and a `template` task like this:
```
var templateResolver = require('gulp-es6-template-resolver');

gulp.task('template', function() {
    return gulp.src('src/templates/**/*.html')   // Source of html files using template tags
        .pipe(plumber())
        .pipe(templateResolver('./src/templates/resolve/commands.js', './src/templates/resolve/data.json')) 
        .pipe(gulp.dest('src/'))
        // Refresh the browser after the css files are compiled
        .pipe(browserSync.reload({
            stream: true
        }))
});
```

Define your template data in a json file. In the example above, it's in './src/templates/resolve/data.json'. Here is an example:
```
{
    "website": {
        "title": "Template literals are cool",
        "name": "Templates"    
    }    
}
```

Then in your html files simple use them using ES6 template literal syntax. For example:

```
<html>
  <head>
    <title>${website.title}</template>
  </head>
  ...
</html>
```

You can also define custome tag constructors inside a JS module, and then use them use them inside the templates.
For example,  your './src/templates/resolve/commands.js' file might like this:

```
module.exports = {
    // Define a menu header, with title and url passed as arguments.
    menu: (title, url) => `<li class="nav-item"><a class="nav-link" href="${url}">${title}</a></li>`,
    
    // Define a dropdown menu, with title and items as arguments. Items should be a dropdown_item to work as intended.
    dropdown_menu: (title, items) => `<li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                 href="#" id="navbarDropdown${title}"> 
                ${title}
              </a>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown${title}">
              ${items}
              </div></li>`,
              
    // Define a dropdown_item to be used as a dropdown_menu child.
    dropdown_item: (title, url) => `<a class="dropdown-item" href="${url}">${title}</a>`,
};
```
Then you can add a menu in you html file like this: ` ${menu('Contact', 'contact.html')} `.

Moroever, you can use the ```many``` helper function to avoid repetivie tasks, and also to keep related information close to each other. This is very useful when defining menus, cards etc. You can pass a function as the first argument, and any number of arguments to the function as lists: For example, here is how to create 3 menus:
` ${many(menu, ['first', 'first.html'], ['second', 'second.html'], ['third', 'third.html'])} `.

Here is a complete example:
```
<nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <a class="navbar-brand" href="index.html">${website.name}</a>
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <!-- Create two menus -->
            ${many(menu, ['About', 'about.html'], ['Contact', 'contact.html'])}
            <!-- Create one dropdown with three items -->
            ${dropdown_menu('Portfolios', many(dropdown_item, ['A', 'a.html'], ['B', 'b.html'], ['C', 'c.html']))}
            <!-- Create one last menu -->
            ${menu('Help', 'help.html')}
          </ul>
        </div>
      </div>
    </nav>
...
```

# Things to know:  
 - The JSON data file and the JS tag file are being watched by gulp, so any change in those will be reflected instantly.
 - The template resolver is fine with partial JSON data. So, if it doesn't find a template to resolve from the JSON or JS files provided to the template resolver, it simply ignores them. This is helpful if you are using other template literals in your html files for other purposes, e.g. other gulp tasks, or if you are using JS literals to resolve them dynamically.
 

