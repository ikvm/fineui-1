/**
 * Created by Wang on 2016/12/18.
 * Modified by NieShichao on 2017/09/04
 */
import React, {Component } from 'react';
import PropTypes from 'prop-types'
import mixin from 'react-mixin';
import ReactComponentWithPureRenderMixin from 'react-addons-pure-render-mixin';

import {translateDOMPositionXY, cn} from 'utils';
import Scrollbar from '../Table/Scrollbar'
import './Scrollbar.less'

class HorizontalScrollbar extends Component {
    static propTypes = {
        contentSize: PropTypes.number.isRequired,
        offset: PropTypes.number.isRequired,
        onScroll: PropTypes.func.isRequired,
        position: PropTypes.number.isRequired,
        size: PropTypes.number.isRequired
    };

    render() /*object*/ {

        const outerContainerStyle = {
            height: Scrollbar.SIZE,
            width: this.props.size
        };
        const innerContainerStyle = {
            height: Scrollbar.SIZE,
            position: 'absolute',
            overflow: 'hidden',
            width: this.props.size
        };
        translateDOMPositionXY(
            innerContainerStyle,
            0,
            this.props.offset
        );

        return (
            <div
                className={'horizontal-scrollbar'}
                style={outerContainerStyle}>
                <div style={innerContainerStyle}>
                    <Scrollbar
                        {...this.props}
                        isOpaque={true}
                        orientation="horizontal"
                        offset={undefined}
                    />
                </div>
            </div>
        );
    }
}
mixin.onClass(HorizontalScrollbar, ReactComponentWithPureRenderMixin);

export default HorizontalScrollbar
