import React, {Component, PureComponent, PropTypes} from 'react'
import {decorate as mixin} from 'react-mixin'
import {findDOMNode} from 'react-dom'

import {
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


class TableComponent extends PureComponent {
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
export default TableComponent
