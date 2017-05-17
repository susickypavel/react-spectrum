import assert from 'assert';
import Autocomplete from '../../src/Autocomplete';
import Button from '../../src/Button';
import ComboBox from '../../src/ComboBox';
import React from 'react';
import {shallow} from 'enzyme';
import Textfield from '../../src/Textfield';

describe('ComboBox', () => {
  it('should render a textfield and button', () => {
    const tree = shallow(<ComboBox />);
    assert.equal(tree.type(), Autocomplete);
    assert.equal(tree.prop('className'), 'coral-ComboBox coral-InputGroup coral-DecoratedTextfield');

    assert.equal(tree.find(Textfield).length, 1);
    assert.equal(tree.find(Textfield).prop('autocompleteInput'), true);
    assert.equal(tree.find(Button).length, 1);
    assert.equal(tree.find(Button).childAt(0).prop('icon'), 'chevronDown');
  });

  it('should render classnames for states', () => {
    const tree = shallow(<ComboBox quiet disabled invalid />);
    assert.equal(tree.prop('className'), 'coral-ComboBox coral-InputGroup coral-DecoratedTextfield coral-InputGroup--quiet is-disabled is-invalid');
  });

  it('should support rendering an icon', () => {
    const tree = shallow(<ComboBox icon="filter" />);
    assert.equal(tree.find('.coral-DecoratedTextfield-icon').length, 1);
  });

  it('should get completions from options', () => {
    const tree = shallow(<ComboBox options={['one', 'two', 'three']} />);
    assert.deepEqual(tree.prop('getCompletions')('t'), ['two', 'three']);
    assert.deepEqual(tree.prop('getCompletions')('T'), ['two', 'three']);
    assert.deepEqual(tree.prop('getCompletions')('tw'), ['two']);
  });
});
