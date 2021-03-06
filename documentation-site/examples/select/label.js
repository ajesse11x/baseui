// @flow
import * as React from 'react';
import {Block} from 'baseui/block';
import {Select} from 'baseui/select';
import type {ValueT} from 'baseui/select';

export default class Container extends React.Component<
  {},
  {value: ValueT},
> {
  state = {value: []};
  getLabel = ({option}: any) => {
    return (
      <React.Fragment>
        <Block
          width="scale300"
          height="scale300"
          marginRight="scale200"
          display="inline-block"
          backgroundColor={option.color}
          overrides={{
            Block: {
              style: ({$theme}) => ({
                verticalAlign: 'baseline',
                ...$theme.borders.border400,
              }),
            },
          }}
        />
        {option.id}
      </React.Fragment>
    );
  };
  render() {
    return (
      <Select
        options={[
          {id: 'AliceBlue', color: '#F0F8FF'},
          {id: 'AntiqueWhite', color: '#FAEBD7'},
          {id: 'Aqua', color: '#00FFFF'},
          {id: 'Aquamarine', color: '#7FFFD4'},
          {id: 'Azure', color: '#F0FFFF'},
          {id: 'Beige', color: '#F5F5DC'},
        ]}
        labelKey="id"
        valueKey="color"
        onChange={({value}) => this.setState({value})}
        value={this.state.value}
        getOptionLabel={this.getLabel}
        getValueLabel={this.getLabel}
      />
    );
  }
}
