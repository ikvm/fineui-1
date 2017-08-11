import React, {Component} from 'react';
import {VerticalLayout} from '../../../layout'

class ScrollBarRight extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            down: false,
        };
    }

    _handleMouseClick = (e) => {
        e.preventDefault();
        let y = e.pageY;
        this.props.onScrollChange(y - 72);
    }

    _handleMouseDown = (e) => {
        e.preventDefault();
        this.props.myMouseDown();
    }

    render() {

        const {top, ...props} = this.props;

        return(
                <VerticalLayout className="scroll-bar-right" scrolly={true} {...props}>
                    <div className="scroll-cover" onClick={this._handleMouseClick}>
                        <div className="scroll-bar-right-core" onMouseDown={this._handleMouseDown} style={{top: top + "px"}}/>
                    </div>
                </VerticalLayout>
            );
    }
}

export default ScrollBarRight