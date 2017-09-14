/**
 * Created by Urthur on 2017/9/4.
 */
import React, { Component, PropTypes } from 'react'
import { CalendarMonth } from '../src/components/calendar'
import Label from '../src/base/single/label'
import { Layout, CenterLayout, VerticalLayout, HorizontalLayout } from '../src/core/layout'
import './example.less'

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

    setValue = (v) => {
        this.setState(v);
    };

    render() {
        return <VerticalLayout>
                <HorizontalLayout>
                    <Label>{this.state.year ? this.state.year + "-" : ""}</Label>
                    <Label>{this.state.month ? (this.state.month + 1) + "-" : ""}</Label>
                    <Label>{this.state.day}</Label>
                </HorizontalLayout>
                <CalendarMonth handler={this.setValue}/>
        </VerticalLayout>
    }
}
export default CalendarDemo
