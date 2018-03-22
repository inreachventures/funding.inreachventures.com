import React from 'react';
import {Dimensions, StyleSheet, TextInput, Picker, Switch} from 'react-native';
import {propOr} from 'ramda';

import {Field} from '../../lib/field';
import {Path} from '../../lib/path';
import {colors} from '../../lib/theme';

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    padding: 8,
    borderColor: colors.greenMuted,
    borderWidth: 1,
    borderRadius: 4,
    outline: 'none'
  },
  number: {
    width: '25%'
  },
  short: {
    width: '30%'
  },
  med: {
    width: '50%'
  },
  fullWidth: {
    width: '100%'
  }
});

type Props = {
  editable?: boolean;
  onChange(path: Path, value: string): void;
  field: Field;
  path: Path;
  value?: string;
};

function widthStyle(style: 'short' | 'med' | 'long') {
  return [style === 'short' ? styles.short : style === 'med' ? styles.med : {}];
}

export default class QuestionInput extends React.Component<Props> {
  handleChange = (value: string) => {
    this.props.onChange([...this.props.path, 'value'], value);
  };

  handleSwitch = (value: boolean) => {
    this.handleChange(value.toString());
  };

  render() {
    const {width} = Dimensions.get('window');

    const {editable = true, field} = this.props;

    if (field.type === 'compound' || field.type === 'multiple') {
      return null;
    }

    const value: string = propOr(field.defaultValue, 'value', field);

    if (field.type === 'short-text') {
      return (
        <TextInput
          editable={editable}
          value={value}
          style={[
            styles.input,
            width > 480 ? widthStyle(field.style) : styles.fullWidth
          ]}
          onChangeText={this.handleChange}
          placeholder={field.placeholder}
        />
      );
    }

    if (field.type === 'long-text') {
      return (
        <TextInput
          editable={editable}
          value={field.value}
          style={styles.input}
          onChangeText={this.handleChange}
          placeholder={field.placeholder}
          multiline={true}
          numberOfLines={field.lines}
        />
      );
    }

    if (field.type === 'email-address') {
      return (
        <TextInput
          editable={editable}
          value={field.value}
          style={styles.input}
          onChangeText={this.handleChange}
          placeholder={field.placeholder}
          keyboardType="email-address"
        />
      );
    }

    if (field.type === 'uri') {
      return (
        <TextInput
          editable={editable}
          value={field.value}
          style={styles.input}
          onChangeText={this.handleChange}
          placeholder={field.placeholder}
          keyboardType="url"
        />
      );
    }

    if (field.type === 'date') {
      return (
        <TextInput
          editable={editable}
          value={field.value}
          style={styles.input}
          onChangeText={this.handleChange}
          placeholder={field.placeholder}
          keyboardType="default"
        />
      );
    }

    if (field.type === 'number') {
      return (
        <TextInput
          editable={editable}
          value={field.value}
          style={[styles.input, styles.number]}
          onChangeText={this.handleChange}
          keyboardType="numeric"
        />
      );
    }

    if (field.type === 'picker') {
      return (
        <Picker
          style={[width > 480 ? widthStyle(field.style) : styles.fullWidth]}
          selectedValue={value}
          onValueChange={this.handleChange}
        >
          {field.items.map(({label, value}) => (
            <Picker.Item key={value} label={label} value={value} />
          ))}
        </Picker>
      );
    }

    if (field.type === 'toggle') {
      const props = {
        onTintColor: colors.greenLightMuted,
        tintColor: colors.greenLightMuted,
        thumbTintColor: colors.greenLightMuted,
        activeThumbColor: colors.green
      };

      return (
        <Switch
          onValueChange={this.handleSwitch}
          value={value === 'true'}
          {...props}
        />
      );
    }

    return null; // Unknown or invalid input type
  }
}
