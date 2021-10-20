let folderName = '';
let availableFolders = [];

let validateKebab = (joined) => !_.includes(['kebab', 'lower'], Case.of(joined));

let semverRegex = () => /\bv?(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-[\da-z-]+(?:\.[\da-z-]+)*)?(?:\+[\da-z-]+(?:\.[\da-z-]+)*)?\b/ig;

jQuery(function ($, undefined) {
  $.cliLit.globalFunctions = {
    'mkdir -h': {
      output: [
        $.cliLit.txt.blue('command:\n    mkdir'),
        $.cliLit.txt.green('  <folder_name>')
      ].join('')
    }
  };

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
    height: 250,
    clearOnEveryStep: false
  });

  $('#second-term-demo').terminalOnboarding([{
    greetings: [
      'in this demo, the terminal clears itself after every command\n',
      'run `git init`'
    ].join(''),
    prompt: $.cliLit.txt.red('~/project') + $.cliLit.txt.green(' > '),
    command: 'git init'
  }, {
    clear: false,
    greetings: 'great! see how the terminal cleared itself?\nnow, run `git status`',
    prompt: $.cliLit.txt.red('~/project') + $.cliLit.txt.green('(master) > '),
    command: 'git status',
    output: function () {
      this.clear();
      this.echo('this should be shown and not cleaned.\nthis is because of the clear: false attribute');

      return true;
    }
  }], {
    height: 250,
    clearOnEveryStep: true
  });

  function outputMkdir(folder) {
    if (folder.indexOf('-h') > -1 || folder.indexOf('--help') > -1) {
      return false;
    }
    if (folder.length !== 1) {
      this.echo($.cliLit.txt.red('mkdir expect a single variable'));

      return false;
    }

    availableFolders.push(folder[0]);

    return $.cliLit.txt.green('folder created');
  }

  function outputCd(params) {
    if (params.length !== 1) {
      this.echo($.cliLit.txt.red('cd expect a single variable'));

      return false;
    }

    if (!_.includes(availableFolders, params[0])) {
      this.echo($.cliLit.txt.red(`no folder named "${params[0]}" found`));

      return false;
    }

    folderName = params[0];
  }

  function outputNpmInit() {
    return `This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.


See \`npm help json\` for definitive documentation on these fields
and exactly what they do.


Use \`npm install <pkg> --save\` afterwards to install a package and
save it as a dependency in the package.json file.


Press ^C at any time to quit.`;
  }

  function outputNpmInitName(params) {
    params = params.length ? params : [folderName];

    let joined = params.join(' ');

    if ((/[A-Z]/gm).test(joined)) {
      this.echo($.cliLit.txt.red('Sorry, name can no longer contain capital letters.'));

      return false;
    }

    if (!(/^[a-zA-Z0-9_-]*$/gm).test(joined)) {
      this.echo($.cliLit.txt.red('Sorry, name can only contain URL-friendly characters.'));

      return false;
    }
  }

  function outputPrompt() {
    return $.cliLit.txt.red(`~${folderName ? '/' + folderName : ''}`) + $.cliLit.txt.green(' > ');
  }
});
