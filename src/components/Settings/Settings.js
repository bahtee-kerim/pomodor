import React from 'react';
import settings from './../../common/icons/settings-2.svg';
import s from './Settings.module.css';

class Settings extends React.Component {
  constructor() {
    super();

    this.showPopupSecond = this.showPopupSecond.bind(this);
  }

  showPopupSecond() {
    this.props.showPopup();
  }

  render() {
    
    return (
      <div  className={s.image} onClick={this.showPopupSecond}>
        <img src={settings} />
      </div>
    )
  }
}

export default Settings;