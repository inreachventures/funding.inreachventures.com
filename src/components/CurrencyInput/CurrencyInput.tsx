import React from 'react';
import {Picker, StyleSheet, TextInput, View} from 'react-native';

import {Currency} from '../../lib/currency';
import {colors} from '../../lib/theme';

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row'
  },
  picker: {
    padding: 8,
    marginRight: 4
  },
  pickerItem: {
    fontSize: 16
  },
  input: {
    borderColor: colors.greenMuted,
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 16,
    padding: 8,
    outline: 'none'
  } as object
});

function formatNumber(value?: string) {
  if (value) {
    return parseInt(value, 10).toLocaleString();
  }

  return value;
}

type State = {
  hasFocus: boolean;
};

type Props = {
  currency: Currency;
  editable: boolean;
  onChange(value: string): void;
  onChangeCurrency(currency: string): void;
  placeholder: string;
  value: string;
};

export default class CurrencyInput extends React.Component<Props, State> {
  state: State = {
    hasFocus: false
  };

  handleFocus = () => {
    this.setState({hasFocus: true});
  };

  handleBlur = () => {
    this.setState({hasFocus: false});
  };

  render() {
    const {
      currency,
      editable,
      onChange,
      onChangeCurrency,
      placeholder,
      value
    } = this.props;
    const {hasFocus} = this.state;

    const formatted = formatNumber(value);

    return (
      <View style={styles.view}>
        <Picker
          selectedValue={currency}
          onValueChange={onChangeCurrency}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item value="EUR" label="€" />
          <Picker.Item value="GBP" label="£" />
          <Picker.Item value="USD" label="$" />
        </Picker>

        <TextInput
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          editable={editable}
          placeholder={formatNumber(placeholder)}
          value={hasFocus ? value : formatted}
          style={styles.input}
          onChangeText={onChange}
          keyboardType={hasFocus ? 'numeric' : undefined}
        />
      </View>
    );
  }
}
