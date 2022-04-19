import { withRouter } from "react-router-dom";
import React from "react";

function NoMatch(props) {
  return (
    <>
      <h3 className="error">
        No match for 
        {/* <code>{props.location.pathname}</code> */}
      </h3>
    </>
  );
}

export default withRouter(NoMatch);
