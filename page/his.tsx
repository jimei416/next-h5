import { Card, Descriptions, Drawer, Modal, Skeleton, Tabs } from "antd";
import Meta from "antd/es/card/Meta";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { down, getAnsPass, getMess } from "./api/info";
import { BellOutlined, FormOutlined } from "@ant-design/icons";

const OrgCard: FC<{ item: any }> = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [surid, setSurid] = useState(0);
  const [data, setData] = useState([]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const getTime = () => {
    return moment(item.deadline_at).format("YYYY-MM-DD HH:mm");
  };
  const getBegTime = () => {
    return moment(item.cteated_at).format("YYYY-MM-DD HH:mm");
  };

  useEffect(() => {
    getAnsPass({ sur_id: surid }).then((res) => {
      if (res.code == 1) {
        console.log(res.data);
        setData(res.data);
      } else {
        setData([]);
      }
    });
  }, [surid]);

  return (
    <>
      <Card
        style={{ marginTop: 16 }}
        onClick={() => {
          if (item.state == 1) return;
          setIsModalOpen(true);
          console.log(item.id);
          setSurid(item.id);
        }}
      >
        <Skeleton
          loading={false}
          avatar
          active
        >
          <Meta
            title={item.title}
            avatar={
              item.state == 1 ? (
                <BellOutlined style={{ fontSize: 20 }} />
              ) : (
                <FormOutlined style={{ fontSize: 20 }} />
              )
            }
            description={
              <>
                <div>{item.state == 1 && item.title}</div>
                <div>{"开始时间：" + getBegTime()}</div>
                <div>{"截止时间：" + getTime()}</div>
              </>
            }
          />
        </Skeleton>
      </Card>
      <Modal
        title="表单信息"
        open={isModalOpen}
        onCancel={handleCancel}
      >
        {data.length > 0 ? (
          <Descriptions
            items={data.map((it: any) => {
              return {
                key: it.id,
                label: it.qcont,
                children:
                  it.type != 5
                    ? it.content
                    : it.content.split(",").map((item: any) => {
                        return (
                          <>
                            <a
                              onClick={() => {
                                down({ filename: item }).then((res: any) => {
                                  window.open(res.url);
                                });
                              }}
                            >
                              {item}
                            </a>
                            &nbsp;
                          </>
                        );
                      }),
              };
            })}
          />
        ) : (
          "未填写"
        )}
      </Modal>
    </>
  );
};

const His: FC<{
  onClose: () => void;
  open: boolean;
  org: any;
  flag: boolean;
}> = ({ open, onClose, org, flag }) => {
  const [useList, setUserList] = useState([]);
  const [key, setKey] = useState("1");
  const [items, setItems] = useState<any>([]);

  useEffect(() => {
    if (flag) {
      setItems([
        {
          key: "1",
          label: "已填写",
        },
        {
          key: "2",
          label: "历史记录",
        },
        {
          key: "3",
          label: "管理",
        },
      ]);
    } else {
      setItems([
        {
          key: "1",
          label: "已填写",
        },
        {
          key: "2",
          label: "历史记录",
        },
      ]);
    }
  }, [flag]);

  const onChange = (key: string) => {
    setKey(key);
  };
  useEffect(() => {
    if (!org) return;
    getMess({ org_id: org.id, state: key }).then((res: any) => {
      if (res.code == 1) {
        setUserList(res.data);
      } else {
        setUserList([]);
      }
    });
  }, [org, key]);
  return (
    <Drawer
      closable={false}
      onClose={onClose}
      open={open}
      getContainer={false}
    >
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
      {useList &&
        useList.map((item: any) => {
          return <OrgCard item={item} />;
        })}
    </Drawer>
  );
};
export default His;
