import { TeamOutlined } from "@ant-design/icons";
import { Drawer, List } from "antd";
import { FC, useEffect, useState } from "react";
import styles from "./list.module.scss";
import { selOrgUser } from "./api/org";

const uItem = (tit: string, cont: string) => {
  if (!cont) return;
  return (
    <List.Item>
      <div className={styles.uItem}>
        <span>
          <b>{tit}:</b>
        </span>
        <span>{cont}</span>
      </div>
    </List.Item>
  );
};

const Der: FC<{ onClose: () => void; open: boolean; org: any }> = ({
  open,
  onClose,
  org,
}) => {
  const [useList, setUserList] = useState([]);

  useEffect(() => {
    if (!org) return;
    selOrgUser({ org_id: org.id }).then((res) => {
      if (res.code == 1) {
        setUserList(res.data);
      }
    });
  }, [org]);
  return (
    <Drawer
      closable={false}
      onClose={onClose}
      open={open}
      getContainer={false}
    >
      <List
        header={<h3>组织信息</h3>}
        bordered
      >
        {uItem("组织ID", org && org.id)}
        {uItem("组织名称", org && org.name)}
        {uItem("组织类型", org && org.type)}
        {uItem("组织介绍", org && org.introduce)}
        {uItem("创建者", org && org.leader_name)}
        {uItem("联系电话", org && org.leader_phone)}
      </List>
      <List
        header={<h3>用户列表</h3>}
        bordered
        dataSource={useList}
        style={{ marginTop: 20 }}
        renderItem={(item: any) => <List.Item>{item.name}</List.Item>}
      />
    </Drawer>
  );
};

export default Der;
