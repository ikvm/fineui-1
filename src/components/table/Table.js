import React, {Component} from 'react';
import './table.less';
import {ScrollBarBottom, ScrollBarRight, TableHead, TableBody} from './Component';
import {AbsoluteLayout} from '../../layout';

class MyTable extends Component {

    _renderLeftHead(leftHeadNum) {
        const {leftHeadArray} = this.props;
        return <TableHead left={0} top={0} colIndex={0} colNum={leftHeadNum} array={leftHeadArray}
                          head={true} width={200} height={40}/>;
    }

    _renderRightHead(mapIndexBottom, left, leftCol, rightHeadNum) {
        const {rightHeadArray} = this.props;
        return <TableHead className="table-right-head" left={mapIndexBottom * left} top={0} colIndex={leftCol}
                          colNum={rightHeadNum} array={rightHeadArray} head={true} width={600} height={40} />;
    }

    _renderLeftBody(mapIndexRight, top, leftHeadNum, onWheelY) {
        const {leftBodyArray} = this.props;
        return <TableBody className="table-left-body-frame" left={0} top={mapIndexRight * top} colIndex={0} colNum={leftHeadNum}
                              array={leftBodyArray} onWheelY={onWheelY} head={false} width={200} height={440}
                              scrollable={false} scrollx={false} scrolly={false}/>;
    }

    _renderRightBody(mapIndexBottom, mapIndexRight, left, top, leftCol, rightHeadNum, onWheelY) {
        const {rightBodyArray} = this.props;
        return <TableBody className="table-right-body-frame" left={mapIndexBottom * left} top={mapIndexRight * top}
                               colIndex={leftCol} colNum={rightHeadNum} array={rightBodyArray}
                               onWheelY={onWheelY} head={false} width={600} height={440} scrollable={false}
                               scrollx={false} scrolly={false}/>;
    }

    _renderScrollBarBottom(left) {
        const {onScrollChangeX, myMouseDownX} = this.props;
        return <ScrollBarBottom onScrollChange={onScrollChangeX} left={left} myMouseDown={myMouseDownX}
                                height={3} width={598}/>;
    }

    _renderScrollBarRight(top) {
        const {onScrollChangeY, myMouseDownY} = this.props;
        return <ScrollBarRight onScrollChange={this.props.onScrollChangeY} top={top} myMouseDown={this.props.myMouseDownY}
                               height={438} width={3}/>;
    }

    render() {

        const {leftCol, leftHeadNum, rightHeadNum, left, top, mapIndexBottom, mapIndexRight, onWheelY} = this.props;
        
        return(
            <AbsoluteLayout className="table-frame" width="834px" height="534px" lgap="16px" tgap="16px">
                <AbsoluteLayout className="table" width="800px" height="500px" lgap="16px" tgap="16px">
                    {this._renderLeftHead(leftHeadNum)}
                    {this._renderRightHead(mapIndexBottom, left, leftCol, rightHeadNum)}
                    {this._renderLeftBody(mapIndexRight, top, leftHeadNum, onWheelY)}
                    {this._renderRightBody(mapIndexBottom, mapIndexRight, left, top, leftCol, rightHeadNum, onWheelY)}
                </AbsoluteLayout>
                {this._renderScrollBarBottom(left)}
                {this._renderScrollBarRight(top)}
            </AbsoluteLayout>
            );
    }
}

export default MyTable