import React, { createRef } from 'react';
import s from './TimerWork.module.css';

class TimerWork extends React.Component {
  
    constructor() {
      super();

      this.state = {
        isSession: true,
        timerSecond: 0,
        intervalId: 0,
        progressId: 0,
        pausingDisplay: '',
        startingDisplay: '',
        continueDisplay: '',
        stopDisplay: '',
        stroke: '',
        strokeWidth: 0,
        cx: 0,
        cy: 0,
        r: '145',
        fill: 'transparent',
        circumference: 0,
        strokeDasharray: 0,
        strokeDashoffset: 0,
        transformOrigin: '',
        transform: '',
        count: 0
      }

      this.svgRef = React.createRef();

    }

    componentDidMount() {
  
      this.setState({
        circumference: 2 * Math.PI * this.svgRef.current.r.baseVal.value,
        strokeDasharray: `${2 * Math.PI * this.svgRef.current.r.baseVal.value} ${2 * Math.PI * this.svgRef.current.r.baseVal.value} `,
        strokeDashoffset: 2 * Math.PI * this.svgRef.current.r.baseVal.value,
      })
    }

    setProgress = (percent) => {
      const offset = this.state.circumference - percent / 100 * this.state.circumference;
      this.setState({
        strokeDashoffset: offset,
        transformOrigin: 'center',
        stroke: '#ffffff',
        strokeWidth: '8',
        cx: '175',
        cy: '175',
        transform: "rotate(-90deg)"
      })
    }

    counter = () => {

      if(this.props.state.timerMinute > 0 && this.state.timerSecond < 60) {
        this.setState((prevState) => {
          return {
            count: prevState.count + (100 / (60 * (this.props.state.timerMinute + 1)) )
          }
        })
      } 
      if(this.props.state.timerMinute === 0 && this.state.timerSecond < 60) {
        this.setState((prevState) => {
          return {
            count: prevState.count + ((100 / 60) / 2)
          }
        })
      }
    }

    startingTimer = () => {
      
      let intervalId = setInterval(this.decreaseTimer, 1000)
      
      this.setState({
        intervalId: intervalId,
        startingDisplay: 'none',
        pausingDisplay: 'block'
      })
      this.counter()
    }

    continueTimer = () => {
      let intervalId = setInterval(this.decreaseTimer, 1000)

      this.setState({
        intervalId: intervalId,
        startingDisplay: 'none',
        pausingDisplay: 'block',
        continueDisplay: 'none',
        stopDisplay: 'none'
      })
    }

    stopTimer = () => {
      clearInterval(this.state.intervalId)
      this.props.notChangeParentComponent();
      this.setState({
        timerSecond: 0,
        startingDisplay: 'block',
        pausingDisplay: 'none',
        continueDisplay: 'none',
        stopDisplay: 'none'
      })
      
    }

    pausingTimer = ()  => {
      this.setState({
        pausingDisplay: 'none',
        continueDisplay: 'block',
        stopDisplay: 'block'
      })
      clearInterval(this.state.intervalId)
    }

    decreaseTimer = () => {
      console.log(this.state.count)
      this.counter()
      this.setProgress(this.state.count)
      switch(this.state.timerSecond) { 
        
        case 0:

          if(this.props.state.timerMinute === 0) {
            if(this.state.isSession) {
              this.setState({
                isSession: false
              })

              this.props.toggleIntervals(this.state.isSession)
            }  else {
              this.setState({
                isSession: true
              })

              this.props.toggleIntervals(this.state.isSession)
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
      return (
          <div>

        <div className={s.wrap}>

          <div className={s.allWrapper}>

          <svg className={s.progressRing} style={{width: '350px', height: '350px'}}>
            <circle id="ring" ref={this.svgRef} className={s.progressRingCircle}
            stroke={this.state.stroke} strokeWidth={this.state.strokeWidth}
            cx={this.state.cx} cy={this.state.cy} r={this.state.r} fill={this.state.fill} 
              style={{
              strokeDasharray: this.state.strokeDasharray,
              strokeDashoffset: this.state.strokeDashoffset,
              transformOrigin: this.state.transformOrigin,
              transform: this.state.transform,
              transition: 'strokeDashoffset 0.3s'
            }} />
      </svg>

          <div className={s.timeWrapper}><span>{this.props.state.timerMinute < 10 
          ? '0' + this.props.state.timerMinute : this.props.state.timerMinute }</span>
          <span>:</span>
          <span>{this.state.timerSecond === 0 ? '00' 
          : this.state.timerSecond < 10
          ? '0' + this.state.timerSecond 
          : this.state.timerSecond}</span>
          </div>
          <div className={s.buttonsWrapper}>
          <div onClick={this.startingTimer} className={s.buttons} 
          style={{display: this.state.startingDisplay}}><div className={s.buttonsInside}>Start</div></div>
          <div onClick={this.pausingTimer} className={s.buttonsSecond } 
          style={{display: this.state.pausingDisplay}}><div className={s.buttonsInside}>Pause</div></div>
          <div onClick={this.continueTimer} className={s.continue} 
          style={{display: this.state.continueDisplay}}><div className={s.buttonsInside}>Continue</div></div>
          <div onClick={this.stopTimer} className={s.buttonsThird} 
          style={{display: this.state.stopDisplay}}><div className={s.buttonsInside}>Stop</div></div>
          </div>
          
        </div>
        </div>
          </div>
      )
    }
  
}

export default TimerWork;