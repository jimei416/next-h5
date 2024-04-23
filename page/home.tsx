import { List, Avatar, Typography, Divider } from "antd";
import Search, { SearchProps } from "antd/es/input/Search";
import { FC, useEffect, useState } from "react";
import { getUserOrg, queryUserOrg } from "./api/org";
import { getUser } from "./api/login";

const ColorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae", "#fcebeb"];

const getColor = (val: string) => {
  if (val == "学校") {
    return ColorList[0];
  }
  if (val == "同事") {
    return ColorList[1];
  }
  if (val == "亲友") {
    return ColorList[2];
  }
  if (val == "公益") {
    return ColorList[3];
  }
  if (val == "其他") {
    return ColorList[4];
  }
};

const Home: FC<{ val: string; setVal: (val: string) => void }> = ({
  val,
  setVal,
}) => {
  const [data, setData] = useState<[]>();
  const [user, setUser] = useState<string>();

  useEffect(() => {
    getUser().then((res) => {
      if (res.code == 1) {
        setUser(res.data.id);
      } else {
        setUser("");
      }
    });
  }, []);

  const onSearch: SearchProps["onSearch"] = (value) => {
    queryUserOrg({ name: value }).then((res) => {
      if (res.code == 1) {
        setData(res.data);
      }
    });
  };

  useEffect(() => {
    if (val == "Home") {
      getUserOrg().then((res) => {
        if (res.code == 1) {
          setData(res.data);
        }
      });
    }
  }, [val]);

  return (
    <>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item: any, index: any) => (
          <List.Item
            onClick={() => {
              setVal(item.org_id);
            }}
            actions={[
              <span key="list-loadmore-edit">
                {user == item.leader_id && "管理员"}
              </span>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  style={{
                    backgroundColor: getColor(item.type),

                    verticalAlign: "middle",
                  }}
                >
                  {item.type}
                </Avatar>
              }
              title={<span>{item.name}</span>}
              description={item.introduce}
            ></List.Item.Meta>
          </List.Item>
        )}
      />
    </>
  );
};

export default Home;
