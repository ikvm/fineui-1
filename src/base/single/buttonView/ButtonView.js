/**
 * Created by GUY on 2017/8/15.
 * 基础 button,一个可点击组件
 */

import React from "react";
import cn from "classnames";
import emptyFunction from 'fbjs/lib/emptyFunction'
import Single from "../Single";
import { FillLayout } from "../../../core/layout";

const CLASS_NAME = "bi-button-view";

const TRIGGER = {
	CLICK: "click",
	MOUSEDOWN: "mousedown",
	DBCLICK: "dbclick",
	MOUSEUP: "mouseup"
};

export default class ButtonView extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {};
	}

	static defaultProps = {
		stopPropagation: false,
		trigger: TRIGGER.CLICK,
		handler: emptyFunction
	};

	//设置触发方式
	_bindEvent = trigger => {
		let bindEvent = {};
		let triggerArr = (trigger || "").split(",");
		triggerArr.forEach((t, index) => {
			switch (t) {
				case "click":
					bindEvent.onClick = this.handleClick;
					break;
				case "dbclick":
					bindEvent.onDoubleClick = this.handleDoubleClick;
					break;
				case "mousedown":
					bindEvent.onMouseDown = this.handleMouseDown;
					break;
				case "mouseup":
					bindEvent.onMouseUp = this.handleMouseUp;
					break;
				default:
					bindEvent.onClick = this.handleClick;
			}
		});
		return bindEvent;
	};

	handleClick = e => {
		if (this.props.stopPropagation) {
			e.stopPropagation();
		}
		const { disabled, handler } = this.props;
		if (!disabled && handler) {
			handler(e);
		} else {
			console.log("点击事件触发,但没有 handler,所以啥也不干");
		}
	};
	handleDoubleClick = e => {
		if (this.props.stopPropagation) {
			e.stopPropagation();
		}
		this.props.handler();
		console.log("dbclick");
	};
	handleMouseDown = e => {
		if (this.props.stopPropagation) {
			e.stopPropagation();
		}
		this.props.handler();
		console.log("mousedown");
	};
	handleMouseUp = e => {
		if (this.props.stopPropagation) {
			e.stopPropagation();
		}
		this.props.handler();
		console.log("mouseup");
	};

	render() {
		const {
			handler,
			trigger,
			className,
			stopPropagation,
			...props
		} = this.props;

		return (
			<Single
				className={cn(CLASS_NAME, className)}
				{...this._bindEvent(trigger)}
				{...props}
			>
				{this.props.children}
			</Single>
		);
	}
}

ButtonView.TRIGGER = TRIGGER;
