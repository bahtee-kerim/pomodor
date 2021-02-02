import React, { createRef } from 'react';
import s from './TimerWork.module.css';

class TimerWork extends React.Component {
  
    constructor() {
      super();

      this.state = {
        isSession: true,
        timerSecond: 0,
        intervalId: 0,
        display: '',
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
        count: 25
      }

      this.svgRef = React.createRef();

    }

    componentDidMount() {
  
      this.setState({
        circumference: 2 * Math.PI * this.svgRef.current.r.baseVal.value,
        strokeDasharray: `${2 * Math.PI * this.svgRef.current.r.baseVal.value} ${2 * Math.PI * this.svgRef.current.r.baseVal.value}`,
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
      this.setState((prevState) => {
        return {
          count: prevState.count + 25
        }
      })
    }



    startingTimer = () => {

      this.props.playingTimer()
      

      let intervalId = setInterval(this.decreaseTimer, 1000)
      
      this.setState({
        intervalId: intervalId
      })

      this.hideButtons();
      this.pausingTimer();
      this.setProgress(this.state.count)
    }

    pausingTimer = ()  => {
      clearInterval(this.state.intervalId)
    }

    hideButtons = () => {
      this.setState({
        display: 'block'
      })
    }

    showButtons = () => {
      this.setState({
        display: 'block'
      })
    }

    decreaseTimer = () => {
      
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
      let style = {display: this.state.display}
      return (
        <div className={s.wrap}>
          <div className={s.allWrapper}>

          <svg className={s.progressRing} style={{width: '350px', height: '350px'}}>
            <circle id="ring" ref={this.svgRef} className={s.progressRingCircle} stroke={this.state.stroke} strokeWidth={this.state.strokeWidth}
            cx={this.state.cx} cy={this.state.cy} r={this.state.r} fill={this.state.fill} 
              style={{
              strokeDasharray: this.state.strokeDasharray,
              strokeDashoffset: this.state.strokeDashoffset,
              transformOrigin: this.state.transformOrigin,
              transform: this.state.transform
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
          <div onClick={this.startingTimer} className={s.buttons} style={style}><div className={s.buttonsInside}>
            {this.props.state.isPlay? 'Continue' : 'Start'}</div></div>
          <div onClick={this.pausingTimer} className={s.buttonsSecond } style={style} ><div className={s.buttonsInside}>Pause</div></div>
          <div className={s.buttonsThird}><div className={s.buttonsInside}>Stop</div></div>
          </div>
          
        </div>
        </div>
      )
    }
  
}

export default TimerWork;