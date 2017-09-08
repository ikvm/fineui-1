/**
 * Created by Urthur on 2017/9/4.
 */
import React, { Component, PropTypes } from 'react'
import Calendar from '../src/components/calendar'
import Label from '../src/base/single/label'
import ButtonView from '../src/base/single/buttonView'
import { Layout, CenterLayout, VerticalLayout } from '../src/core/layout'

class CalendarDemo extends Component{
    constructor(props, context) {
        super(props, context);
    }

    state = {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().Date()
    };

    //切换到下个月
    _nextMonth() {
        if (this.state.month === 11) {
            this.setState({
                year: ++this.state.year,
                month: 0
            })
        } else {
            this.setState({
                month: ++this.state.month
            })
        }
    }

    //切换到上一个月
    _prevMonth() {
        if (this.state.month === 0) {
            this.setState({
                year: --this.state.year,
                month: 11
            })
        } else {
            this.setState({
                month: --this.state.month
            })
        }
    }

    setValue = (v) => {
        this.setState(v);
    };

    render() {
        let {year, month, day} = this.state;
        return <VerticalLayout>
                <CenterLayout>
                    <Label>{year}年</Label>
                    <Label>{month + 1}月</Label>
                    <Label>{day}日</Label>
                </CenterLayout>
                <CenterLayout>
                    <ButtonView handler={this._prevMonth.bind(this)}>《</ButtonView>
                    <Label lgap={50}>{year}年</Label>
                    <Label rgap={50}>{month + 1}月</Label>
                    <ButtonView handler={this._nextMonth.bind(this)}>》</ButtonView>
                </CenterLayout>
                <CenterLayout>
                    <Calendar year={year} month={month} day={day} handler={this.setValue} />
                </CenterLayout>
            </VerticalLayout>

    }
}
export default CalendarDemo
