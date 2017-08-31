/**
 * Created by Urthur on 2017/8/29.
 */

import React, { Component, PropTypes } from 'react'
import ReactDom from 'react-dom'
import cn from 'classnames'
import emptyFunction from 'fbjs/lib/emptyFunction'
import Editor from '../editor'
import {
    Layout,
    CenterLayout,
    VerticalLayout
} from '../../layout'

const CLASS_NAME = 'bi-react-search';

class Search extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static defaultProps = {
        popupGetter: emptyFunction
    };

    state = {
        popupShow: true
    };



    _handler = (e) => {
        const self = this;
        e.nativeEvent.stopImmediatePropagation();
    };

    render() {
        const {popupGetter, ...props } = this.props;

        return <VerticalLayout className={cn(CLASS_NAME)} {...props}>
            <Layout className={cn("bi-react-trigger")} onClick={this._handler()} ref="trigger">
                <Editor></Editor>
            </Layout>
        </VerticalLayout>
    }
}
export default Search
