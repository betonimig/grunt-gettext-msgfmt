# grunt-gettext-msgfmt

> Compile .po files with msgfmt.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-gettext-msgfmt --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-gettext-msgfmt');
```

## The "gettext_msgfmt" task

### Overview
In your project's Gruntfile, add a section named `gettext_msgfmt` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  gettext_msgfmt: {
    options: {
      // Task-specific options go here.
    },
    files: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.mode
Type: `String`
Default value: `''`

Operation mode: java, java2, csharp, csharp-resources, tcl, qt, desktop, xml or ""

#### options.verbose
Type: `Boolean`
Default value: true

Increase verbosity level

###Operation mode params

#### options.resourse
Type: `String`
Default value: `''`

Resource name

#### options.destDir
Type: `String`
Default value: `''`

Base directory (see `man msgfmt`)

#### options.locale
Type: `String`
Default value: `''`

Locale name, either language or language_COUNTRY

### Usage Examples

#### Compile .po to .mo
Compile .po files into binary .mo files.

```js
grunt.initConfig({
  gettext_msgfmt: {
    options: {},
    files: {
      'locales/en.mo': 'locales/en.po',
      'locales/ru.mo': 'locales/ru.po',
    },
  },
});
```

#### Compile .po with java mode

```js
grunt.initConfig({
  gettext_msgfmt: {
    options: {
        mode: 'java2',  // Operation mode
        resourse: 'com.exampleapp.translations.messages',
        destDir: 'target/classes',
        locale: 'ru'
    },
    files: {
      src: 'locales/ru.po'
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
