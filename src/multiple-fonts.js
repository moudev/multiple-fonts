function createElement(type, text, font) {
  const element = document.createElement(type);
  element.style.fontFamily = font;
  element.innerHTML = text;
  return element;
}

export default function multipleFonts(options) {
  const {
    mainElement = 'div',
    searchByRegex,
    splitByChar,
    multiple = [],
  } = options;

  let { text } = options;

  const ERRORS = {
    notText: 'Error. text parameter not specified.',
    notParamSplitRegex: 'Error. Not parameters splitByChar or searchByRegex specified.',
    notSearchByRegexObject: 'Error. searchByRegex parameter is not a regex expression.',
    notMultipleFonts: 'Error. Not font specified, add one font in multiple[] parameter.',
  };

  let newText;
  let backupText = [];
  let lengthNewText = 0;

  let main = '';
  if (typeof mainElement === 'string') {
    main = document.createElement(mainElement);
  } else {
    main = mainElement;
    text = main.textContent;
  }
  main.innerHTML = '';

  if (text) {
    if (searchByRegex) {
      if (typeof searchByRegex !== 'object') {
        newText = [ERRORS.notSearchByRegexObject];
      } else {
        newText = text.replace(searchByRegex, '|-@|-').split(/\|-/);
        // If not match searchByRegex return same text
        newText = newText.length === 1 ? [text] : newText;
        lengthNewText = newText.length - 1;
        const match = (/\/(.+)\//g).exec(String(searchByRegex));
        backupText = (newText.length === 1) ? [text] : [match[1]];
      }
    } else if (splitByChar && !searchByRegex) {
      // If not match splitByChar, split function return the same text in an array
      newText = text.split(splitByChar);
      lengthNewText = newText.length - 1;
      if (multiple.length > 0 && newText.length > 1) {
        // Determining the text to make it backup
        // Checking that font position is not more than length of multiple[]
        multiple.map(font => backupText.push(newText[Math.min(font.pos, lengthNewText)]));
        // Determining the position to make replace with @
        // Checking that font position is not more than length of multiple[]
        multiple.map(font => newText.splice(Math.min(font.pos, lengthNewText), 1, '@'));
      }
    } else {
      newText = [ERRORS.notParamSplitRegex];
    }
  } else if (!text) {
    newText = [ERRORS.notText];
  }

  if (newText.length > 1 && multiple.length > 0) {
    const keysMatchReplace = [];
    // Saving positions of matches @
    newText.map((v, i) => (v === '@' ? keysMatchReplace.push(i) : null));

    let font = '';
    let positionBackup = 0;
    //  Getting the indices of matches @
    keysMatchReplace.forEach((value, index) => {
      // Determining indice of backupText to show
      // Can be many many matches @ but only one backuptext
      positionBackup = Math.min(backupText.length - 1, index);
      // Can be many matches @ but only one font
      font = multiple[Math.min(multiple.length - 1, index)];

      newText.splice(
        value, // Position of the match
        1,
        createElement(font.returnTag, backupText[positionBackup], font.font),
      );
    });
  } else if (multiple.length === 0) {
    newText = [ERRORS.notMultipleFonts];
  }
  newText.forEach((ele) => {
    main.append(ele);
    main.append(' ');
  });
  return main;
}
