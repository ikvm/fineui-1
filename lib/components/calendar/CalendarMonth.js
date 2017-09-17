import React, { Component, PropTypes } from 'react'
import cn from "classnames";
import emptyFunction from 'fbjs/lib/emptyFunction'
import Calendar from './Calendar'
import Label from '../../base/single/label'
import ButtonView from '../../base/single/buttonView'
import { Layout, CenterLayout, VerticalLayout, HorizontalLayout } from '../../core/layout'
import './CalendarMonth.less'

const CLASS_NAME = "bi-react-calendar-month";
const TODAY = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate()
};
class CalendarMonth extends Component{
    constructor(props, context) {
        super(props, context);
    }

    static defaultProps = {
        handler: emptyFunction
    };

    state = {
        year: TODAY.year,
        month: TODAY.month,
        day: TODAY.day
    };

    componentWillMount() {
        this.storeValue = TODAY;
    }

    //切换到下个月
    _nextMonth() {
        if (this.state.month === 11) {
            this.setState({
                year: ++this.state.year,
                month: 0,
                day: (this.state.year === TODAY.year && TODAY.month === 0) ? TODAY.day : 1

            })
        } else {
            this.setState({
                month: ++this.state.month,
                day: (this.state.year === TODAY.year && this.state.month === TODAY.month) ? TODAY.day : 1
            })
        }
    }

    //切换到上一个月
    _prevMonth() {
        if (this.state.month === 0) {
            this.setState({
                year: --this.state.year,
                month: 11,
                day: (this.state.year === TODAY.year && TODAY.month === 11) ? TODAY.day : 1
            });

        } else {
            this.setState({
                month: --this.state.month,
                day: (this.state.year === TODAY.year && this.state.month === TODAY.month) ? TODAY.day : 1
            })
        }
    }

    setValue = (v) => {
        let {handler} = this.props;
        this.storeValue = v;
        this.setState(v);
        handler(this.storeValue);
    };

    render() {
        let {year, month, day} = this.state;

        return <VerticalLayout className={cn(CLASS_NAME)}>
            <CenterLayout className={cn ([`${CLASS_NAME}-head`])} height={25} width={245}>
                <ButtonView handler={this._prevMonth.bind(this)}>{"<"}</ButtonView>
                <Label lgap={70}>{year}年</Label>
                <Label rgap={70}>{month + 1}月</Label>
                <ButtonView handler={this._nextMonth.bind(this)}>{">"}</ButtonView>
            </CenterLayout>
            <Calendar year={year} month={month} day={day} handler={this.setValue} />
        </VerticalLayout>
    }
}
export default CalendarMonth
