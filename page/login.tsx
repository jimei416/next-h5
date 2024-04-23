"use client";
import { Form, Input, Button, Checkbox, FormInstance, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { userLogin, userRegister } from "./api/login";

import styles from "./index.module.scss";
import { FC, useEffect, useState } from "react";
import { NoticeType } from "antd/es/message/interface";
import { useRouter } from "next/navigation";

type logState = "login" | "register";
export interface user {
  name: string;
  phone?: string;
  password: string;
}

const Log: FC<{
  form: FormInstance<user>;
  onFinish: (values: any) => void;
  chageState: (logState: logState) => void;
}> = ({ form, onFinish, chageState }) => {
  return (
    <>
      <h1>立刻登录</h1>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登录
          </Button>
          <Button
            className={styles.but}
            onClick={() => chageState("register")}
          >
            立刻注册
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

const Res: FC<{
  form: FormInstance<user>;
  onFinish: (values: any) => void;
  chageState: (logState: logState) => void;
}> = ({ form, onFinish, chageState }) => {
  return (
    <>
      <h1>立刻注册</h1>

      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="name"
          label="用户名"
          rules={[{ required: true, message: "请输入用户名！" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: "请输入密码！",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="确认密码"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "请输入密码！",
            },
            ({ getFieldValue }) => ({
              validator(_: any, value: any) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("您输入的新密码不匹配！"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="电话号码"
          name="phone"
          rules={[
            { required: true, message: "请输入手机号！" },
            {
              pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
              message: "请输入正确的手机号!",
            },
          ]}
        >
          <Input placeholder="phone" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            注册
          </Button>
          <Button
            className={styles.but}
            onClick={() => chageState("login")}
          >
            立刻登录
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

const Login: FC<{ setFlag: () => void }> = ({ setFlag }) => {
  const [form] = Form.useForm<user>();
  const [state, setState] = useState<logState>("login");
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: user) => {
    if (state === "register") {
      const res = await userRegister(values);
      messageApi.open({
        type: res.type as NoticeType,
        content: res.message,
      });
      if (res.code) {
        setState("login");
      }
    } else {
      const res = await userLogin(values);
      if (res.data) {
        localStorage.setItem("token", `Bearer ${res.data.token}`);
        document.cookie = `token=Bearer ${res.data.token}`;
      }
      message.info({
        type: res.type as NoticeType,
        content: res.message,
      });
      if (res.type == "success") {
        setFlag();
      }
    }
  };

  const chageState = (logState: logState) => {
    setState(logState);
  };

  return (
    <>
      {contextHolder}
      <div className={styles.form}>
        {state === "login" ? (
          <Log
            form={form}
            onFinish={onFinish}
            chageState={chageState}
          />
        ) : (
          <Res
            form={form}
            onFinish={onFinish}
            chageState={chageState}
          />
        )}
      </div>
    </>
  );
};

export default Login;
