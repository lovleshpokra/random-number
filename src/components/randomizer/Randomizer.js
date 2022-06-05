import React, { PureComponent } from 'react';
import { randomizer } from './../../shared/utils';

let runningTimer = null;
export default class Wrapper extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      liveNumber: '',
      timer: '',
      startTime: Date.now(),
      randomNumberList: new Set(),
      retryCount: 0,
      isError: false
    }
    this.updateNumber = this.updateNumber.bind(this);
    this.runningForTime = this.runningForTime.bind(this);
    this.addItemToSet = this.addItemToSet.bind(this);
  }

  addItemToSet (item) {
    this.setState(({ randomNumberList }) => ({
      randomNumberList: new Set(randomNumberList).add(item)
    }));
  }

  updateNumber () {
    const randomNumber = randomizer(1, 15000);
    if (!this.state.randomNumberList.has(randomNumber)) {
      this.addItemToSet(randomNumber);
      if (this.state.retryCount) {
        this.setState({ liveNumber: randomNumber, retryCount: 0 });
      } else {
        this.setState({ liveNumber: randomNumber });
      }
    } else if (this.state.retryCount < 3) {
      this.setState({ retryCount: this.state.retryCount + 1 });
      this.updateNumber();
    } else {
      this.setState({ isError: true, timer: '0.000' });
      clearInterval(runningTimer);
    }
  }
  ;
  runningForTime () {
    const elapsedTime = Date.now() - this.state.startTime;
    const remainingTime = (elapsedTime / 1000).toFixed(3);
    if (Number(remainingTime) > 1.999) {
      this.setState({ startTime: Date.now(), timer: remainingTime });
      this.updateNumber();
    } else {
      this.setState({ timer: remainingTime });
    }
  }
  ;
  componentDidMount () {
    this.updateNumber();
    runningTimer = setInterval(this.runningForTime, 100);
  }

  componentWillUnmount () {
    clearInterval(runningTimer);
  }

  render () {
    return (
      <section className="app-content">
        <div className="randomizer-wrapper">
          <div className="centered-content">
            {this.state.isError && <div className="error">Maximum retry attempt exceeded!!!</div>}
            <div className="random-number">
              {this.state.liveNumber}
            </div>
            <div className="timer">
              {this.state.timer}
            </div>
            {Number(this.state.timer) < 2 && <div className="radial">
              <div className="circle left rotate"><span></span></div>
              <div className="circle right rotate"><span></span></div>
            </div>}
          </div>
        </div>
      </section>
    );
  }
}
