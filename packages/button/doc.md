# Button 按钮

### 介绍

按钮用于触发一个操作，如提交表单。

### 安装

```js
import { createApp } from 'vue'
import { Button } from '@wm/cq-shop-components'

const app = createApp()
app.use(Button)
```

### 按钮类型

按钮支持 `default`、`primary`、`info`、`warning`、`danger`、`success` 六种类型，默认为 `default`。

> demo: button type basic

### 朴素按钮

通过 `plain` 属性将按钮设置为朴素按钮，朴素按钮的文字为按钮颜色，背景为白色。

> demo: button plain basic

### 禁用状态

通过 `disabled` 属性来禁用按钮，禁用状态下按钮不可点击。

> demo: button disabled basic

### 按钮形状

通过 `shape` 属性设置按钮形状，支持圆形、方形按钮，默认为圆形。

> demo: button shape basic

### 加载状态

> demo: button loading basic

### 图标按钮

> demo: button icon basic

### 按钮尺寸

支持 `large`、`normal`、`small`、`mini` 四种尺寸，默认为 `normal`。

> demo: button size basic

### 块级元素

按钮在默认情况下为行内块级元素，通过 `block` 属性可以将按钮的元素类型设置为块级元素，常用来实现通栏按钮。

> demo: button block basic

### 自定义颜色

通过 color 属性可以自定义按钮的颜色。

> demo: button color basic

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 类型，可选值为 `primary` `info` `warning` `danger` `success` `default` | string | `default` |
| form-type`4.0.7` | 表单类型，可选值 `button` `submit` `reset` | string | `button` |
| size | 尺寸，可选值为 `large` `small` `mini` `normal` | string | `normal` |
| shape | 形状，可选值为 `square` `round` | string | `round` |
| color | 按钮颜色，支持传入 `linear-gradient` 渐变色 | string | - |
| plain | 是否为朴素按钮 | boolean | `false` |
| disabled | 是否禁用按钮 | boolean | `false` |
| block | 是否为块级元素 | boolean | `false` |
| loading | 按钮 `loading` 状态 | boolean | `false` |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 按钮内容 |
| icon | 按钮图标 |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击按钮时触发 | `event: MouseEvent` |

### 类型定义 v4.3.0

组件导出以下类型定义：

```js
import type {
  ButtonType,
  ButtonSize,
  ButtonShape,
  ButtonFormType,
  ButtonProps,
  ButtonInstance
} from '@wm/cq-shop-components';
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](#/zh-CN/component/configprovider)。

| 名称 | 默认值 |
| --- | --- |
| --cq-button-border-radius | _25px_ |
| --cq-button-border-width | _1px_ |
| --cq-button-icon-width | _16px_ |
| --cq-button-default-bg-color | _var(--cq-white)_ |
| --cq-button-default-border-color | _rgba(204, 204, 204, 1)_ |
| --cq-button-default-color | _rgba(102, 102, 102, 1)_ |
| --cq-button-default-padding | _0 18px_ |
| --cq-button-mini-padding | _0 12px_ |
| --cq-button-small-padding | _0 12px_ |
| --cq-button-small-height | _28px_ |
| --cq-button-mini-height | _24px_ |
| --cq-button-default-height | _38px_ |
| --cq-button-large-height | _48px_ |
| --cq-button-large-line-height | _46px_ |
| --cq-button-small-line-height | _26px_ |
| --cq-button-block-height | _48px_ |
| --cq-button-default-line-height | _36px_ |
| --cq-button-block-line-height | _46px_ |
| --cq-button-default-font-size | _var(--cq-font-size-2)_ |
| --cq-button-large-font-size | _var(--cq-button-default-font-size)_ |
| --cq-button-small-font-size | _var(--cq-font-size-1)_ |
| --cq-button-mini-font-size | _var(--cq-font-size-1)_ |
| --cq-button-mini-line-height | _1.2_ |
| --cq-button-disabled-opacity | _0.68_ |
| --cq-button-primary-color | _var(--cq-white)_ |
| --cq-button-primary-border-color | _var(--cq-primary-color)_ |
| --cq-button-primary-background-color | _linear-gradient(135deg,var(--cq-primary-color) 0%,var(--cq-primary-color-end) 100%)_ |
| --cq-button-info-color | _var(--cq-white)_ |
| --cq-button-info-border-color | _rgba(73, 106, 242, 1)_ |
| --cq-button-info-background-color | _linear-gradient(315deg, rgba(73, 143, 242, 1) 0%, rgba(73, 101, 242, 1) 100%)_ |
| --cq-button-success-color | _var(--cq-white)_ |
| --cq-button-success-border-color | _rgba(38, 191, 38, 1)_ |
| --cq-button-success-background-color | _linear-gradient(135deg,rgba(38, 191, 38, 1) 0%,rgba(39, 197, 48, 1) 45%,rgba(40, 207, 63, 1) 83%,rgba(41, 212, 70, 1) 100%)_ |
| --cq-button-danger-color | _var(--cq-white)_ |
| --cq-button-danger-border-color | _rgba(250, 44, 25, 1)_ |
| --cq-button-danger-background-color | _rgba(250, 44, 25, 1)_ |
| --cq-button-warning-color | _var(--cq-white)_ |
| --cq-button-warning-border-color | _rgba(255, 158, 13, 1)_ |
| --cq-button-warning-background-color | _linear-gradient(135deg,rgba(255, 158, 13, 1) 0%,rgba(255, 167, 13, 1) 45%,rgba(255, 182, 13, 1) 83%,rgba(255, 190, 13, 1) 100%)_ |
| --cq-button-plain-background-color | _var(--cq-white)_ |
| --cq-button-small-round-border-radius | _var(--cq-button-border-radius)_ |
