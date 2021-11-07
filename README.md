<p align="center">
  <a href="https://kibibit.io/command-lime/" target="blank"><img src="logo-clear.png" width="150" ></a>
  <h2 align="center">
    @kibibit/command-lime
  </h2>
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/@kibibit/command-lime"><img src="https://img.shields.io/npm/v/@kibibit/command-lime/latest.svg?style=for-the-badge&logo=npm&color=CB3837"></a>
</p>
<p align="center">
<a href="https://www.npmjs.com/package/@kibibit/command-lime"><img src="https://img.shields.io/npm/v/@kibibit/command-lime/beta.svg?logo=npm&color=CB3837"></a>
<a href="https://github.com/Kibibit/command-lime/actions/workflows/build.yml">
  <img src="https://github.com/Kibibit/command-lime/actions/workflows/build.yml/badge.svg?style=flat-square&branch=beta" alt="Build">
</a>
<a href="https://github.com/semantic-release/semantic-release"><img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg"></a>
 <!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<a href="#contributors-"><img src="https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square" alt="All Contributors"></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
</p>
<p align="center">
  Show what your CLI application can do using this terminal onboarding mock
</p>
<hr>

cdn:
 - styles: https://cdn.jsdelivr.net/npm/@kibibit/command-lime/dist/command-lime.min.css
 - script: https://cdn.jsdelivr.net/npm/@kibibit/command-lime/dist/command-lime.min.js

## Installation

### Include the style and script
This package depends on [jquery.terminal](https://terminal.jcubic.pl/) and it should be included before the import of this package

#### CDN
At you HTML's head:
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery.terminal/1.17.0/css/jquery.terminal.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@kibibit/command-lime/dist/command-lime.min.css">
```
At the end of your HTML's body:
```html
<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.terminal/1.17.0/js/jquery.terminal.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@kibibit/command-lime/dist/command-lime.min.js"></script>
```

#### NPM
```
npm install --save @kibibit/command-lime
```

## Usage

```html
<div id="term-demo" class="kb-om" data-title="demo CLI"></div>
```
```javascript
$('#term-demo').terminalOnboarding([{
  name: 'demo CLI - create project',
  greetings: 'Hello there! please run `mkdir` with a folder name to continue',
  prompt: outputPrompt,
  command: 'mkdir *',
  output: outputMkdir
}, {
  name: 'demo CLI - go into project',
  greetings: () => `now that you created your folder, please go into it with "cd ${availableFolders[0]}"`,
  prompt: outputPrompt,
  command: 'cd *',
  output: outputCd
}, {
  name: 'demo CLI - initialize project',
  greetings: 'please initialize your project with `npm init`',
  prompt: outputPrompt,
  command: 'npm init',
  output: outputNpmInit
},
{
  prompt: () => `name: (${folderName}) `,
  command: '*',
  output: outputNpmInitName
},
{
  prompt: 'version: (1.0.0) ',
  command: '*',
  output: function (params) {
    params = params.length ? params : ['1.0.0'];

    if (!semverRegex().test(params.join(' '))) {
      this.echo($.cliLit.txt.red('version must be in a semver schema'));

      return false;
    }
  }
},
{
  prompt: 'description: ',
  command: ''
},
{
  prompt: 'git repository: ',
  command: ''
},
{
  prompt: 'keywords: ',
  command: ''
},
{
  prompt: 'author: ',
  command: ''
},
{
  prompt: 'license: (ISC) ',
  command: ''
},
{
  prompt: `About to write to /Users/nkalman/Development/aaaaaaa/package.json:

{
"name": "my-thing",
"version": "1.0.0",
"main": "index.js",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1"
},
"author": "",
"license": "ISC",
"dependencies": {},
"devDependencies": {},
"description": ""
}


Is this ok? (yes) `,
  command: ''
},
{
  name: 'install project dependencies',
  clear: false,
  greetings: 'let\'s install our dependencies with `npm install`',
  prompt: outputPrompt,
  command: 'npm install *',
  output: function (params) {
    if (params.length > 2) {
      this.echo('got these params: ' + params.toString());
      this.echo($.cliLit.txt.red('please run npm install without any parameters'));

      return false;
    }

    this.echo($.cliLit.txt.green(`all dependencies installed`));

    this.echo($.cliLit.txt.blue(`\n~= Thank you for onboarding! =~`));

    return true;
  }
}], {
  height: 150,
  clearOnEveryStep: false
});
```

## Examples
See the examples folder for a variety of usage examples

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://thatkookooguy.kibibit.io/"><img src="https://avatars3.githubusercontent.com/u/10427304?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Neil Kalman</b></sub></a><br /><a href="https://github.com/Kibibit/command-lime/commits?author=Thatkookooguy" title="Code">💻</a> <a href="https://github.com/Kibibit/command-lime/commits?author=Thatkookooguy" title="Documentation">📖</a> <a href="#design-Thatkookooguy" title="Design">🎨</a> <a href="#maintenance-Thatkookooguy" title="Maintenance">🚧</a> <a href="#infra-Thatkookooguy" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/Kibibit/command-lime/commits?author=Thatkookooguy" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

## Stay in touch

- Author - [Neil Kalman](https://github.com/thatkookooguy)
- Website - [https://github.com/kibibit](https://github.com/kibibit)
- StackOverflow - [thatkookooguy](https://stackoverflow.com/users/1788884/thatkookooguy)
- Twitter - [@thatkookooguy](https://twitter.com/thatkookooguy)
- Twitter - [@kibibit_opensrc](https://twitter.com/kibibit_opensrc)
