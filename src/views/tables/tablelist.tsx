import React from "react";
import { Button } from "antd";
// import { RocketOutlined } from "@ant-design/icons";
// import { $Api } from "@/api";
// import { ArticleTablesRule } from "@/components/TablePaginations/UseTablePagingRule";
// import WithTablePagingHOC from "@/components/TablePaginations/WithTablePaging";
// // import PureTablePaging from "@/components/TablePaginations/PureTablePaging";
// import PureTable from "@@components/TablePaginations/PureTable";

export default const TableList = (props) => {
  // const {initPropsData, initStatesVal, getTableDataFn, delArticleFn} = ArticleTablesRule();
//   const ArticleTablePaging = TablePagingHOC(
//     PureTable,
//     getTableDataFn,
//     delArticleFn
//   );
  // const ArticleTablePaging = WithTablePagingHOC(getTableDataFn, delArticleFn)(PureTable)
  return (
    <dl className="page-box">
        <dt>
          <h3 className="page-title">新闻列表</h3>
          <Button type="primary" size="small">
            新增文章
          </Button>
        </dt>
        <dd>
          {/* <ArticleTablePaging
            tablePagProps={initPropsData}
            initStateProps={initStatesVal}
          /> */}
        </dd>
      </dl>
  );
}