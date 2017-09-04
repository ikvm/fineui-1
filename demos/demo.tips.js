import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import Toast from "../src/base/single/tip/toast/Toast";
import Button from "../src/base/single/button";
import { CenterLayout } from "../src/core/layout";
import Popup from "../src/base/overlays/popup";
import getElementPosition from "fbjs/lib/getElementPosition";

let directions = [
	"bottom,left",
	"bottom",
	"bottom,right",
	"top,left",
	"top",
	"top,right",
	"left,top",
	"left",
	"left,bottom",
	"right,top",
	"right",
	"right,bottom"
];

export default class TipsDemo extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			showPopup: false,
			direction: directions[0]
		};
	}

	handler = () => {
		this.setState({
			showPopup: this.state.direction !== "right,bottom",
			direction:
				directions[
					(directions.indexOf(this.state.direction) + 1) % directions.length
				]
		});
	};

	handlePopup = e => {
		console.log("popup被点击了啊");
		console.log(e.clientX, e.clientY, e.screenX);
	};

	render() {
		const buttons = [
			<Button key="1">button1</Button>,
			<Button key="2">button2</Button>
		];

		const tabs = [<Button key="1">假装这是导航栏</Button>];

		return (
			<CenterLayout style={{ position: "relative" }}>
				<Button handler={() => Toast.show("Toast 提示,3秒后消失")}>toast</Button>
				<Button
					ref={c => (this.c = c)}
					handler={this.handler}
					hgap={20}
					vgap={10}
				>
					{this.state.direction}
				</Button>
				<Popup
					className="demo-border"
					ref={p => (this.popup = p)}
					target={() => findDOMNode(this.c)}
					direction={this.state.direction}
					isVisiable={this.state.showPopup}
					buttons={buttons}
					tabs={tabs}
					onClick={this.handlePopup}
				>
					<CenterLayout ref="container" width={50} height={50}>
						{this.state.direction}
					</CenterLayout>
				</Popup>
			</CenterLayout>
		);
	}
}
