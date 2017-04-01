import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import FontIcon from 'material-ui/FontIcon';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';




const person = <FontIcon color='#8B8C8D' className="material-icons">face</FontIcon>
export default class Users extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleTouchTap(event) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
    console.log('touchedtap button');
  };

  handleClick(event) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
    console.log('clicked button');
  };



  handleRequestClose() {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div id={this.props.id}>
        <RaisedButton
          onClick={this.handleClick.bind(this)}
          label="Racers"
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose.bind(this)}
        >
          <Menu>
            <MenuItem primaryText="Han" rightIcon={person} />

            <MenuItem primaryText="Edwin" rightIcon={person}/>
            <MenuItem primaryText="Jason" rightIcon={person} />
            <MenuItem primaryText="Mike" rightIcon={person}/>
          </Menu>
        </Popover>
      </div>
    );
  }
}