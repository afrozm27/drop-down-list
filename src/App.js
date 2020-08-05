import React, { Component } from 'react'
import './App.css';
import 'react-dropdown/style.css';
import CreatableSelect from 'react-select/creatable';
import countries from '../src/utils/country.json';

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }

  state = {
    isClearable: true,
    isDisabled: false,
    isLoading: false,
    isSearchable: true,
    selectedOption: null,
    countriesList: []
  };



  componentWillMount() {
    this.setState({ countriesList: countries });
  }

  handleChange = (newValue: any, actionMeta: any) => {
    debugger;
    let updateJson = {};
    if (newValue && newValue.__isNew__) {
      updateJson = {
        label: newValue.label,
        value: newValue.value
      }
    }
    let updatedCountriesList = this.state.countriesList;
    if (updateJson && Object.keys(updateJson).length) {
      updatedCountriesList.push(updateJson);
      this.setState({ countriesList: updatedCountriesList });
    }
    console.group('Value Changed');
    console.log(newValue);
  };
  handleInputChange = (inputValue: any, actionMeta: any) => {
    console.group('Input Changed');
    console.log(inputValue);
  };

  noOptionSelect = selectedOption => {
    return (
      <button onClick={this.handleChange}>Add and select</button>
    );
  }

  colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'beige' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      console.log('stls', styles);
      console.log('idisabled', isDisabled);
      console.log('isselcted', isSelected);
      console.log('isfocused', isFocused);
      data.color = 'black'
      return {
        ...styles,
        backgroundColor: isDisabled
          ? 'black'
          : isSelected
            ? data.color
            : isFocused
              ? 'white'
              : null,
        color: isDisabled
          ? '#8992a2'
          : isSelected
            ? 'black'
              ? 'beige'
              : 'black'
            : data.color,
        cursor: isDisabled ? 'not-allowed' : 'default',

        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled && (isSelected ? data.color : 'black'),
        },
      };
    },

  };


  render() {

    return (
      <div className="App">
        <header className="App-header">
          <div style={{ width: '40%' }} className="dropdownStyle">

            <CreatableSelect
              isClearable
              onChange={this.handleChange}
              onInputChange={this.handleInputChange}
              options={this.state.countriesList}
              placeholder="Select a location"
              styles={this.colourStyles}
            />

          </div>

        </header>
      </div >

    );
  };

}


export default App;
