import {
  BarsOutlined,
  HomeOutlined,
  PlusOutlined,
  SendOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { FC, useEffect, useState } from "react";
import styles from "./index.module.scss";
import { Avatar } from "antd";
import { getUser } from "./api/login";
import Home from "./home";
import List from "./List";
import useModel from "@/lib/useModel";
import counterStore from "@/lib/counter";
import Crea from "./crea";

const Bot: FC<{ val: string; setVal: (str: string) => void }> = ({
  val,
  setVal,
}) => {
  return (
    <BottomNavigation
      className={styles.bot}
      showLabels
      value={val}
      onChange={(event, newValue) => {
        setVal(newValue);
      }}
    >
      <BottomNavigationAction
        label="Home"
        value="Home"
        icon={<HomeOutlined style={{ fontSize: 20 }} />}
      />
      <BottomNavigationAction
        value="Plus"
        icon={<PlusOutlined style={{ fontSize: 30 }} />}
      />
      <BottomNavigationAction
        value="Setting"
        label="Setting"
        icon={<SettingOutlined style={{ fontSize: 20 }} />}
      />
    </BottomNavigation>
  );
};

const Head: FC = () => {
  const [user, setUser] = useState<string>();

  useEffect(() => {
    getUser().then((res) => {
      if (res.code == 1) {
        setUser(res.data.name);
      } else {
        setUser("djj");
      }
    });
  }, []);
  return (
    <div className={styles.top}>
      <Avatar>{user}</Avatar>
      <div>
        <SendOutlined />
      </div>
    </div>
  );
};

const Org: FC = () => {
  const [val, setVal] = useState("Home");

  const getcontent = () => {
    if (val == "Home") {
      return (
        <Home
          val={val}
          setVal={setVal}
        />
      );
    } else if (val == "Plus") {
      return (
        <Crea
        // val={val}
        // setVal={setVal}
        />
      );
    } else if (val == "Setting") {
      return (
        <Home
          val={val}
          setVal={setVal}
        />
      );
    } else {
      return <List val={val} />;
    }
  };
  return (
    <div className={styles.page}>
      <Head />
      <div className={styles.content}>{getcontent()}</div>
      <Bot
        val={val}
        setVal={setVal}
      />
    </div>
  );
};

export default Org;
