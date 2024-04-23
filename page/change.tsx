import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Upload,
} from "antd";
import { FC } from "react";
import { tianTab } from "./api/info";

{
  /* <Select.Option value="2">单 选</Select.Option>
<Select.Option value="3">多 选</Select.Option>
<Select.Option value="4">输入框</Select.Option>
<Select.Option value="5">上 传</Select.Option> */
}

const FormItem: FC<{ it: any }> = ({ it }) => {
  const getItem = () => {
    if (it.type == 4) {
      return <Input />;
    }
    if (it.type == 2) {
      return (
        <Radio.Group>
          {it.arr.split(",").map((item: any) => {
            return <Radio value={item}>{item}</Radio>;
          })}
        </Radio.Group>
      );
    }
    if (it.type == 3) {
      return (
        <Checkbox.Group>
          {it.arr.split(",").map((item: any) => {
            return <Checkbox value={item}>{item}</Checkbox>;
          })}
        </Checkbox.Group>
      );
    }
    if (it.type == 5) {
      return (
        <Upload.Dragger
          action="http://localhost:4416/upload"
          onChange={(val) => {
            console.log(val);
          }}
          headers={
            {
              // authorization: "authorization-text",
              // "Content-Type": "multipart/form-data",
            }
          }
        ></Upload.Dragger>
      );
    }
  };
  return (
    <Form.Item
      label={it.content}
      name={it.id}
      rules={[{ required: true, message: "请填写" }]}
      normalize={(val) => {
        if (it.type != 5) {
          console.log(it.type);
        } else {
          return val.fileList.map((item: any) => {
            return item.name;
          });
        }
      }}
    >
      {getItem()}
    </Form.Item>
  );
};

const Dynamic: FC<{
  isOpen: boolean;
  setOpen: (fl: boolean) => void;
  item: any;
  setFl: () => void;
}> = ({ isOpen, setOpen, item, setFl }) => {
  console.log(item);
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log(values.forEac);

    const data = {
      sur_id: item[0].sur_id,
      content: Array.isArray(values) ? values.toString() : values,
    };
    tianTab(data).then((res) => {
      if (res.code == 1) {
        setOpen(false);
        setFl();
      }
    });
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      title={item[0].title}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      centered
      destroyOnClose
    >
      <Form
        form={form}
        onFinish={onFinish}
        autoComplete="off"
      >
        {item.map((val: any) => {
          return (
            <FormItem
              it={val}
              key={val.id}
            />
          );
        })}
      </Form>
    </Modal>
  );
};

export default Dynamic;
