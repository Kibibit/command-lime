<p align="center">
  <a href="https://github.com/Kibibit/configit" target="blank"><img src="logo.png" width="150" ></a>
  <h2 align="center">
    @kibibit/command-lime
  </h2>
</p>
<p align="center">
 <!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<a href="#contributors-"><img src="https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square" alt="All Contributors"></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
</p>
<p align="center">
  Show what your CLI application can do using this terminal onboarding mock
</p>
<hr>

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
    <td align="center"><a href="http://thatkookooguy.kibibit.io/"><img src="https://avatars3.githubusercontent.com/u/10427304?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Neil Kalman</b></sub></a><br /><a href="https://github.com/Kibibit/configit/commits?author=Thatkookooguy" title="Code">💻</a> <a href="https://github.com/Kibibit/configit/commits?author=Thatkookooguy" title="Documentation">📖</a> <a href="#design-Thatkookooguy" title="Design">🎨</a> <a href="#maintenance-Thatkookooguy" title="Maintenance">🚧</a> <a href="#infra-Thatkookooguy" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/Kibibit/configit/commits?author=Thatkookooguy" title="Tests">⚠️</a></td>
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