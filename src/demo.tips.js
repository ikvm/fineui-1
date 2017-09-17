import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import Msg from "../lib/base/single/tip/Tip";
import Button from "../lib/base/single/button";
import Label from "../lib/base/single/label";
import {
	CenterLayout,
	VtapeLayout,
	HorizontalAdaptLayout,
	VerticalLayout,
	VerticalCenterLayout,
	RightLayout
} from "../lib/core/layout";
import Popup from "../lib/base/overlays/popup";
import getElementPosition from "fbjs/lib/getElementPosition";
import Bubble from "../lib/base/single/tip/bubble";

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
			showBubble: false,
			direction: directions[0]
		};
	}

	handler1 = () => {
		this.setState({
			showPopup: this.state.direction !== "right,bottom",
			direction:
				directions[
					(directions.indexOf(this.state.direction) + 1) % directions.length
				]
		});
	};

	handler2 = () => {
		this.setState({
			showBubble: !this.state.showBubble
		});
	};

	onConfirm = () => {
		this.setState({
			showBubble: false
		});
	};

	handlePopup = e => {
		console.log("popup被点击了啊");
		console.log(e.clientX, e.clientY, e.screenX);
	};

	render() {
		const tabs = [<Button key="1">假装这是导航栏</Button>];

		return (
			<CenterLayout style={{ position: "relative" }}>
				<VtapeLayout>
					<VtapeLayout.Item>
						{/* toast demo */}
						<Button
							hgap={5}
							height={25}
							handler={() => Msg.toast("Toast 提示,3秒后消失")}
						>
							toast common
						</Button>
						<Button
							hgap={5}
							level="success"
							handler={() => Msg.toast("Toast 提示,3秒后消失", "success")}
						>
							toast success
						</Button>
						<Label width={200} className="layout-bg2" textAlign="left">
							家卡拉蜂
						</Label>
						<Button
							hgap={5}
							level="warning"
							handler={() => Msg.toast("Toast 提示,3秒后消失", "warning")}
						>
							toast warning
						</Button>

						{/* bubble demo */}
						<Button ref={c => (this.c = c)} hgap={5} handler={this.handler2}>
							bubble
						</Button>
						<Bubble
							onConfirm={this.onConfirm}
							target={() => findDOMNode(this.c)}
							content={bubbleExample}
							isVisiable={this.state.showBubble}
						/>

						{/* popup demo */}
						<Button
							ref={c => (this.b = c)}
							handler={this.handler1}
							hgap={20}
							vgap={10}
						>
							{this.state.direction}
						</Button>
						<Popup
							ref={p => (this.popup = p)}
							target={() => findDOMNode(this.b)}
							direction={this.state.direction}
							isVisiable={this.state.showPopup}
							onClick={this.handlePopup}
						>
							<CenterLayout ref="container" width={50} height={50}>
								{this.state.direction}
							</CenterLayout>
						</Popup>
					</VtapeLayout.Item>

					<VtapeLayout.Item />
				</VtapeLayout>
			</CenterLayout>
		);
	}
}

const bubbleExample = (
	<VtapeLayout>
		<VtapeLayout.Item>
			<VerticalLayout>
				<Label>bubble测试 !!</Label>
			</VerticalLayout>
		</VtapeLayout.Item>
	</VtapeLayout>
);
