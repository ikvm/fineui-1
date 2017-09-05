import React, { Component } from "react";
import Popup from "../../base/overlays/popup";
import { Layout } from "../../core/layout";
import DownListItem from "./Item.DownList";

export default class DownListPopup extends Component {
	render() {
		const { target, children, subItems, ...props } = this.props;

		return (
			<Popup target={target} {...props}>
				<Layout>{children}</Layout>
			</Popup>
		);
	}
}
