import React from 'react';
import s from './TimerWork.module.css';

class TimerWork extends React.Component {
  
    constructor() {
      super();

      this.state = {
        isSession: true,
        timerSecond: 0,
        intervalId: 0,
        display: ''
      }
    this.startingTimer = this.startingTimer.bind(this);
    this.pausingTimer = this.pausingTimer.bind(this);
    this.decreaseTimer = this.decreaseTimer.bind(this);
    this.hideButtons = this.hideButtons.bind(this);
    this.showButtons = this.showButtons.bind(this);
    }

    startingTimer() {

      let intervalId = setInterval(this.decreaseTimer, 1000)
      
      this.setState({
        intervalId: intervalId
      })

      
    }

    pausingTimer() {
      clearInterval(this.state.intervalId)
    }

    hideButtons() {
      if(this.state.display === 'block') {
        this.setState({
          display: 'none'
        })
      } else {
        this.setState({
          display: 'block'
        })
      }
    }

    showButtons() {
      this.setState({
        display: 'block'
      })
    }

    decreaseTimer() {
      
      switch(this.state.timerSecond) {
        case 0:
          if(this.props.state.timerMinute === 0) {
            if(this.state.isSession) {
              this.setState({
                isSession: false
              })
              for(let i = 0; i < this.props.state.timeBetween; i++) {
                this.props.toggleIntervals(this.state.isSession)
              }
              
            }  else {
              this.setState({
                isSession: true
              })
              for(let i = 0; i < this.props.state.timeBetween; i++) {
                this.props.toggleIntervals(this.state.isSession)
              }
              this.pausingTimer();
            } 
            
          }
          this.props.updateTimerMinute();
          this.setState({
            timerSecond: 59
          })
          
          break;
        default:
          this.setState((prevState) => {
            return {
              timerSecond: prevState.timerSecond - 1
            }
          })
          
          break;
      }
      
    }

    render() {
      const style = {display: this.state.display}
      return (
        <div className={s.allWrapper}>
          <div className={s.timeWrapper}><span>{this.props.state.timerMinute < 10 
          ? '0' + this.props.state.timerMinute : this.props.state.timerMinute }</span>
          <span>:</span>
          <span>{this.state.timerSecond === 0 ? '00' 
          : this.state.timerSecond < 10
          ? '0' + this.state.timerSecond 
          : this.state.timerSecond}</span>
          </div>
          <div className={s.buttonsWrapper}>
          <div onClick={this.startingTimer} className={s.buttons} style={style}><div className={s.buttonsInside}>Start</div></div>
          <div onClick={this.pausingTimer} className={s.buttonsSecond } style={style} ><div className={s.buttonsInside}>Pause</div></div>
          <div className={s.buttonsThird} style={style}><div className={s.buttonsInside}>Continue</div></div>
          <div className={s.buttonsFourth}><div className={s.buttonsInside}>Stop</div></div>
          </div>
          
        </div>
      )
    }
  
}

export default TimerWork;