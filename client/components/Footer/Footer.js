import './Footer.scss'
import React, { PureComponent as Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd';
import { Icon } from 'antd'
// import packageJson from '../../../package.json';
class Footer extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    footList: PropTypes.array
  }
  render () {
    return (
      <div className="footer-wrapper">
        <Row className="footer-container">
          {this.props.footList.map(function(item,i){
            return <FootItem key={ i } linkList={ item.linkList } title={ item.title } iconType={ item.iconType } ></FootItem>
          })}
        </Row>
      </div>
    )
  }
}

class FootItem extends Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    linkList: PropTypes.array,
    title: PropTypes.string,
    iconType: PropTypes.string
  }
  render () {
    return (
      <Col span={6}>
        <h4 className="title">{this.props.iconType ? <Icon type={ this.props.iconType } className="icon" /> : ''}{this.props.title}</h4>
        { this.props.linkList.map(function(item,i){
          return (<p key={i}><a href={ item.itemLink } className="link">{ item.itemTitle }</a></p>);
        }) }
      </Col>
    );
  }
}

Footer.defaultProps = {
  footList: []
}

export default Footer
