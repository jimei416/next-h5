import { List, Modal, Tabs } from "antd";
import { FC, useEffect, useState } from "react";
import { changeApp, delOrgUser, selApp, selOrgUser } from "./api/org";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const Manage: FC<{
  org_id: string;
  isManageOpen: boolean;
  handleManageCancel: () => void;
}> = ({ isManageOpen, handleManageCancel, org_id }) => {
  const handleOk = () => {};
  const [key, setKey] = useState<string>();
  const [userData, setUserData] = useState([]);
  const [fl, setFl] = useState(0);
  const [list, setList] = useState([]);

  const onChange = (key: string) => {
    setKey(key);
  };
  useEffect(() => {
    selApp({ org_id }).then((res) => {
      if (res.code == 1) {
        setUserData(res.data);
      } else {
        setUserData([]);
      }
    });
    selOrgUser({ org_id }).then((res) => {
      if (res.code == 1) {
        setList(res.data);
      } else {
        setList([]);
      }
    });
  }, [org_id, key, fl]);

  useEffect(() => {
    setKey("1");
  }, []);

  const items = [
    {
      key: "1",
      label: "申请",
    },
    {
      key: "2",
      label: "管理",
    },
  ];

  return (
    <Modal
      title="成员管理"
      open={isManageOpen}
      onOk={handleOk}
      onCancel={handleManageCancel}
      destroyOnClose
    >
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
      {key && key == "1" && (
        <List
          size="small"
          header={<h3>申请列表</h3>}
          bordered
          dataSource={userData}
          renderItem={(item: any) => (
            <List.Item
              actions={[
                <CheckOutlined
                  onClick={() => {
                    changeApp({
                      org_id: item.org_id,
                      user_id: item.user_id,
                      fl: true,
                    }).then((res) => {
                      console.log(res);
                      setFl((prev) => prev + 1);
                    });
                  }}
                />,
                <CloseOutlined
                  onClick={() => {
                    changeApp({
                      org_id: item.org_id,
                      user_id: item.user_id,
                      fl: false,
                    }).then((res) => {
                      console.log(res);
                      setFl((prev) => prev + 1);
                    });
                  }}
                />,
              ]}
            >
              {item.name}
            </List.Item>
          )}
        />
      )}
      {key && key == "2" && (
        <List
          size="small"
          header={<h3>成员列表</h3>}
          bordered
          dataSource={list}
          renderItem={(item: any) => (
            <List.Item
              actions={[
                item.purview != 1 && (
                  <DeleteOutlined
                    onClick={() => {
                      delOrgUser({
                        org_id: item.org_id,
                        user_id: item.user_id,
                      }).then((res) => {
                        console.log(res);
                        setFl((prev) => prev + 1);
                      });
                    }}
                  />
                ),
              ]}
            >
              {item.name}
            </List.Item>
          )}
        />
      )}
    </Modal>
  );
};

export default Manage;
