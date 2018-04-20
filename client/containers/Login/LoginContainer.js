import React, { PureComponent as Component } from 'react';
import Login from './LoginWrap';
import { Row, Col, Card } from 'antd';

class LoginContainer extends Component {
  render() {
    return (
      <div className="g-body login-body">
        <div className="m-bg">
          <div className="m-bg-mask m-bg-mask0"></div>
          <div className="m-bg-mask m-bg-mask1"></div>
          <div className="m-bg-mask m-bg-mask2"></div>
          <div className="m-bg-mask m-bg-mask3"></div>
        </div>
        <div className="main-one login-container">
          <div className="container">
            <Row type="flex" justify="center">
              <Col xs={20} sm={16} md={12} lg={8} className="container-login">
                <Card className="card-login">
                  <h2 className="login-title">Lemonce Mock Server</h2>
                  <div className="login-logo"><p>Lemonce</p></div>
                  <Login/>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>)
  }
}

export default LoginContainer;
