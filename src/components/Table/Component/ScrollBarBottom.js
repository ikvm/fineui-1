import React, {Component} from 'react';
import {HorizontalLayout} from '../../../layout'

class ScrollBarBottom extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            down: false,
        };
    }

    _handleMouseClick = (e) => {
        e.preventDefault();
        let x = e.pageX;
        this.props.onScrollChange(x - 232);
    }

    _handleMouseDown = (e) => {
        e.preventDefault();
        this.props.myMouseDown();
    }

    render() {

        const {left, ...props} = this.props;

        return(
                <HorizontalLayout className="scroll-bar-bottom" {...props}>
                    <div className="scroll-cover" onClick={this._handleMouseClick}>
                        <div className="scroll-bar-bottom-core" onMouseDown={this._handleMouseDown} style={{left: left + "px"}}/>
                    </div>
                </HorizontalLayout>
            );
    }
}

export default ScrollBarBottom