import React, { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import HistoryNav from "@/router/history";
import { Breadcrumb } from "antd";


const Tables: React.FC<any> = (props) => {
  const linkTo = (link) => {
    // history 的 replace 模式
    HistoryNav(link, { replace: true });
  };

  return (
    <>
      <div className="page-tip-bar">
        <Breadcrumb>
          <Breadcrumb.Item>表格展示</Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => linkTo(('/view/tables'))}>新闻列表</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Outlet/>
    </>
  );
}

export default Tables;
