import React, {Component} from 'react';
import {VerticalLayout} from '../../../layout'

let oldY = 72;

class ScrollBarRight extends Component {

    constructor() {
        super();
    }

    _handleMouseClick = (e) => {
        e.preventDefault();
        const {onScrollChange} = this.props;
        let newY = e.pageY;
        let dy = newY - oldY;
        oldY = newY;
        onScrollChange(dy);
    }

    _handleMouseDown = (e) => {
        e.preventDefault();
        const {onScrollChange} = this.props;
        oldY = e.pageY;
        
        let func = (e) => {
            let newY = e.pageY;
            let dy = newY - oldY;
            oldY = newY;
            onScrollChange(dy);
        };
        
        let func2 = (e) => {
            document.body.removeEventListener("mousemove", func);
            document.body.removeEventListener("mouseup", func2);
        };
        
        document.body.addEventListener("mousemove", func);
        document.body.addEventListener("mouseup", func2);
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