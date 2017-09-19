import React, { Component } from "react";
import ButtonView from "../buttonView";
import Icon from "../icon";
import cn from "classnames";
import { HorizontalAdaptLayout, CenterLayout } from "../../../core/layout";

const CLASS_NAME = "fct-icon-button";

export default class IconButton extends Component {
	constructor(props, context) {
		super(props, context);
	}

	static defaultProps = {
		iconCls: "",
        iconWidth: null,
        iconHeight: null
	};

	render() {
		const { className, iconCls,iconWidth,            iconHeight, ...props } = this.props;

		return (
			<ButtonView className={cn(CLASS_NAME, className, iconCls)} {...props}>
				<Icon width={iconWidth} height={iconHeight} />
			</ButtonView>
		);
	}
}
