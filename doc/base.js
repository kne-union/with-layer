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
