import chai, { expect, assert } from 'chai';
import chaiDom from 'chai-dom';
import multipleFonts from '../src/multiple-fonts';

chai.use(chaiDom);

let array = [];
let result = '';

describe('Multiple Fonts', () => {
  describe('#When mainElement is an object', () => {
    const dom = document.createElement('p');
    dom.append('This is some text to test');

    array = {
      mainElement: dom,
      text: 'This is some text to test.',
      searchByRegex: /text/g,
      splitByChar: ' ',
      multiple: [
        { pos: 1, font: 'Arial', returnTag: 'span' },
        { pos: 31, font: 'Arial', returnTag: 'span' },
      ],
    };
    result = multipleFonts(array);
    it('Result is an HTMLElement', () => {
      assert.instanceOf(result, HTMLElement, 'Result is an HTML Object');
    });
  });

  describe('#When mainElement is a tagname string', () => {
    array = {
      mainElement: 'h1',
      text: 'This is some text to test.',
      searchByRegex: /text/g,
      splitByChar: ' ',
      multiple: [
        { pos: 1, font: 'Arial', returnTag: 'span' },
        { pos: 31, font: 'Arial', returnTag: 'span' },
      ],
    };
    result = multipleFonts(array);
    it('Result is an HTMLElement', () => {
      assert.instanceOf(result, HTMLElement, 'Result is an HTML Object');
    });
  });

  describe('#Check parameters of array', () => {
    it('text is null. Error returned.', () => {
      array = {
        mainElement: 'h1',
        searchByRegex: /text/g,
        splitByChar: ' ',
        multiple: [
          { pos: 1, font: 'Arial', returnTag: 'span' },
          { pos: 31, font: 'Arial', returnTag: 'span' },
        ],
      };
      result = multipleFonts(array);
      expect((result.textContent).trim()).to.equal('Error. text parameter not specified.');
    });

    it('searchByRegex is null. Error returned.', () => {
      array = {
        mainElement: 'h1',
        text: 'This is some text to test.',
        multiple: [
          { pos: 1, font: 'Arial', returnTag: 'span' },
          { pos: 31, font: 'Arial', returnTag: 'span' },
        ],
      };
      result = multipleFonts(array);
      expect((result.textContent).trim()).to.equal('Error. Not parameters splitByChar or searchByRegex specified.');
    });

    it('searchByRegex is not a regex expression. Error returned.', () => {
      array = {
        mainElement: 'h1',
        text: 'This is some text to test.',
        searchByRegex: ' ',
        multiple: [
          { pos: 1, font: 'Arial', returnTag: 'span' },
          { pos: 31, font: 'Arial', returnTag: 'span' },
        ],
      };
      result = multipleFonts(array);
      expect((result.textContent).trim()).to.equal('Error. searchByRegex parameter is not a regex expression.');
    });

    it('searchByRegex not match with expression. Same text returned.', () => {
      array = {
        mainElement: 'h1',
        text: 'This is some text to test.',
        searchByRegex: /algo/g,
        multiple: [
          { pos: 1, font: 'Arial', returnTag: 'span' },
          { pos: 31, font: 'Arial', returnTag: 'span' },
        ],
      };
      result = multipleFonts(array);
      expect((result.textContent).trim()).to.equal(array.text);
    });

    it('splitByChar not match with string. Same text returned.', () => {
      array = {
        mainElement: 'h1',
        text: 'This is some text to test.',
        splitByChar: '-',
        multiple: [
          { pos: 1, font: 'Arial', returnTag: 'span' },
          { pos: 31, font: 'Arial', returnTag: 'span' },
        ],
      };
      result = multipleFonts(array);
      expect((result.textContent).trim()).to.equal(array.text);
    });

    it('splitByChar is null. Error returned.', () => {
      array = {
        mainElement: 'h1',
        text: 'This is some text to test.',
        multiple: [
          { pos: 1, font: 'Arial', returnTag: 'span' },
          { pos: 31, font: 'Arial', returnTag: 'span' },
        ],
      };
      result = multipleFonts(array);
      expect((result.textContent).trim()).to.equal('Error. Not parameters splitByChar or searchByRegex specified.');
    });

    it('multiple[] are null. Error returned.', () => {
      array = {
        mainElement: 'h1',
        text: 'This is some text to test.',
        searchByRegex: /text/g,
        splitByChar: ' ',
      };
      result = multipleFonts(array);
      expect((result.textContent).trim()).to.equal('Error. Not font specified, add one font in multiple[] parameter.');
    });
  });
});
