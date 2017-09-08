/**
 * Created by Urthur on 2017/9/3.
 */
import React, { Component, PropTypes } from 'react'
import emptyFunction from 'fbjs/lib/emptyFunction'
import cn from 'classnames'
import {
    Layout,
    CenterLayout,
    VerticalLayout
} from '../../core/layout'
import Label from '../../base/single/label'
import ButtonView from '../../base/single/buttonView'
import {Table} from '../table';
import '../../core/proto/date'
import './Calendar.less'

const CLASS_NAME = 'bi-react-calendar';
class  Calendar extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static defaultProps = {
        year: 2017,
        month: 0,  //0表示一月
        day: 1,
        handler: emptyFunction
    };

    state = {
        min: '1900-01-01', //最小日期
        max: '2099-12-31' //最大日期
    };
    _dateCreator(Y, M, D) {
        let {min, max} = this.state, log = {}, De = new Date();
        let mins = min.match(/\d+/g);
        let maxs = max.match(/\d+/g);
        Y < (mins[0] | 0) && (Y = (mins[0] | 0));
        Y > (maxs[0] | 0) && (Y = (maxs[0] | 0));

        De.setFullYear(Y, M, D);
        log.ymd = [De.getFullYear(), De.getMonth(), De.getDate()];

        let MD = Date._MD.slice(0);
        MD[1] = Date.isLeap(log.ymd[0]) ? 29 : 28;

        De.setFullYear(log.ymd[0], log.ymd[1], 1);
        log.FDay = De.getDay();

        log.PDay = MD[M === 0 ? 11 : M - 1] - log.FDay + 1;
        log.NDay = 1;

        let items = [];
        for (let i = 0; i < 42; i++ ) {
            let td = {}, YY = log.ymd[0], MM = log.ymd[1] + 1, DD;
            if (i < log.FDay) {
                td.lastMonth = true;
                DD = i + log.PDay;
                MM === 1 && (YY -= 1);
                MM = MM === 1 ? 12 : MM - 1;
            } else if (i >= log.FDay && i < log.FDay + MD[log.ymd[1]]) {
                DD = i - log.FDay + 1;
                if (i - log.FDay + 1 === log.ymd[2]) {
                    td.currentDay = true;
                }
            } else {
                td.nextMonth = true;
                DD = log.NDay++;
                MM === 12 && (YY += 1);
                MM = MM === 12 ? 1 : MM + 1;
            }
            if (Date.checkVoid(YY, MM, DD, mins, maxs)[0]) {
                td.disabled = true;
            }
            td.text = DD;
            items.push(td);
        }
        return items;
    }

    render() {
        let {year, month, day, handler} = this.props;
        let days = this._dateCreator(year, month, day);
        let items = [], header = [], body = [];
        header[0] = [];
        Date._SDN.slice(0, 7).map((value, i)=> {
                 header[0][i] = <Label>{value}</Label>
            }
        );
        items.push(days.slice(0, 7));
        items.push(days.slice(7, 14));
        items.push(days.slice(14, 21));
        items.push(days.slice(21, 28));
        items.push(days.slice(28, 35));
        items.push(days.slice(35, 42));

        items.map((item, i) => {
            body[i] = [];
            item.map((td, j) => {
                let date = {
                    year: year,
                    month: month,
                    day: td.text
                };
                let disabled = td.lastMonth || td.nextMonth || td.disabled;
                let selected = (day === td.text) && !disabled;
                body[i][j] = <ButtonView className= { cn ([`${CLASS_NAME}-item`],{[`${CLASS_NAME}-item-active`] : selected})} disabled={disabled} handler={handler.bind(this, date)}>
                                <Label hgap={10} vgap={5}>
                                    {td.text}
                                </Label>
                            </ButtonView>
            });
        });

        return <VerticalLayout className={cn(CLASS_NAME)}>
                <Table header={header} items ={body} />
            </VerticalLayout>
    }
}
export default Calendar
