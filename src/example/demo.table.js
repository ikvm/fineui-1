import React, {Component} from 'react';
import {MyTable} from '../components/Table';
import {AbsoluteLayout} from '../layout';

const LEFT_HEAD_NUM = 2;
const RIGHT_HEAD_NUM = 6;
const BOTTOM_BODY_NUM = 11;
const SCROLL_BAR_BOTTOM_LENGTH = 580;
const SCROLL_BAR_RIGHT_LENGTH = 420;
const LEFT_COLUMN = 2;
const RIGHT_COLUMN = 20;
const BODY_ROW = 50;

let leftHeadArray = [];
let rightHeadArray = [];
let leftBodyArray = [];
let rightBodyArray = [];
let mapIndexBottom;
let mapIndexRight;

class App extends Component{

    constructor(props, context) {
        super(props, context);
        this.state = {
            left: 0,
            top: 0,
            Xdown: false,
            Ydown: false,
        };
    }

    _handleScrollChangeX = (dx) => {
        this.setState((preState) => ({
            left: (dx > 0) ? (dx < SCROLL_BAR_BOTTOM_LENGTH ? dx : SCROLL_BAR_BOTTOM_LENGTH) : 0,
        }));
    }

    _handleScrollChangeY = (dy) => {
        this.setState((preState) => ({
            top: (dy > 0) ? (dy < SCROLL_BAR_RIGHT_LENGTH ? dy : SCROLL_BAR_RIGHT_LENGTH) : 0,
        }));
    }

    _handleWheelY = (dy) => {
        let newY = this.state.top + dy * 0.2;
        this.setState((preState) => ({
            top: (newY > 0) ? (newY < SCROLL_BAR_RIGHT_LENGTH ? newY : SCROLL_BAR_RIGHT_LENGTH) : 0,
        }));
    }

    _handleMouseDownX = () => {
        this.setState({
            Xdown: true,
        });
    }

    _handleMouseDownY = () => {
        this.setState({
            Ydown: true,
        });
    }

    _handleMouseMove = (e) => {
        let x = e.pageX;
        let y = e.pageY;
        let dy = y - 72;
        let dx = x - 232;
        if (this.state.Xdown)
            this._handleScrollChangeX(dx);
        if (this.state.Ydown)
            this._handleScrollChangeY(dy);
    }

    _handleMouseUp = (e) => {
        this.setState({
            Xdown: false,
            Ydown: false,
        });
    }

    componentWillMount() {
        for (let j = 0; j < BODY_ROW; j++) {
            rightBodyArray[j] = [];
            leftBodyArray[j] = [];
            for (let i = LEFT_COLUMN; i < RIGHT_COLUMN; i++) {
                rightHeadArray[i - LEFT_COLUMN] = i;
                rightBodyArray[j][i - LEFT_COLUMN] = i;
            }
            for (let i = 0; i < LEFT_COLUMN; i++) {
                leftHeadArray[i] = i;
                leftBodyArray[j][i] = i;
            }
        }

        mapIndexBottom = -((rightHeadArray.length - RIGHT_HEAD_NUM) * 100) / SCROLL_BAR_BOTTOM_LENGTH;
        mapIndexRight = -((leftBodyArray.length - BOTTOM_BODY_NUM) * 40) / SCROLL_BAR_RIGHT_LENGTH;

    }

    render() {

        return (
            <AbsoluteLayout width="100%" height="100%" style={{position: "absolute"}} >
                <div width="100%" height="100%" style={{position: "absolute"}} onMouseMove={this._handleMouseMove} onMouseUp={this._handleMouseUp}>
                <MyTable myMouseDownX={this._handleMouseDownX} myMouseDownY={this._handleMouseDownY}
                         onScrollChangeX={this._handleScrollChangeX} onScrollChangeY={this._handleScrollChangeY}
                         left={this.state.left} top={this.state.top} leftHeadArray={leftHeadArray} rightHeadArray={rightHeadArray}
                         leftBodyArray={leftBodyArray} rightBodyArray={rightBodyArray} mapIndexBottom={mapIndexBottom}
                         mapIndexRight={mapIndexRight} onWheelY={this._handleWheelY} leftCol={LEFT_COLUMN}
                         leftHeadNum={LEFT_HEAD_NUM} rightHeadNum={RIGHT_HEAD_NUM}/>
                </div>
            </AbsoluteLayout>
        );
    }
}

export default App

