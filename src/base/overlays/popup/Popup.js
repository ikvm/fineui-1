/**
 * Created by dailer on 2017/9/4.
 */

import React, { Component, cloneElement } from "react";
import { findDOMNode } from "react-dom";
import cn from "classnames";
import {
	VerticalLayout,
	HorizontalLayout,
	VtapeLayout,
	Layout
} from "../../../core/layout";
import Overlay from "../overlay";
import getElementPosition from "fbjs/lib/getElementPosition";
import getElementRect from "fbjs/lib/getElementRect";

const DIRECTION = {
	//top
	TOP: "top",
	TOP_LEFT: "top,left",
	TOP_RIGHT: "top,right",
	//left
	LEFT: "left",
	LEFT_TOP: "left,top",
	LEFT_BOTTOM: "left,bottom",
	//bottom
	BOTTOM: "bottom",
	BOTTOM_LEFT: "bottom,left",
	BOTTOM_RIGHT: "bottom,right",
	//right
	RIGHT: "right",
	RIGHT_TOP: "right,top",
	RIGHT_BOTTOM: "right,bottom"
};

const CLASS_NAME = "bi-popup";

export default class Popup extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			positionX: 0,
			positionY: 0
		};
	}

	static defaultProps = {
		direction: DIRECTION.TOP,
		target: null, //a dom or element
		adjustLength: 0, //调整的距离
		isVisiable: false, //是否显示
		buttons: [],
		tabs: []
	};

	getTarget = () => {
		const { target } = this.props;
		const targetElement = typeof target === "function" ? target() : target;
		return (targetElement && findDOMNode(targetElement)) || null;
	};

	getWrapperInfo = () => {
		let dom = findDOMNode(this.wrapper);
		if (dom) {
			let t = getElementPosition(dom);
			return t;
		} else {
			return {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			};
		}
	};

	calculatePosition = target => {
		const { direction } = this.props;

		//targetPos:{x,y,width,height}
		const targetPos = getElementPosition(target);

		let newPosition = targetPos;
		let wrapperPos = this.getWrapperInfo();
		switch (direction) {
			//bottom
			case DIRECTION.BOTTOM_LEFT:
				newPosition.y = targetPos.y + targetPos.height;
				break;
			case DIRECTION.BOTTOM:
				newPosition.x = targetPos.x + (targetPos.width - wrapperPos.width) / 2;
				newPosition.y = targetPos.y + targetPos.height;
				break;
			case DIRECTION.BOTTOM_RIGHT:
				newPosition.x = targetPos.x + (targetPos.width - wrapperPos.width);
				newPosition.y = targetPos.y + targetPos.height;
				break;

			//top
			case DIRECTION.TOP_LEFT:
				newPosition.x = targetPos.x;
				newPosition.y = targetPos.y - wrapperPos.height;
				break;
			case DIRECTION.TOP:
				newPosition.x = targetPos.x + (targetPos.width - wrapperPos.width) / 2;
				newPosition.y = targetPos.y - wrapperPos.height;
				break;
			case DIRECTION.TOP_RIGHT:
				newPosition.x = targetPos.x + (targetPos.width - wrapperPos.width);
				newPosition.y = targetPos.y - wrapperPos.height;
				break;

			//left
			case DIRECTION.LEFT_TOP:
				newPosition.x = targetPos.x - wrapperPos.width;
				newPosition.y = targetPos.y;
				break;
			case DIRECTION.LEFT:
				newPosition.x = targetPos.x - wrapperPos.width;
				newPosition.y =
					targetPos.y - (wrapperPos.height - targetPos.height) / 2;
				break;
			case DIRECTION.LEFT_BOTTOM:
				newPosition.x = targetPos.x - wrapperPos.width;
				newPosition.y = targetPos.y - (wrapperPos.height - targetPos.height);
				break;

			//right
			case DIRECTION.RIGHT_TOP:
				newPosition.x = targetPos.x + targetPos.width;
				newPosition.y = targetPos.y;
				break;
			case DIRECTION.RIGHT:
				newPosition.x = targetPos.x + targetPos.width;
				newPosition.y =
					targetPos.y - (wrapperPos.height - targetPos.height) / 2;
				break;
			case DIRECTION.RIGHT_BOTTOM:
				newPosition.x = targetPos.x + targetPos.width;
				newPosition.y = targetPos.y - (wrapperPos.height - targetPos.height);
				break;

			default:
				newPosition = targetPos;
		}
		return newPosition;
	};

	updatePosition = target => {
		const newPosition = this.calculatePosition(target);

		if (this.shouldUpdatePosition(newPosition)) {
			this.setState({
				positionX: newPosition.x,
				positionY: newPosition.y
			});
		}
	};

	shouldUpdatePosition = newPosition => {
		return (
			this.state.positionX !== newPosition.x ||
			this.state.positionY !== newPosition.y
		);
	};

	componentDidMount() {
		this.updatePosition(this.getTarget());
	}

	componentDidUpdate(prevProps) {
		this.updatePosition(this.getTarget());
	}

	componentWillReceiveProps(nextProps) {}

	shouldComponentUpdate(nextProps, nextState) {
		return true;
	}

	render() {
		const {
			children,
			className,
			direction,
			target,
			adjustLength,
			isVisiable,
			buttons,
			tabs,
			...props
		} = this.props;

		const toolbar =
			buttons.length !== 0 ? (
				<HorizontalLayout>
					{buttons.map((button, index) => {
						return cloneElement(button, {
							stopPropagation: true
						});
					})}
				</HorizontalLayout>
			) : null;

		const tab =
			tabs.length !== 0 ? (
				<Layout>
					{tabs.map((tab, index) => {
						return tab;
					})}
				</Layout>
			) : null;

		const child = React.Children.only(children);

		const styleObj = {
			...child.props.style,
			position: "fixed",
			zIndex: 9999999,
			left: this.state.positionX,
			top: this.state.positionY,
			display: isVisiable ? "flex" : "none"
		};

		return (
			<VtapeLayout
				ref={c => {
					this.wrapper = c;
				}}
				className={cn(className, CLASS_NAME)}
				style={styleObj}
				{...props}
			>
				{/* <VtapeLayout.Item height={30}>{tab}</VtapeLayout.Item> */}
				<VtapeLayout.Item>{child}</VtapeLayout.Item>
				{/* <VtapeLayout.Item height={20}>{toolbar}</VtapeLayout.Item> */}
			</VtapeLayout>
		);
	}
}
