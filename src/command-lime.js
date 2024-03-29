(function($) {
  // { put here output of help capture in generator }
  // eslint-disable-next-line no-unused-vars
  const GENERALMAPPER = {
    'marko': 'polo'
  };

  const COLORS = {
    BLUE: '#209cee',
    RED: '#ff3860',
    YELLOW: '#ffdd57',
    GREEN: '#23d160'
  };

  const txt = {
    blue: (text) => colored(COLORS.BLUE, text),
    red: (text) => colored(COLORS.RED, text),
    yellow: (text) => colored(COLORS.YELLOW, text),
    green: (text) => colored(COLORS.GREEN, text)
  };

  $.cliLit = {
    COLORS: COLORS,
    txt: txt,
    globalCommands: {}
  };

  $.fn.terminalOnboarding = function(stepsArray, options) {
    const container = this;

    options = options || {};

    let currentStep = 0;

    if (!this.terminal || !_.isFunction(this.terminal)) {
      throw new Error(
        'looks like you do not have jQuery Terminal imported above this module'
      );
    }

    this.addClass('kb-terminal-demo');

    const inner = $('<div class="kb-terminal-inner"></div>');

    inner.appendTo(this);

    const promptOutput = _.isFunction(stepsArray[currentStep].prompt) ?
      stepsArray[currentStep].prompt.call(this) :
      stepsArray[currentStep].prompt;

    const greetingsOutput = _.isFunction(stepsArray[currentStep].greetings) ?
      stepsArray[currentStep].greetings.call(this) :
      stepsArray[currentStep].greetings;

    const termOptions = {
      greetings: greetingsOutput,
      prompt: promptOutput,
      name: `step ${currentStep}`
    };

    if (options.height) {
      termOptions.height = options.height;
    }

    inner.terminal(runStep, termOptions);

    container.attr('data-title', stepsArray[currentStep].name || 'terminal');

    $('#test').text('this is what I got! ' + JSON.stringify(stepsArray));

    return this;

    function runStep(command, step) {
      const noNext = _.isObject(step) && step.command;
      step = noNext ? step : stepsArray[currentStep];

      const isWildCard = _.endsWith(step.command, '*');

      const everythingBesidesWildCard = step.command
        .replace(/\*$/gm, '').trim();

      const isCommandPassedStepCommand = isWildCard ?
        _.startsWith(command, everythingBesidesWildCard) :
        command === step.command;

      if (step && isCommandPassedStepCommand) {
        const output = _.isFunction(step.output) ?
          step.output.call(
            this,
            cleanCommand(command, everythingBesidesWildCard.split(' '))
          ) :
          step.output;

        if (_.isString(output)) {
          this.echo(output || '');
        }

        if (_.isBoolean(output) && !output) {
          const globalFunction = checkGlobalFunctions(command);
          return isWildCard && globalFunction ?
            runStep.call(this, command, globalFunction) :
            null;
        }

        const clearIt = _.isBoolean(step.clear) ?
          step.clear :
          options.clearOnEveryStep;

        if (clearIt) {
          this.clear();
        }

        if (noNext) {
          return;
        }

        currentStep++;

        nextStep = stepsArray[currentStep];

        if (nextStep && nextStep.name) {
          container.attr('data-title', nextStep.name);
        }

        if (currentStep !== 0 && nextStep && nextStep.greetings) {
          const greetingsOutput = _.isFunction(nextStep.greetings) ?
            nextStep.greetings.call(this) :
            nextStep.greetings;

          this.echo(greetingsOutput);
        }

        if (nextStep) {
          const promptOutput = _.isFunction(nextStep.prompt) ?
            nextStep.prompt.call(this) :
            nextStep.prompt;

          this.push(runStep, {
            greetings: nextStep.greetings,
            prompt: promptOutput,
            name: `step ${currentStep}`,
            height: 250
          });
        } else {
          // stop terminal interaction
          this.freeze(true);
        }
      } else {
        const foundGlobalFunction = checkGlobalFunctions(command);
        if (foundGlobalFunction) {
          return runStep.call(this, command, foundGlobalFunction);
        } else {
          this.echo(txt.red(`command not found: ${command}`));
        }
      }
    }
  };

  function colored(color, text) {
    const definedColor = COLORS[_.upperCase(color)];
    return definedColor ?
      `[[;${definedColor};]${ text }]` :
      `[[;${color};]${ text }]`;
  }

  function cleanCommand(command, notParams) {
    const res = command.replace(notParams, '').trim().split(/\s/) || [];
    return res.filter((str) => str !== '');
  }

  function checkGlobalFunctions(command) {
    const exactMatch = $.cliLit.globalFunctions[command];
    let commandName = command;

    const wildCardMatch = _.find(
      $.cliLit.globalFunctions,
      (functionObject, functionIdentifier) => {
        if (
          _.endsWith(functionIdentifier, '*') &&
          _.startsWith(command, functionIdentifier)
        ) {
          commandName = functionIdentifier;

          return true;
        }

        return false;
      });

    if (exactMatch) {
      return _.assign.apply(_, [ exactMatch, { command: commandName } ]);
    }

    if (wildCardMatch) {
      return _.assign.apply(_, [ wildCardMatch, { command: commandName } ]);
    }

    return;
  }
}(jQuery));
