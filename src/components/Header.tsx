import React, { useState, useEffect } from "react";
import { Layout } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
const { Header } = Layout;

export default function Head(props) {
  const {propCollapsed, onToggleMenu} = props
  const toggleIcon = () => {
    onToggleMenu(!propCollapsed)
  }

  return (
    <Header style={{background: '#0099ff', color: '#fff', padding: '0 16px'}}>
      {React.createElement(propCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: toggleIcon,
      })}
    </Header>
  )
}