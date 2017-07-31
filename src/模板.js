import React, {Component, PropTypes} from 'react'
import mixin from 'react-mixin'
import {findDOMNode} from 'react-dom'

import {
    ReactComponentWithPureRenderMixin,
    ReactComponentWithImmutableRenderMixin,
    cn,
    sc,
    math,
    isNil,
    emptyFunction,
    shallowEqual,
    immutableShallowEqual,
    isEqual,
    isEmpty,
    each,
    map,
    clone,
    deepClone,
    translateDOMPositionXY,
    requestAnimationFrame
} from 'utils'

import {
    Layout,
    HorizontalLayout,
    VerticalLayout,
    CenterLayout,
    HorizontalCenterLayout,
    VerticalCenterLayout
} from 'layout'

import {Colors, Sizes, TemplateFactory, WidgetFactory, DimensionFactory} from 'data'

import {Button, TextButton, IconButton, Table} from 'base'

import {MultiSelectorWidget} from 'widgets'


class TableComponent extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {};

    static defaultProps = {};

    state = {};

    _getNextState(props, state = {}) {

    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {
        const {...props} = this.props, {...state} = this.state;
        return <Layout>

        </Layout>
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

}
mixin.onClass(TableComponent, ReactComponentWithImmutableRenderMixin);

const styles = {

};
export default TableComponent
