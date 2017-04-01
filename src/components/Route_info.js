// import React, {Component} from 'react';
// import FontIcon from 'material-ui/FontIcon';
// import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
 /*
export default class Checkpoint extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
    
  }

  changeRoute(route) {

  }

  render() {
    return (
      <div id='RouteInfoContainer'>
        <div id="RouteInfoBlock">
          stufffasdfas
          fdasf
        </div>
        <div id="RouteInfoBlock">
          dasf
          asdfas
        </div>
        <div id="RouteInfoBlock">
          asdfdsaf
          dasf
          asdfas
        </div>

      <div id="RouteInfoBlock">
          asdfdsaf
          dasf
          asdfas
        </div>
     
      </div>
    )
  }
}

*/

import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Reply</MenuItem>
    <MenuItem>Forward</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);

const ListExampleMessages = () => (
  <div style={{'backgroundColor': 'transparent', background: 'linear-gradient(#FF5F6D , #FFC371)'}}>
      <List>
        <Subheader>Today</Subheader>
        <ListItem
          rightIconButton={rightIconMenu}
          primaryText="Brendan Lim"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Brunch this weekend?</span><br />
              I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
            </p>
          }
          secondaryTextLines={2}
        />
        <Divider inset={true} />
        <ListItem
          rightIconButton={rightIconMenu}
          primaryText="me, Scott, Jennifer"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Summer BBQ</span><br />
              Wish I could come, but I&apos;m out of town this weekend.
            </p>
          }
          secondaryTextLines={2}
        />
        <Divider inset={true} />
        <ListItem
          rightIconButton={rightIconMenu}
          primaryText="Grace Ng"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Oui oui</span><br />
              Do you have any Paris recs? Have you ever been?
            </p>
          }
          secondaryTextLines={2}
        />
        <Divider inset={true} />
        <ListItem
          rightIconButton={rightIconMenu}
          primaryText="Kerem Suer"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Birthday gift</span><br />
              Do you have any ideas what we can get Heidi for her birthday? How about a pony?
            </p>
          }
          secondaryTextLines={2}
        />
        <Divider inset={true} />
        <ListItem
          rightIconButton={rightIconMenu}
          primaryText="Raquel Parrado"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Recipe to try</span><br />
              We should eat this: grated squash. Corn and tomatillo tacos.
            </p>
          }
          secondaryTextLines={2}
        />
      </List>
  </div>
);

export default ListExampleMessages;