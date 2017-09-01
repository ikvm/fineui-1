import React, { Component, cloneElement } from 'react'
import { findDOMNode } from 'react-dom'
import Overlay from '../overlay'
import getElementPosition from 'fbjs/lib/getElementPosition'
import getElementRect from 'fbjs/lib/getElementRect'


const DIRECTION = {
    //top
    TOP: 'top',
    TOPLEFT: 'top,left',
    TOPRIGHT: 'top,right',
    //left
    LEFT: 'left',
    LEFTTOP: 'left,top',
    LEFTCENTER: 'left,center',
    //bottom
    BOTTOM: 'bottom',
    BOTTOMLEFT: 'bottom,left',
    BOTTOMRIGHT: 'bottom,right',
    //right
    RIGHT: 'right',
    RIGHTTOP: 'right,top',
    RIGHTBOTTOM: 'right,bottom'
}


export default class Popup extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            positionX: 0,
            positionY: 0
        }
    }

    static defaultProps = {
        direction: DIRECTION.BOTTOM,
        target: null, //a dom or element
        adjustLength: 0 //调整的距离
    }

    getTarget = () => {
        const {target} = this.props
        const targetElement = typeof target === 'function' ? target() : target
        return targetElement && findDOMNode(targetElement) || null
    }

    getPopupInfo = () => {
        //let dom = findDOMNode(this.newChild)
        console.log('dom', this.newChild)
        // if (dom) {
        //     let t = getElementPosition(dom)
        // }
        return {
            width: this.props.children.props.width,
            height: this.props.children.props.height
        }
    }

    calculatePosition = (target) => {
        const {direction} = this.props

        //targetPos:{x,y,width,height}
        const targetPos = getElementPosition(target)

        let newPosition = targetPos
        let popupInfo = this.getPopupInfo()
        switch (direction) {
            case DIRECTION.BOTTOMLEFT:
            case DIRECTION.BOTTOM:
                newPosition.x = targetPos.x + (targetPos.width - popupInfo.width) / 2
                newPosition.y = targetPos.y + targetPos.height
            default:
                newPosition = targetPos
        }
        return newPosition
    }

    updatePosition = (target) => {
        const newPosition = this.calculatePosition(target)
        this.setState({
            positionX: newPosition.x,
            positionY: newPosition.y
        })
    }

    componentDidMount() {
        this.updatePosition(this.getTarget())
        console.log('this', this)
    }

    componentDidUpdate(prevProps) {
        if (this.props.placement !== prevProps.placement) {
            this.updatePosition(this.getTarget())
        }
    }

    render() {
        const {children, direction, target, adjustLength} = this.props
        const child = React.Children.only(children);
        const newChild = cloneElement(
            child, {
                style: {
                    ...child.props.style,
                    position: 'fixed',
                    zIndex: 9999999,
                    left: this.state.positionX,
                    top: this.state.positionY
                }
            }
        )
        this.newChild = newChild
        return <Overlay>
                 { newChild }
               </Overlay>
    }
}