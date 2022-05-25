import { FC, useState, useEffect } from 'react';
import { Outlet, Link, useRoutes, useParams } from "react-router-dom";
import _ from "lodash";
import logo from "public/static/images/logo.svg";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  LineChartOutlined,
  FormOutlined,
  TableOutlined,
  PictureOutlined,
  DragOutlined,
  InteractionOutlined,
  // BarChartOutlined,
  // ShopOutlined,
  // TeamOutlined,
  // UserOutlined,
  // UploadOutlined,
  // VideoCameraOutlined,
} from "@ant-design/icons";

import type { MenuProps } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[], type?: 'group'): MenuItem {
  // link: string,
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

function mapPathFn(menus: Array<any>) {
  return menus.map(menu => {
    if (menu.children) {
      return mapPathFn(menu.children)
    } else {
      return menu.key;
    }
  });
}

const MenusList: MenuItem[] = [
  getItem('首页概览', '/views/home', <AppstoreOutlined />),
  getItem('Echart图表', '/views/charts', <LineChartOutlined />, [
    getItem('通用图表', '/views/charts/index'),
    getItem('D3图表', '/views/charts/d3charts'),
  ]),
  getItem('表单展示', '/views/forms', <FormOutlined />),
  getItem('表格展示', '/views/tables', <TableOutlined />),
  getItem('拖拽组件', '/views/dndpage', <DragOutlined />),
  getItem('设计模式', '/views/designmodes', <InteractionOutlined />, [
    getItem('单例模式', '/views/designmodes/index'),
    getItem('策略模式', '/views/designmodes/strategy'),
    getItem('代理模式', '/views/designmodes/proxymode'),
    getItem('发布订阅模式', '/views/designmodes/pubsubscribe'),
    getItem('适配器模式', '/views/designmodes/adaptermode'),
    // getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
  ]),
  getItem('图片展示', '/views/pictures', <PictureOutlined />),
];

// // 创建类型接口
// export interface MenuProps {
//   menuLinks: Array<any>, // Array<{ type: any; title: string, path: string, children: any[] }>,
//   menuPath: Array<any>,
//   // onIncrement: () => void,
// }

// 使用接口代替 PropTypes 进行类型校验
const NavMenu: FC<any> = (props) => {
  const { location: any, history: any } = props;
  const [selKeys, setSelKeys] = useState([]);

  const menuLinks: any[] = mapPathFn(MenusList);

  console.log("NavMenu:", props);

  const linkTo = link => {
    console.log("linkTo:", link.key, props);
    history.replace(link.key);
  };

  useEffect(() => {
      // if (prevProps.location.pathname !== props.location.pathname) {
      // }
      for (let mpath of _.flatten(menuLinks)) {
        if (location.pathname.indexOf(mpath) > -1) {
          setSelKeys([mpath])
        }
      }

      return () => {}
  }, [props]);

  return (
    <>
      <div className="head-logo">
        <img src={logo} alt="logo"/>
        <div className="title">React App PC</div>
      </div>
      {/* defaultOpenKeys={['sub1']} */}
      {/* inlineCollapsed={collapsed} */}
      <Menu
        mode="inline"
        theme="dark"
        defaultSelectedKeys={["/views/home"]}
        selectedKeys={selKeys}
        items={MenusList}
        onClick={linkTo}
      />
        {/* {MenusList}
      </Menu> */}
    </>
  );
};

export default NavMenu;
