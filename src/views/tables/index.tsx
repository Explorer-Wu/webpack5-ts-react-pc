import React from "react"; // , { useState, useEffect, useRef }
import { Outlet } from "react-router-dom";
import HistoryNav from "@/router/history";
import { Breadcrumb } from "antd";

const Tables: React.FC<any> = (props: any, context?: any) => {
  const linkTo = link => {
    // history 的 replace 模式
    HistoryNav(link, { replace: true });
  };

  return (
    <>
      <div className="page-tip-bar">
        <Breadcrumb>
          <Breadcrumb.Item>表格展示</Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => linkTo("/view/tables")}>信息列表</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Outlet />
    </>
  );
};

export default Tables;
