(function ($) {

  // { put here output of help capture in generator }
  const GENERALMAPPER = {
    'marko': 'polo'
  };

  let COLORS = {
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
    txt: txt
  };

  $.fn.terminalOnboarding = function (stepsArray) {
    let currentStep = 0;

    if (!this.terminal || !_.isFunction(this.terminal)) {
      throw new Error('looks like you do not have jQuery Terminal imported above this module');
    }

    this.addClass('kb-terminal-demo');

    const inner = $('<div class="kb-terminal-inner"></div>');

    inner.appendTo(this);

    inner.terminal(runStep, {
      greetings: stepsArray[currentStep].greetings,
      prompt: stepsArray[currentStep].prompt,
      name: `step ${currentStep}`,
      height: 400
    });

    $('#test').text('this is what I got! ' + JSON.stringify(stepsArray));

    return this;

    function runStep(command) {
      let step = stepsArray[currentStep];

      const isWildCard = _.endsWith(step.command, ' *');

      const everythingBesidesWildCard = step.command.replace(/ \*$/gm, '');

      const isCommandPassedStepCommand = isWildCard ?
        _.startsWith(command, everythingBesidesWildCard) :
        command === step.command;

      if (step && isCommandPassedStepCommand) {
        const output = _.isFunction(step.output) ?
          step.output.call(this, cleanCommand(command, everythingBesidesWildCard)) :
          step.output;

        if (_.isString(output)) {
          this.echo(output || '');
        }

        if (_.isBoolean(output) && !output) {
          return;
        }
        
        currentStep++;

        nextStep = stepsArray[currentStep];

        if (currentStep !== 0 && nextStep && nextStep.greetings) {
          this.echo(nextStep.greetings);
        }

        if (nextStep) {
          this.push(runStep, {
            greetings: nextStep.greetings,
            prompt: nextStep.prompt,
            name: `step ${currentStep}`,
            height: 250
          });
        }
      } else {
        if (GENERALMAPPER[command]) {
          this.echo(GENERALMAPPER[command]);
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

}(jQuery));
