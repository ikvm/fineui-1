/**
 * Created by Urthur on 2017/9/4.
 */
import React, { Component, PropTypes } from 'react'
import Calendar from '../src/components/calendar'
import Label from '../src/base/single/label'
import ButtonView from '../src/base/single/buttonView'
import { Layout, CenterLayout, VerticalLayout } from '../src/core/layout'

const TODAY = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate()
};
class CalendarDemo extends Component{
    constructor(props, context) {
        super(props, context);
    }

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
        this.storeValue = v;
        this.setState(v);
    };

    render() {
        let {year, month, day} = this.state;

        return <VerticalLayout>
                <CenterLayout>
                    <Label>{this.storeValue.year}年</Label>
                    <Label>{this.storeValue.month + 1}月</Label>
                    <Label>{this.storeValue.day}日</Label>
                </CenterLayout>
                <CenterLayout>
                    <ButtonView handler={this._prevMonth.bind(this)}>{"<"}</ButtonView>
                    <Label lgap={50}>{year}年</Label>
                    <Label rgap={50}>{month + 1}月</Label>
                    <ButtonView handler={this._nextMonth.bind(this)}>{">"}</ButtonView>
                </CenterLayout>
                <CenterLayout>
                    <Calendar year={year} month={month} day={day} handler={this.setValue} />
                </CenterLayout>
            </VerticalLayout>

    }
}
export default CalendarDemo
