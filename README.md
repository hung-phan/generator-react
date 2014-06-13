# generator-react

A generator for [Yeoman](http://yeoman.io).


## Getting Started

To run this version of yeoman generator. First, make sure that you have already installed yeoman

```bash
$ npm install -g yo
```

For the reason that this name has been registered by another developer, you have to link the npm package manually.
Make sure you clone the project

```bash
$ npm -g install hung-phan/generator-react
```

Finally, initiate the generator:

```bash
$ yo react
```

Other dependencies

1. [Bower] (http://bower.io/)

2. [Grunt] (http://gruntjs.com/)

3. Compass (gem install compass)

4. SASS (gem install sass)

5. [Browserify] (browserify.org)

## Browserify alias
Alias for grunt browserify task are declared in __browserify.config.js__ with the format of __path:alias__.

## Usage

The version of generator uses SASS Bootstrap as its main theme. If you want to use Compass framework, make sure that you
view their docs to know what to include [Compass](http://compass-style.org/reference/compass)

To run the serve, and start building your application
```bash
$ grunt serve
```
It will automatically open the webpage on your localhost:9000, or you will have to do it manuallly

To build files for production
```bash
$ grunt build
```

## Routing

For control different components and their data logic, the generator uses [flatiron/director] (https://github.com/flatiron/director)
to control routing and binding of corresponding components.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
