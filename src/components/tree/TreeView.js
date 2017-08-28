import React, { Component } from 'react'
import cn from 'classnames'
import { Layout, CenterLayout,HorizontalLayout, VerticalLayout,VerticalCenterLayout } from '../../layout'
import IconButton from '../iconbutton'
import ButtonView from '../buttonView'
import Label from '../label'
import Checkbox from '../input/checkbox'
import './TreeView.less'

const CLASS_NAME = 'tree-view'

export default class TreeView extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            collapsed: !this.props.open
        }
    }

    static defaultProps = {
        open: true,
        depth: 0
    }


    handleClick = () => {
        this.props.handler()
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    createIcon = (depth) => {
        let icons = []
        let i
        for ( i = 0; i < depth - 1; i++) {
            icons.push(<Layout key={i} className='base-line-conn-background' height={25} width={13}></Layout>)
        }
        if(!this.props.children){
            icons.push(<Layout key={i+1} className='mid-line-conn-background' height={25} width={25}></Layout>)
        }
        return icons
    }

    render() {

        const { className, open, item, depth, handler, ...props } = this.props
        const collapsed = this.state.collapsed

        const arrow = <IconButton width={25} height={25} iconCls={collapsed ? 'tree-collapse-icon-type2' : 'tree-expand-icon-type2'}></IconButton>
        const blank = <Label width={10}></Label>
        return (
            <VerticalLayout className={cn(CLASS_NAME, className)} {...props}>
                {
                    depth !== 0
                        ? <ButtonView handler={this.handleClick}>
                            <VerticalCenterLayout className={cn('tree-view-item')} height={'100%'} width={'100%'}>
                                {this.createIcon(depth)}
                                {this.props.children ? arrow : null}
                                {item}
                            </VerticalCenterLayout>
                        </ButtonView>
                        : null
                }
                <Layout className={cn('tree-view_children')}>
                    {collapsed ? null : this.props.children}
                </Layout>
            </VerticalLayout>
        )
    }
}