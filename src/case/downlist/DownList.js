import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import Popup from "../../base/overlays/popup";
import Button from "../../base/single/button";
import { Layout, VerticalLayout } from "../../core/layout";
import DownListPopup from "./DownListPopup";
import Item from "./Item.DownList";
import SubItem from "./SubItem";
import Group from "./group.downlist";

import cn from "classnames";
import isEmpty from "lodash/isEmpty";
import forEach from "lodash/forEach";
import isArray from "lodash/isArray";
import isObject from "lodash/isObject";
import uniqueId from "lodash/uniqueId";

const CLASS_NAME = "bi-downlist";

export default class DownList extends Component {
	constructor(props, context) {
		super(props, context);
	}

	static defaultProps = {
		items: []
	};

	initList = (el, children) => {};

	_creatDownListByItems = items => {
		let listArr = [];
		forEach(items, value => {
			if (isArray(value)) {
				//如果是数组的话,就用 <Group/> 包一层然后继续递归
				listArr.push(
					<Group key={uniqueId()}>{this._creatDownListByItems(value)}</Group>
				);
			} else if (isObject(value)) {
				//如果是 Object 的话,判断一下有没有 children
				if (value.children) {
					//有 children 的话用 <SubItem/> 包起来,继续递归儿子
					listArr.push(
						<SubItem key={uniqueId()} title={value.text}>
							{this._creatDownListByItems(value.children)}
						</SubItem>
					);
				} else {
					//没有 children 的话就直接扔一个 <Item/> 进去
					listArr.push(<Item key={uniqueId()}>{value.text}</Item>);
				}
			}
		});
		return listArr;
	};

	render() {
		const { className, children, target, items, show, ...props } = this.props;

		return (
			<Popup target={target} direction="bottom,left" isVisiable={show}>
				<VerticalLayout className={cn(CLASS_NAME, className)}>
					{isEmpty(items) ? children : this._creatDownListByItems(items)}
				</VerticalLayout>
			</Popup>
		);
	}
}

DownList.Item = Item;
DownList.SubItem = SubItem;
DownList.Group = Group;
