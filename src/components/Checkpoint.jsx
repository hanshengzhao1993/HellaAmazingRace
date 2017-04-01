import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
// import CameraIcon from '../static/img/camera-icon.png'


// const camera = <FontIcon className="materials-icons">camera_enhance</FontIcon>
/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
export default class Checkpoint extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
    
  }

  handleClick() {
    console.log('clickn');
    var uploader = $('#fileUploader')
    
    uploader.trigger('click');  

  }

  render() {
    return (
      <div id="checkPointContainer">
        <div id="checkPointTask"> 
           <h1> Task </h1>
           <h4> Beat Jason at Connect </h4>
        </div>
        <div id="space"> 
        </div>
        <input id="fileUploader" type="file" src="img/camera-icon.png" />
        <div className="camera-iconBox">
          <img  className="img-rounded camera-iconBox" src="img/camera-icon.png" onClick={this.handleClick}/>
        </div>
      </div>
    )
  }
}
