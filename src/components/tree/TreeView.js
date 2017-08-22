import React, { Component } from 'react'
import cn from 'classnames'
import { Layout, HorizontalLayout, VerticalLayout } from '../../layout'
import IconButton from '../iconbutton'
import ButtonView from '../buttonView'
import Label from '../label'
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
        nodeLabel: null,
        depth: 0
    }


    handleClick = () => {
        this.props.handler()
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    render() {

        const { className, open, nodeLabel, depth, handler, ...props } = this.props
        const collapsed = this.state.collapsed

        const arrow = <IconButton className={cn('tree-view-arrow')}>+</IconButton>
        const label = <Label>{nodeLabel}</Label>
        const blank = <Label width={10}></Label>
        return (
            <VerticalLayout lgap={(depth) * 10} className={cn(CLASS_NAME, className)} {...props}>
                {
                    depth !== 0
                        ? <ButtonView handler={this.handleClick}>
                            <HorizontalLayout className={cn('tree-view-item')} height={'100%'} width={'100%'} vgap={5}>
                                {this.props.children ? arrow : null}
                                {label}
                            </HorizontalLayout>
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