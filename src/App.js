import React from 'react';
import './App.css';
import SettingsDisplay from './components/SettingsDisplay/SettingsDisplay';
import TimerWork from './components/Timer/TimerWork';


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      timerMinute: 25,
      sessionTime: 25,
      shortBreak: 5,
      longBreak: 15,
      timeBetween: 4,
      isPlay: false,
      background: ''
    }

  }

  changeBackground = () => {
    this.setState({
      background: 'linear-gradient(180deg, #48C6EF 0%, #6F86D6 100%);'
    })
  }

  playingTimer = () => {
    this.setState({
      isPlay: true
    })
  }

  notChangeParentComponent = () => {
    this.setState({
      timerMinute: 25,
      sessionTime: 25,
      shortBreak: 5,
      longBreak: 15,
      timeBetween: 4
    })
  }

  toggleIntervals = (isSession) => {
    if(isSession) {
      this.setState({
        timerMinute: this.state.sessionTime 
      })
    } else {
      this.setState({
        timerMinute: this.state.shortBreak
      })
    }

  }

  resetSession = () => {
    this.setState({
      timerMinute: this.state.shortBreak
    })
  }

  updateTimerMinute = () => {
    if(this.state.timerMinute === 0) {
      return
    }
    this.setState((prevState) => {
      return {
        timerMinute: prevState.timerMinute - 1
      }
    })
  }

  setTimerMinute = (session) => {
    this.setState({
      timerMinute: session,
      sessionTime: session
    })
  }

  setShortBreakTime = (shortBreak) => {
    this.setState({
      shortBreak: shortBreak
    })
  }

  setLongBreakTime = (longBreak) => {
    this.setState({
      longBreak: longBreak
    })
  }

  setNumberBetween = (number) => {
    this.setState({
      timeBetween: number
    })
  }

  render() {
    const style={background: this.state.background}
    return (
      <div className='wrapper' style={style}>
  
        <SettingsDisplay state={this.state} 
        setTimerMinute={this.setTimerMinute}
        setShortBreakTime={this.setShortBreakTime}
        setLongBreakTime={this.setLongBreakTime}
        setNumberBetween={this.setNumberBetween}
        notChangeParentComponent={this.notChangeParentComponent}
        updateTimerMinute={this.updateTimerMinute}
        toggleIntervals={this.toggleIntervals}
        playingTimer={this.playingTimer}
        changeBackground={this.changeBackground}  />

        <TimerWork state={this.state}
        updateTimerMinute={this.updateTimerMinute}
        resetSession={this.resetSession}
        toggleIntervals={this.toggleIntervals}
        playingTimer={this.playingTimer}
        changeBackground={this.changeBackground}
        notChangeParentComponent={this.notChangeParentComponent}  />
        
      </div>
    );
  }
}

export default App;
