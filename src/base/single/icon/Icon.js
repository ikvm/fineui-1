import React, { Component } from "react";
import { Layout } from "../../../core/layout";
import cn from "classnames";

const CLASS_NAME = "bi-icon";

class Icon extends Component {
	constructor(props) {
		super(props);
	}

	static defaultProps = {
		width: 25,
		height: 25
	};

	render() {
		const { iconCls, width, height, ...props } = this.props;

		const styleObj = {
			display: "block",
			width: width + "px",
			height: height + "px"
		};

		return <i className={cn(CLASS_NAME)} style={styleObj} />;
	}
}

export default Icon;
