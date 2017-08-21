import React, {Component} from 'react';
import {HorizontalLayout} from '../../../layout'

let oldX = 272;;

class ScrollBarBottom extends Component {

    constructor() {
        super();
    }

    _handleMouseClick = (e) => {
        e.preventDefault();
        const {onScrollChange} = this.props;
        let newX = e.pageX;
        let dx = newX - oldX;
        oldX = newX;
        onScrollChange(dx, this.props.coreLength);
    }

    _handleMouseDown = (e) => {
        e.preventDefault();
        oldX = e.pageX;
        const {onScrollChange, layoutLeft, coreLength} = this.props;
        let offsetX = layoutLeft + 16;
        let func = (e) => {
            let newX = e.pageX;
            let dx = newX - oldX;
            oldX = newX;
            onScrollChange(dx, coreLength);
        };
        let func2 = (e) => {
            document.body.removeEventListener("mousemove", func);
            document.body.removeEventListener("mouseup", func2);
        };
        document.body.addEventListener("mousemove", func);
        document.body.addEventListener("mouseup", func2);
    }

    render() {

        const {left, layoutLeft, coreLength, ...props} = this.props;

        return(
                <HorizontalLayout className="scroll-bar-bottom" left={layoutLeft} {...props}>
                    <div className="scroll-cover" onClick={this._handleMouseClick}> 
                        <div className="scroll-bar-bottom-core" onMouseDown={this._handleMouseDown} 
                             style={{left: left + "px", width: coreLength + "px"}}/>
                    </div>
                </HorizontalLayout>
            );
    }
}

export default ScrollBarBottom