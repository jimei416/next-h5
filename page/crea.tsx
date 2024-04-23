import {
  Button,
  Card,
  Col,
  Form,
  FormInstance,
  Input,
  message,
  Modal,
  Row,
  Select,
  Table,
  TableProps,
} from "antd";
import Meta from "antd/es/card/Meta";
import { FC, useState } from "react";
import styles from "./crea.module.scss";
import { UserAddOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { joinOrg, createOrg, queryOrg } from "./api/org";

const columns: TableProps["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "类型",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "创建者",
    key: "leader_name",
    dataIndex: "leader_name",
  },
  {
    title: "操作",
    key: "action",
    render: (_, record) => (
      <Button
        onClick={() => {
          joinOrg({
            org_id: record.id,
          }).then((res) => {
            if (res.code === 0) {
              message.error(res.message);
            } else {
              message.success(res.message);
            }
          });
        }}
      >
        加入
      </Button>
    ),
  },
];

const OrgForm: FC<{ form: FormInstance<any>; handleCancel: () => void }> = ({
  form,
  handleCancel,
}) => {
  const finsh = (value: { name: string; type: string; introduce: string }) => {
    createOrg(value).then(() => {
      handleCancel();
    });
  };
  return (
    <div className={styles.form}>
      <Form
        form={form}
        name="basic"
        onFinish={finsh}
        autoComplete="off"
        preserve={false}
      >
        <Form.Item
          label="名字"
          name="name"
          rules={[{ required: true, message: "请输入名字" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="类型"
          name="type"
          rules={[{ required: true, message: "请输入类型" }]}
        >
          <Select
            options={[
              { value: "学校", label: "学校" },
              { value: "同事", label: "同事" },
              { value: "亲友", label: "亲友" },
              { value: "公益", label: "公益" },
              { value: "其他", label: "其他" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="介绍"
          name="introduce"
          rules={[{ required: true, message: "请输入介绍" }]}
        >
          <TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
        </Form.Item>
      </Form>
    </div>
  );
};
const JoinOrg = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const finsh = (value: any) => {
    queryOrg(value).then((res) => setData(res.data));
  };
  return (
    <div>
      <Form
        form={form}
        onFinish={finsh}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name={`id`}
              label={`ID`}
              rules={[
                () => ({
                  validator(rule, value) {
                    if (/^\d+$/.test(value)) {
                      return Promise.resolve();
                    } else if (!value) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject("请输入数字id"); //如果违反规则，就会给出提示
                    }
                  },
                }),
              ]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={`name`}
              label={`名称`}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
        <Button
          type="primary"
          htmlType="submit"
          style={{ float: "right" }}
        >
          查找
        </Button>
      </Form>
      <Table
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

const Crea: FC = () => {
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showJoin = () => {
    setIsJoinOpen(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const JoinCancel = () => {
    setIsJoinOpen(false);
  };
  return (
    <div className={styles.crea}>
      <Card
        hoverable
        cover={<UserAddOutlined style={{ fontSize: 50, paddingTop: 20 }} />}
        onClick={showJoin}
      >
        <Meta
          title="加入一个组织"
          description="Join An Organization"
        />
      </Card>
      <Card
        hoverable
        cover={
          <UsergroupAddOutlined style={{ fontSize: 50, paddingTop: 20 }} />
        }
        onClick={showModal}
      >
        <Meta
          title="创建一个组织"
          description="Create An Organization"
        />
      </Card>
      <Modal
        title="加入组织"
        open={isJoinOpen}
        onCancel={JoinCancel}
        destroyOnClose
        footer={null}
      >
        <JoinOrg></JoinOrg>
      </Modal>
      <Modal
        title="创建组织"
        onCancel={handleCancel}
        open={isModalOpen}
        onOk={handleOk}
        destroyOnClose
      >
        <OrgForm
          form={form}
          handleCancel={handleCancel}
        />
      </Modal>
    </div>
  );
};

export default Crea;
