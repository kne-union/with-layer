
# with-layer


### 安装

```shell
npm i --save @kne/with-layer
```


### 概述

让类似Antd Modal的使用传送门(createPortal)创建的弹窗类的组件可以用函数的方式调用。

* 由于已经脱离原来的上下文(context)，所以弹窗内无法使用弹窗外的context，如果有些全局的context，需要在preset中设置withInstall，它是一个高阶组件
* 也可以在调用withLayer的时候传入withInstall来做context中继，它会后于preset的withInstall执行而不会覆盖


### 示例

#### 示例代码

- 普通的弹窗示例
- 展示一个普通的弹窗示例
- _withLayer(@kne/with-layer),modal(antd/lib/modal),button(antd/lib/button),lodash(lodash)

```jsx
const { default: withLayer } = _withLayer;
const { default: Button } = button;
const { default: Modal } = modal;
const { omit } = lodash;

const createModal = withLayer((props) => {
  const others = omit(props, ["close"]);
  return <Modal {...others}>
    我是一个弹窗<Button onClick={props.close}>关闭</Button>
  </Modal>;
});

const BaseExample = () => {
  return <Button type="primary" onClick={() => {
    const instance = createModal({
      title: "弹窗示例"
    });
  }}>弹出弹窗</Button>;
};

render(<BaseExample />);

```

- context中继
- 展示context中继的方法
- _withLayer(@kne/with-layer),modal(antd/lib/modal),button(antd/lib/button),lodash(lodash)

```jsx
const { default: withLayer } = _withLayer;
const { default: Button } = button;
const { default: Modal } = modal;
const { omit } = lodash;
const { createContext, useContext } = React;

const createModal = withLayer((props) => {
  const others = omit(props, ["close"]);
  const contextValue = useContext(context);
  return <Modal {...others}>
    我是一个弹窗<Button onClick={props.close}>关闭</Button>{JSON.stringify(contextValue)}
  </Modal>;
});

const context = createContext({});

const { Provider } = context;

const InnerComponent = () => {
  const contextValue = useContext(context);
  return <Button type="primary" onClick={() => {
    const instance = createModal({
      title: "弹窗示例",
      withInstall: (WrappedComponents) => (props) => <Provider
        value={contextValue}><WrappedComponents {...props} /></Provider>
    });
  }}>弹出弹窗</Button>;
};

const BaseExample = () => {
  return <Provider value={{test:123}}>
    <InnerComponent />
  </Provider>;
};

render(<BaseExample />);

```


### API

const instance = withLayer(props)

|属性名| 说明                   |类型|默认值|
|  ---  |----------------------| --- | --- |
|withInstall| 一个高阶组件，辅助实现context中继 |function|-|

其他参数参考 [antd Modal](https://ant.design/components/modal-cn/)

