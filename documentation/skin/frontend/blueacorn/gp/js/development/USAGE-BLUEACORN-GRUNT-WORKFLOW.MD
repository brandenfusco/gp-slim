#BlueAcorn/GruntWorkflow

### Automating Your Web Workflow with Grunt.js

Grunt.js is a task-based command line tool written in JavaScript that chugs along in the background and, with the right set of plugins, can be set to automatically combine and minify CSS and JavaScript files; check HTML, Javascript, and JQuery for errors; compile Sass to CSS; write browser-compatible code; and more. You can write your most complicated tasks once and leverage them in all of your projects using project specific configuration.

Grunt.js doesn't limit you to JavaScript specific tasks either, because Grunt.js is built on top of Node.js you can leverage all the power of Node in your tasks. Even if your tool isn't implemented in JavaScript we can defer tasks to child processes, using their command line interface or even a web service.

### Current Folder Structure

```
blueacornui/
    configs/
        autoprefixer.json
        browserSync.js
        combo.js
        concurrent.js
        githooks.js
        imagemin.js
        jshint.js
        path.js
        postcss.js
        shell.js
        svgmin.js
        themes.js
        uglify.js
        usebanner.js
        watch.js
    tasks/
    	compile.js
    	githooks.js
    	production.js
    	qc.js
    	staging.js
    .gitignore
    bower.json
    Gruntfile.js
    package.json
    setup.sh

Directories where files are written to after compiling.

* webroot/app/design/frontend/blueacorn/site/
* webroot/skin/frontend/blueacorn/site/
    
```

## blueacronui/configs

Follow link below for additional information on the config files.

* [blueacronui/configs](https://github.com/BlueAcornInc/green-pistachio/tree/master/documentation/skin/frontend/blueacorn/site/js/development/USAGE-BLUEACORN-GRUNT-CONFIGS.MD)

### Information on the rest of the files

* [compile.js](#compile)
* [githooks.js](#githooks)
* [production.js](#production)
* [qc.js](#qc)
* [staging.js](#staging)
* [.gitignore](#gitignore)
* [bower.json](#bower)
* [Gruntfile.js](#gruntfile)
* [package.json](#package)
* [setup.sh](#setup)

### [compile.js](id:compile)

- Development Theme Compilation

### [githooks.js](id:githooks)

- Evaluate Theme Javascript

### [production.js](id:production)

- Production Theme Compilation

### [qc.js](id:qc)

- Evaluate Theme Javascript

### [staging.js](id:staging)

- Staging Theme Compilation

### [.gitignore](id:gitignore)

- Files to be ignored by Git

### [bower.json](id:bower)

- List of Bower Dependencies

### [Gruntfile.js](id:gruntfile)

- A Gruntfile is a JavaScript file that Grunt leverages to understand your projects tasks and configuration.

### [package.json](id:package)

- List of all dependencies- s.

### [setup.sh](id:setup)

- Shell commands for an intial site setup

