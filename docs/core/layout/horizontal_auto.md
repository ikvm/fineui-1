# bi.horizontal_auto

#### 水平方向居中自适应容器

{% method %}
[source](https://jsfiddle.net/fineui/ej2j8umg/)

{% common %}
```javascript

BI.createWidget({
    type: "bi.horizontal_auto",
    element: "#wrapper",
    vgap: 10,
    items: [{
        type: "bi.label",
        text: "Horizontal Auto左右自适应",
        cls: "layout-bg1",
        width: 300,
        height: 30
    }, {
        type: "bi.label",
        text: "Horizontal Auto左右自适应",
        cls: "layout-bg2",
        width: 300,
        height: 30
    }]
})


```

{% endmethod %}


## API
##### 基础属性
| 参数    | 说明                           | 类型       | 可选值 | 默认值
| :------ |:-------------                  | :-----     | :----|:----
| hgap    | 效果相当于容器左右padding值    |    number  | — |  0  |
| vgap    | 效果相当于容器上下padding值    |    number  | — |  0  |
| lgap    | 效果相当于容器left-padding值   |    number  | — |  0  |
| rgap    | 效果相当于容器right-padding值  |    number  | — |  0  |
| tgap    | 效果相当于容器top-padding值    |    number  | — |  0  |
| bgap    | 效果相当于容器bottom-padding值 |    number  | — |  0  |



---