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
      timeBetween: 4
    }

    this.updateTimerMinute = this.updateTimerMinute.bind(this);
    this.setTimerMinute = this.setTimerMinute.bind(this);
    this.setShortBreakTime = this.setShortBreakTime.bind(this);
    this.setLongBreakTime = this.setLongBreakTime.bind(this);
    this.setNumberBetween =this.setNumberBetween.bind(this);
    this.toggleIntervals = this.toggleIntervals.bind(this);
    this.resetSession = this.resetSession.bind(this);
    this.notChangeParentComponent = this.notChangeParentComponent.bind(this);
  }

  notChangeParentComponent() {
    this.setState({
      timerMinute: 25,
      sessionTime: 25,
      shortBreak: 5,
      longBreak: 15,
      timeBetween: 4
    })
  }

  toggleIntervals(isSession) {
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

  resetSession() {
    this.setState({
      timerMinute: this.state.shortBreak
    })
  }

  updateTimerMinute() {
    if(this.state.timerMinute === 0) {
      return
    }
    this.setState((prevState) => {
      return {
        timerMinute: prevState.timerMinute - 1
      }
    })
  }

  setTimerMinute(session) {
    this.setState({
      timerMinute: session,
      sessionTime: session
    })
  }

  setShortBreakTime(shortBreak) {
    this.setState({
      shortBreak: shortBreak
    })
  }

  setLongBreakTime(longBreak) {
    this.setState({
      longBreak: longBreak
    })
  }

  setNumberBetween(number) {
    this.setState({
      timeBetween: number
    })
  }

  render() {
    return (
      <div className='wrapper'>
  
        <SettingsDisplay state={this.state} 
        setTimerMinute={this.setTimerMinute}
        setShortBreakTime={this.setShortBreakTime}
        setLongBreakTime={this.setLongBreakTime}
        setNumberBetween={this.setNumberBetween}
        notChangeParentComponent={this.notChangeParentComponent}  />

        <TimerWork state={this.state}
        updateTimerMinute={this.updateTimerMinute}
        resetSession={this.resetSession}
        toggleIntervals={this.toggleIntervals}  />
        
      </div>
    );
  }
}

export default App;
