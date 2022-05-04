import React, { PureComponent } from "react";
import { Outlet, Link, useRoutes, useParams } from "react-router-dom";
import _ from "lodash";
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

import logo from "public/static/images/logo.svg";

const { SubMenu } = Menu;

class NavMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: []
    };
    this.menuLinks = [
      {
        type: <AppstoreOutlined />,
        title: "首页概览",
        path: "/views/home"
      },
      {
        type: <LineChartOutlined />,
        title: "Echart图表",
        // path: '/echarts',
        children: [
          {
            title: "通用图表",
            path: "/views/charts/index"
          },
          {
            title: "D3图表",
            path: "/views/charts/d3charts"
          }
        ]
      },
      {
        type: <FormOutlined />,
        title: "表单展示",
        path: "/views/forms"
      },
      {
        type: <TableOutlined />,
        title: "表格展示",
        path: "/views/tables"
      },
      {
        type: <DragOutlined />,
        title: "拖拽组件",
        path: "/views/dndpage"
      },
      {
        type: <InteractionOutlined />,
        title: "设计模式",
        children: [
          {
            title: "单例模式",
            path: "/views/designmodes/index"
          },
          {
            title: "策略模式",
            path: "/views/designmodes/strategy"
          },
          {
            title: "代理模式",
            path: "/views/designmodes/proxymode",
          },
          {
            title: "发布订阅模式",
            path: "/views/designmodes/pubsubscribe",
          },
          {
            title: "适配器模式",
            path: "/views/designmodes/adaptermode",
          },
        ]
      },
      {
        type: <PictureOutlined />,
        title: "图片展示",
        path: "/views/pictures"
      },
    ];

    this.menuPath = this.menuLinks.map(menu => {
      if (menu.path) {
        return menu.path;
      } else {
        return menu.children.map(el => el.path);
      }
    });
  }

  componentDidMount() {
    _.flatten(this.menuPath).forEach(mpath => {
      if (this.props.location.pathname.indexOf(mpath) > -1) {
        this.setState({ selectedKeys: [mpath] });
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // const { router } = this.props;
    if (prevProps.location.pathname !== this.props.location.pathname) {
      _.flatten(this.menuPath).forEach(mpath => {
        if (this.props.location.pathname.indexOf(mpath) > -1) {
          this.setState({ selectedKeys: [mpath] });
        }
      });
    }
  }

  linkTo = link => {
    console.log("linkTo:", link.key, this.props);
    this.props.history.replace(link.key);
  };

  render() {
    let MenusList = this.menuLinks.map((el, index) =>
      el.children ? (
        <SubMenu key={"sub" + index + 1} icon={el.type} title={el.title}>
          {el.children.map(echd => (
            <Menu.Item key={echd.path}>{echd.title}</Menu.Item>
          ))}
        </SubMenu>
      ) : (
        <Menu.Item key={el.path} icon={el.type}>
          {el.title}
        </Menu.Item>
      )
    );

    return (
      <>
        <div className="head-logo">
          <img src={logo} alt="logo" type="image/png" />
          <div className="title">React App PC</div>
        </div>

        <Menu
          theme="dark"
          defaultSelectedKeys={["/views/home"]}
          selectedKeys={this.state.selectedKeys}
          onClick={this.linkTo}
          mode="inline"
        >
          {MenusList}
        </Menu>

        {/* <style jsx="true">{`
        `}</style> */}
      </>
    );
  }
}

export default withRouter(NavMenu);
