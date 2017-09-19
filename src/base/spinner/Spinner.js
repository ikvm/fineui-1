/**
 * Created by Dailer on 2017/8/10.
 * 微调器,时间微调器和数值微调器都根据这个来搞定
 */
import React, { Component } from "react";
import cn from "classnames";
import { HtapeLayout, VerticalLayout, VtapeLayout } from "../../core/layout";
import emptyFunction from "fbjs/lib/emptyFunction";
import Input from "../single/input";
import Button from "../single/button";
import IconButton from "../single/iconbutton";
import parseInt from "lodash/parseInt";
import round from "lodash/round";
import add from "lodash/add";

const CLASS_NAME = "fct-spinner";

export default class Spinner extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			originalValue: this.props.value,
			value: this.props.value
		};
	}

	static defaultProps = {
		value: 1, //初始值
		min: null,
		max: null,
		increment: 1, //增量
		editable: true, //是否可以直接输入
		spin: emptyFunction, //点击微调按钮时触发的回调
		onSpinUp: emptyFunction,
		onSpinDown: emptyFunction,
		formater: null, //格式化方法
		parser: null //解析格式化的内容,如果没有parser的话那 editable为 false
	};

	calculatePrecision = n => {
		this.precision = n
			.toString()
			.split(".")
			.pop().length;
	};

	handleBtnUp = () => {
		const { spin, onSpinUp, increment } = this.props;
		this.doSpin(1);
		spin("up");
		onSpinUp();
	};
	handleBtnDown = () => {
		const { spin, onSpinDown } = this.props;
		this.doSpin(-1);
		spin("down");
		onSpinDown();
	};

	handleInputChange = v => {
		console.log("v", v);
		const { formater, parser } = this.props;
		let { originalValue, value } = this.state;

		if (parser && formater) {
			originalValue = parser(v);
			value = formater(originalValue);
		}

		if (this.props.editable) {
			this.setState({
				originalValue: round(originalValue, this.precision),
				value: value
			});
		}
	};

	//要保证原始值始终为 number 类型,value 始终为 string
	doSpin = direction => {
		const { formater, increment } = this.props;
		let { originalValue, value } = this.state;

		originalValue = parseFloat(
			add(originalValue, direction * increment)
		).toFixed(this.precision);

		if (formater) {
			value = formater(originalValue);
		} else {
			value = originalValue.toString();
		}
		this.setState((preState, props) => {
			return {
				originalValue: Number(originalValue),
				value: value
			};
		});
	};

	componentDidMount() {
		this.calculatePrecision(this.props.increment);
		this.doSpin(0);
	}

	componentDidupdate(prevProps, prevState) {}

	render() {
		const {
			className,
			value,
			min,
			max,
			increment,
			editable,
			spin,
			formater,
			onSpinUp,
			onSpinDown,
			parser,
			...props
		} = this.props;

		return (
			<HtapeLayout className={cn(className, CLASS_NAME)} {...props}>
				<HtapeLayout.Item>
					<Input
						value={this.state.value}
						onChange={this.handleInputChange}
						disabled={!editable || parser == null}
					/>
				</HtapeLayout.Item>
				<HtapeLayout.Item width={25}>
					<VtapeLayout>
						<VtapeLayout.Item>
							<Button block={true} handler={this.handleBtnUp}>
								⬆︎
							</Button>
						</VtapeLayout.Item>
						<VtapeLayout.Item>
							<Button block={true} handler={this.handleBtnDown}>
								⬇︎
							</Button>
						</VtapeLayout.Item>
					</VtapeLayout>
				</HtapeLayout.Item>
			</HtapeLayout>
		);
	}
}
