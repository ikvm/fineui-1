import React, { Component } from 'react'
import { HorizontalLayout, CenterLayout, Layout } from '../../core/layout'
import Button from '../single/button'
import Label from '../single/label'
import cn from 'classnames'
import emptyFunction from 'fbjs/lib/emptyFunction'
import range from 'lodash/range'
import isNil from 'lodash/isNil'


const CLASS_NAME = 'fct-pager'

export default class Pager extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            current: 1
        }
    }

    static defaultProps = {
        dynamicShow: true, //是否动态显示上一页、下一页、首页、尾页， 若为false，则指对其设置使能状态
        //dynamicShow为false时以下两个有用
        dynamicShowFirstLast: false, //是否动态显示首页、尾页
        dynamicShowPrevNext: false, //是否动态显示上一页、下一页
        pages: false, //总页数
        curr: function() {
            return 1;
        }, //初始化当前页
        groups: 0, //连续显示分页数
        jump: null, //分页的回调函数
        first: false, //是否显示首页
        last: false, //是否显示尾页
        prev: "上一页",
        next: "下一页",
        firstPage: 1,
        lastPage: function() { //在万不得已时才会调用这个函数获取最后一页的页码,  主要作用于setValue方法
            return 1;
        },
        hasPrev: emptyFunction, //pages不可用时有效
        hasNext: emptyFunction //pages不可用时有效
    }

    itemHandler = (value) => {
        this.setState({
            current: value
        })
    }

    nextHandler = () => {
        this.setState((prevState, props) => {
            if (prevState.current === props.pages) {
                return
            }
            return {
                current: prevState.current + 1
            }
        })
    }

    prevHandler = () => {
        this.setState((prevState, props) => {
            if (prevState.current === 1) {
                return
            }
            return {
                current: prevState.current - 1
            }
        })
    }

    firstHandler = () => {
        if (this.state.current === 1) {
            return
        }
        this.setState({
            current: 1
        })
    }

    lastHandler = () => {
        if (this.state.current === this.props.pages) {
            return
        }
        this.setState({
            current: this.props.pages
        })
    }

    createItem = (index) => {
        return <Button className={ cn('pager-item', {
                        'active': index === this.state.current
                    }) } handler={ () => this.itemHandler(index) } clear={ true } key={ index }>
                 { index }
               </Button>
    }



    render() {
        const {className, pages, curr, groups, first, last, prev, next, dynamicShow, dynamicShowPrevNext, ...props} = this.props
        let view = []
        if (pages - this.state.current < groups / 2) {
            for (let i = pages - groups + 1; i < pages + 1; i++) {
                view.push(this.createItem(i))
            }
        } else if (this.state.current < groups / 2) {
            for (let i = 1; i < groups + 1; i++) {
                view.push(this.createItem(i))
            }
        } else {
            for (let i = this.state.current - Math.floor(groups / 2); i < this.state.current + Math.floor(groups / 2) + 1; i++) {
                view.push(this.createItem(i))
            }
        }



        return <Layout className={ cn(className, CLASS_NAME) }>
                 <Button handler={ this.prevHandler }>上一页</Button>
                 <Button handler={ this.firstHandler }>
                   { '首页>' }
                 </Button>
                 { view }
                 <Button handler={ this.lastHandler }>
                   { '<尾页' }}</Button>
                 <Button handler={ this.nextHandler }>下一页</Button>
               </Layout>
    }
}
