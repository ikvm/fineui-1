import React, {Component} from 'react';
import {HorizontalLayout} from '../../../layout';
import {getElementLeft} from '../../../utils/utils/getElementPosition';
import cn from 'classnames';

class ScrollBarBottom extends Component {

    constructor() {
        super();
    }

    _handleMouseClick = (e) => {
        e.preventDefault();
        const {onScrollChange, coreLength, width, flag} = this.props;
        let newX = e.pageX;
        let left = getElementLeft(document.getElementsByClassName("scroll-bar-bottom" + " " + flag)[0]);
        let dx = newX - left;

        onScrollChange(dx, coreLength, width);
    }

    _handleMouseDown = (e) => {
        e.preventDefault();

        const {onScrollChange, coreLength, width, flag} = this.props;
        let left = getElementLeft(document.getElementsByClassName("scroll-bar-bottom" + " " + flag)[0]);
        let func = (e) => {
            let newX = e.pageX;
            let dx = newX - left;
            onScrollChange(dx, coreLength, width);
        };
        let func2 = (e) => {
            document.body.removeEventListener("mousemove", func);
            document.body.removeEventListener("mouseup", func2);
        };
        document.body.addEventListener("mousemove", func);
        document.body.addEventListener("mouseup", func2);
    }

    render() {

        const {left, layoutLeft, coreLength, flag, ...props} = this.props;

        return(
                <HorizontalLayout className={cn("scroll-bar-bottom", flag)} left={layoutLeft} {...props}>
                    <div className="scroll-cover" onClick={this._handleMouseClick}> 
                        <div className="scroll-bar-bottom-core" onMouseDown={this._handleMouseDown} 
                             style={{left: left + "px", width: coreLength + "px"}}/>
                    </div>
                </HorizontalLayout>
            );
    }
}

export default ScrollBarBottom