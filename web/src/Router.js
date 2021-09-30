import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import TaskInfo from "./pages/TaskInfo";
import { Row, Col } from "antd";
import MyMenu from "./components/MyMenu";

const SubRoute = () => {
  return (
    <Row>
      <Col
        xs={{ span: 22, offset: 1 }}
        xl={{ span: 22, offset: 1 }}
        xxl={{ span: 18, offset: 3 }}
      >
        <MyMenu />
        {/* <Route exact path="/" component={Charts} /> */}
        <Route exact path="/" component={TaskInfo} />
      </Col>
    </Row>
  );
};

const BasicRoute = props => (
  <HashRouter>
    <Switch>
      <Route path="/" component={SubRoute} />
    </Switch>
  </HashRouter>
);

export default BasicRoute;
