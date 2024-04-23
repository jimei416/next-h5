import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
  PlusOutlined,
  BellOutlined,
  MinusCircleOutlined,
  CheckOutlined,
  FormOutlined,
  AlignRightOutlined,
} from "@ant-design/icons";
import {
  Card,
  Skeleton,
  Avatar,
  FloatButton,
  Form,
  Input,
  Modal,
  DatePicker,
  Button,
  Select,
  Drawer,
} from "antd";
import Meta from "antd/es/card/Meta";
import { FC, useEffect, useState } from "react";
import { getMes, notify, postMes, postTab, tianMess } from "./api/info";
import { selectCount } from "@/lib/features/store";
import dayjs from "dayjs";
import { useAppSelector } from "@/lib/hooks";
import styles from "./list.module.scss";
import Dynamic from "./change";
import moment from "moment";
import { queryOrg } from "./api/org";
import Der from "./orgUser";
import Manage from "./Manage";
import His from "./his";

const { RangePicker } = DatePicker;

const Message: FC<{
  isModalOpen: boolean;
  handleCancel: () => void;
  org_id: string;
  setFl: () => void;
}> = ({ isModalOpen, handleCancel, org_id, setFl }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.submit();
  };
  const onFinish = async (val: any) => {
    // const cteated_at = dayjs(val.RangePicker[0]).valueOf();
    // const deadline_at = dayjs(val.RangePicker[1]).valueOf();
    const cteated_at = dayjs(val.RangePicker[0]).format("YYYY-MM-DD HH:mm");
    const deadline_at = dayjs(val.RangePicker[1]).format("YYYY-MM-DD HH:mm");
    const res = await postMes({
      ...val,
      cteated_at,
      deadline_at,
      org_id,
    });
    if (res) {
      handleCancel();
      setFl();
    }
  };
  return (
    <Modal
      destroyOnClose
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      title="发布通知"
    >
      <Form
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        form={form}
        initialValues={{ remember: true }}
        autoComplete="off"
        preserve={false}
        className={styles.form}
      >
        <Form.Item
          style={{ maxWidth: 400, marginTop: 10 }}
          label="标题"
          name="title"
          rules={[{ required: true, message: "请输入标题!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="内容"
          name="content"
          rules={[{ required: true, message: "请输入内容!" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="时间范围"
          name="RangePicker"
          rules={[{ required: true, message: "请选择时间范围" }]}
        >
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const Tab: FC<{
  isModalOpen: boolean;
  handleCancel: () => void;
  setFl: () => void;
  org_id: string;
}> = ({ isModalOpen, handleCancel, org_id, setFl }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.submit();
  };
  const onFinish = async (val: any) => {
    const cteated_at = dayjs(val.RangePicker[0]).format("YYYY-MM-DD HH:mm");
    const deadline_at = dayjs(val.RangePicker[1]).format("YYYY-MM-DD HH:mm");
    const da = {
      ...val,
      cteated_at,
      deadline_at,
      org_id: org_id,
    };
    const res = await postTab(da);
    if (res) {
      handleCancel();
      setFl();
    }
  };

  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      title="发布表格"
      destroyOnClose
    >
      <Form
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        form={form}
        className={styles.form}
        initialValues={{ remember: true }}
        autoComplete="off"
        preserve={false}
      >
        <Form.Item
          style={{ maxWidth: 400, marginTop: 10 }}
          label="标题"
          name="title"
          rules={[{ required: true, message: "请输入标题!" }]}
        >
          <Input />
        </Form.Item>
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div
                  key={key}
                  className={styles.space}
                >
                  <Form.Item
                    name={[name, "type"]}
                    {...restField}
                    rules={[{ required: true }]}
                  >
                    <Select
                      placeholder="请选择"
                      allowClear
                    >
                      <Select.Option value="2">单 选</Select.Option>
                      <Select.Option value="3">多 选</Select.Option>
                      <Select.Option value="4">输入框</Select.Option>
                      <Select.Option value="5">上 传</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "content"]}
                    rules={[{ required: true, message: "填写标题" }]}
                  >
                    <Input placeholder="请输入标题" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "arr"]}
                  >
                    <Input placeholder="单选多选请用,分割选项" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </div>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  style={{ marginTop: 10 }}
                  icon={<PlusOutlined />}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item
          label="时间范围"
          name="RangePicker"
          rules={[{ required: true, message: "请选择时间范围!" }]}
        >
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const OrgCard: FC<{ item: any; setFl: () => void }> = ({ item, setFl }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const handleOk = () => {
    console.log({ sur_id: item[0].sur_id, que_id: item[0].id, content: 1 });
    tianMess({ sur_id: item[0].sur_id, que_id: item[0].id, content: 1 }).then(
      (res) => {
        if (res.code == 1) {
          setIsModalOpen(false);
          setFl();
        }
      }
    );
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const getTime = () => {
    return moment(item[0].deadline_at).format("YYYY-MM-DD HH:mm");
  };

  return (
    <>
      <Card
        style={{ marginTop: 16 }}
        actions={
          item[0].type == 1
            ? [<CheckOutlined onClick={() => setIsModalOpen(true)} />]
            : [
                <EditOutlined
                  key="edit"
                  onClick={() => setOpen(true)}
                />,
              ]
        }
      >
        <Skeleton
          loading={false}
          avatar
          active
        >
          <Meta
            avatar={
              item[0].type == 1 ? (
                <BellOutlined style={{ fontSize: 20 }} />
              ) : (
                <FormOutlined style={{ fontSize: 20 }} />
              )
            }
            title={item[0].title}
            description={
              item[0].type == 1 ? item[0].content : "截止时间：" + getTime()
            }
          />
        </Skeleton>
      </Card>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>确认接收消息？</p>
      </Modal>
      <Dynamic
        isOpen={isOpen}
        setOpen={setOpen}
        item={item}
        setFl={setFl}
      />
    </>
  );
};

const List: FC<{ val: string }> = ({ val }) => {
  const [flag, setFlag] = useState(false);
  const [isMesOpen, setMesOpen] = useState(false);
  const [isManageOpen, setManageOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [hisOpen, setHisOpen] = useState(false);
  const [mesList, setMesList] = useState<any[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [fl, setFl] = useState(0);
  const [org, setOrg] = useState<any>();

  const chang = () => {
    setFl((prv) => ++prv);
  };

  useEffect(() => {
    queryOrg({ id: val, name: "org" }).then((res) => {
      if (res.code === 1) {
        console.log(res.data);
        setOrg(res.data[0]);
      }
    });
  }, [val]);

  useEffect(() => {
    if (val) {
      notify({ org_id: val }).then((res) => {
        if (res.code === 1) {
          setFlag(true);
        } else {
          setFlag(false);
        }
      });
      getMes({ org_id: val }).then((res) => {
        if (res.code === 1) {
          setMesList(res.data);
        } else {
          setMesList([]);
        }
      });
    }
  }, [val, fl]);

  const onClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <div className={styles.head}>
        <h3 onClick={() => setOpen(true)}>{org && org.name}</h3>

        <div>
          <AlignRightOutlined
            onClick={() => setHisOpen(true)}
            style={{ fontSize: 20 }}
          />
        </div>
      </div>
      {mesList.map((item) => {
        return (
          <OrgCard
            item={item}
            setFl={chang}
          />
        );
      })}

      {flag && (
        <FloatButton.Group
          shape="square"
          style={{ bottom: 100 }}
        >
          <FloatButton
            icon={<PlusOutlined />}
            description="通知"
            onClick={() => {
              setMesOpen(true);
            }}
          />
          <FloatButton
            icon={<PlusOutlined />}
            description="表单"
            onClick={() => {
              setModalOpen(true);
            }}
          />

          <FloatButton
            description="管理"
            onClick={() => setManageOpen(true)}
          />
        </FloatButton.Group>
      )}
      <His
        onClose={() => setHisOpen(false)}
        open={hisOpen}
        org={org}
        flag={flag}
      ></His>
      <Der
        onClose={onClose}
        open={open}
        org={org}
      />
      <Manage
        isManageOpen={isManageOpen}
        handleManageCancel={() => setManageOpen(false)}
        org_id={val}
      />
      <Message
        isModalOpen={isMesOpen}
        handleCancel={() => setMesOpen(false)}
        org_id={val}
        setFl={chang}
      />
      <Tab
        isModalOpen={isModalOpen}
        handleCancel={() => {
          setModalOpen(false);
        }}
        org_id={val}
        setFl={chang}
      />
    </div>
  );
};

export default List;
