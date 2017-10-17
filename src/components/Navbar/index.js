import React from 'react'
import Container from '../Container'
import {Link} from 'react-router'
import Margin from './Margin'
import PropTypes from 'prop-types'

export default class Navbar extends React.Component {
  static propTypes = {
    logo: PropTypes.string
  }

  renderLogo() {
    return (
      <Link to="/">
        <img height={44} src={this.props.logo} alt="Logo" className="os_navbar-logo" />
      </Link>
    )
  }

  render() {
    return (
      <div>
        <Margin />
        <div className="os_navbar">
          <Container>{this.renderLogo()}</Container>
        </div>
      </div>
    )
  }
}
