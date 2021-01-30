import React from 'react';
import s from './SettingsDisplay.module.css';
import favicon from './../../common/icons/settings-2.svg';

class SettingsDisplay extends React.Component  {
    constructor() {
      super();

      this.state = {
        display: ''
      }

      this.changeSessionTime = this.changeSessionTime.bind(this);
      this.changeShortBreakTime = this.changeShortBreakTime.bind(this); 
      this.changeLongBteakTime = this.changeLongBteakTime.bind(this);
      this.changeNumberBetween = this.changeNumberBetween.bind(this);
      this.closePopupAndSave = this.closePopupAndSave.bind(this);
      this.closePopup = this.closePopup.bind(this);
      this.showSettings = this.showSettings.bind(this);
    }

    changeSessionTime(e) {
      
      let session = e.target.value;
      if(session <= 60) {
        this.props.setTimerMinute(session);
      }
      
    }

    changeShortBreakTime(e) {
      let shortBreak = e.target.value;
      this.props.setShortBreakTime(shortBreak)
    }

    changeLongBteakTime(e) {
      let longBreak = e.target.value;
      this.props.setLongBreakTime(longBreak)
    }

    changeNumberBetween(e) {
      this.props.setNumberBetween(e.target.value)
    }

    closePopupAndSave() {
      this.setState({
        display: 'none'
      })
    }

    closePopup() {
      this.setState({
        display: 'none'
      })
      this.props.notChangeParentComponent();
    }
  
    showSettings() {
      this.setState({
        display: 'block'
      })
    }

    render() {

      const style = {display: this.state.display}
      
      return (

        <div>

          <div onClick={this.showSettings} className={s.faviconImage}>
            <img src={favicon} />
          </div>

        <div className={s.displayWrapper}>

          <div className={s.settingsWrap} style={style}>
  
          <div className={s.pomodoro}><span>Pomodoro</span></div>
          <input onChange={this.changeSessionTime} value={this.props.state.timerMinute} />
  
          <div className={s.short}><span>Short Break</span></div>
          <input onChange={this.changeShortBreakTime} value={this.props.state.shortBreak} />
  
          <div className={s.long}><span>Long Break</span></div>
          <input onChange={this.changeLongBteakTime} value={this.props.state.longBreak} />
  
          <div className={s.number}><span>Number of pomodoro between break</span></div>
          <input onChange={this.changeNumberBetween} value={this.props.state.timeBetween} />
  
          <div className={s.buttonsWrapper}>
  
          <div onClick={this.closePopup} className={s.buttons}><div className={s.buttonsInside}>Close</div></div>
          <div onClick={this.closePopupAndSave} className={s.buttons}><div className={s.buttonsInside}>Save</div></div>
          
          </div>
          </div>
          
        </div>
        </div>
      )
    }
  
}

export default SettingsDisplay;