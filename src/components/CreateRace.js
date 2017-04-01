'use strict';

import React from 'react';
import RaceMap from './Map';
import Autocomplete from './Autocomplete';

export default class CreateRace extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      start: null,
      finish: null,
      checkpoints: [],
      searchData: null
    };
  }

  addMapData(e) {
    let value = e.target.value;
    let searchData = this.state.searchData;
    if (value === 'start') {
      this.setState({
        start: searchData
      });
    } else if (value === 'finish') {
      this.setState({
        finish: searchData
      });
    } else {
      var updatedCheckpoints = this.state.checkpoints.slice();
      updatedCheckpoints.push(searchData);
      this.setState({
        checkpoints: updatedCheckpoints
      });
    }
  }

  saveRace() {
    $.post('/SaveRace', this.state, (response) => {
      if (response === 'Race name already exists') {
        alert('Race name already exists, please rename.');
      }
    });
  }

  getDataOnSearch(locationData) {
    let formattedLocationData = {
      Place: locationData.label,
      Latitude: locationData.location.lat,
      Longitude: locationData.location.lng
    };
    this.setState({
      searchData: JSON.stringify(formattedLocationData)
    });
  }

  updateTitle(e) {
    let title = e.target.value;
    this.setState({
      title: title
    });
  }

  render() {

    const mapStyle = {
      width: '600px',
      height: '400px',
    };

    return (
      <div>

        <h1 className="text-center"> Create a Race</h1>
          <RaceMap />
        <Autocomplete
          getDataOnSearch={this.getDataOnSearch.bind(this)} 
        />

        <div className="text-center">
          <button type="button" className="btn btn-primary" value="start" onClick={this.addMapData.bind(this)}>Set Start</button>
          <button type="button" className="btn btn-primary"value="checkpoints" onClick={this.addMapData.bind(this)}>Set Checkpoint</button>
          <button type="button" className="btn btn-primary" value="finish" onClick={this.addMapData.bind(this)}>Set Finish</button>
        </div>
        <div className="text-center">
          <button type="button" className="btn btn-primary" onClick={this.saveRace.bind(this)}>Save Race</button>
        </div>

        <div className="text-center">
          <form>
          Race Title: 
            <input type="text" value={this.state.title} onChange={this.updateTitle.bind(this)} />
          </form>
          <div> Start: {this.state.start} <br/>
                Checkpoints {this.state.checkpoints} <br/>
                Finish: {this.state.finish} <br/>
                Current Search: {this.state.searchData}
          </div>
        </div>
      </div>
    );
  }
}
