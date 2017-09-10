import React, { Component } from "react";
import { Layout } from "../../../../core/layout";
import Label from "../../label";
import cn from "classnames";

const CLASS_NAME = "bi-toast";
const TOAST_HEIGHT = 25;

class Toast extends Component {
	constructor(props, context) {
		super(props, context);
	}

	static defaultProps = {
		level: "common",
		autoClose: true,
		message: "",
		duration: 3000, //延时
		container: "" //插到哪里,待定,一般都是 body 上
	};

	componentDidMount() {
		if (this.props.duration > 0) {
			this.closeTimer = setTimeout(() => {
				this.close();
			}, this.props.duration);
		}
	}

	clearCloseTimer = () => {
		if (this.closeTimer) {
			clearTimeout(this.closeTimer);
			this.closeTimer = null;
		}
	};

	close = () => {
		this.clearCloseTimer();
		this.props.onClose();
	};

	render() {
		const { className, level, message } = this.props;

		let classes = cn(CLASS_NAME, className, {
			[`${CLASS_NAME}-${level}`]: level
		});

		return (
			<Label height={TOAST_HEIGHT} className={classes} vgap={10}>
				{message}
			</Label>
		);
	}

	componentWillUnmount() {
		// 当有意外关闭的时候 清掉定时器
		this.clearCloseTimer();
	}
}

export default Toast;
