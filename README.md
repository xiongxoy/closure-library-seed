# Closure Library Demos

An application made with [Closure Library](closure-library), generated with [Closure Library Generator](closure-library-generator).

The [Closure Library Generator](closure-library-generator) is currently unmaintained.
I spent some time to make things work again.
The the closure compiler in node package is broken. 



Use [Browsersync](browsersync) to replace Grunt livereload.
It can inform the browser to reload the page when watched files have changed.

## Getting Started

### Start server 

```shell
 	grunt server
```

### Run test in browser
```shell
	grunt server:test
```

### Run test in command line
```shell
	grunt test
```

### Update dependency 
```shell
	grunt deps
```

### Run Closure Compiler 
Closure Compiler will build a compressed version of javascript. 
All javascript will be in **app.js**.

```shell
	grunt build
```

### Other tasks

See **Gruntfile.js** for other tasks. 


## Creating Modular

The project folder is structured for modular javascript development. Follow the following steps to create new modulars.

1. Create new javascript modular in **app/js/app** folder 
2. Use **goog.provide()** and **goog.require()** to specify dependency.
3. Require modular in **main.js** for use in the browser or testing.
4. Call initialization code in **app/js/core.js**, but the code should be implemented in the **app/js/app**.


## Table Of Contents

* [Getting Started](#getting-started)
* [Creating Modular](#creating-modular)
* About
  - [Release History](#release-history)
  - [License](#license)



<sup>[↑ Back to TOC](#table-of-contents)</sup>

## Release History
- **v0.0.1**, *Mid Apr 2015*
  - Big Bang
  - Dependency management by Google Closure
  - Use Grunt to Watch Files. File Changes Will Trigger Tasks Execution.
  - Use Browsersync to Sync Source and Browser.
  - Use Bower for Front-end Dependency Management.

## License
Copyright (c) 2015 Zhou Xiong
Licensed under the [MIT](LICENSE-MIT).

<sup>[↑ Back to TOC](#table-of-contents)</sup>

[closure-library]: https://developers.google.com/closure/library/ "Google Closure Library"
[closure-tools]: https://developers.google.com/closure/ "Google Closure Tools"
[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/wiki/Getting-started
[package.json]: https://npmjs.org/doc/json.html
[Gruntfile]: https://github.com/gruntjs/grunt/wiki/Sample-Gruntfile "Grunt's Gruntfile.js"
[yeoman]: http://yeoman.io/ "yeoman Modern Workflows for Modern Webapps"
[bower]:http://twitter.github.com/bower/ "THE BROWSER PACKAGE MANAGER html, css, and javascript"
[closure-library-generator]: https://github.com/thanpolas/generator-closure "generate seed closure app"
[browsersync]: http://www.browsersync.io/ "browser sync"

