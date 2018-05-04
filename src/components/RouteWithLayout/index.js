import React from 'react'
import {Route} from 'react-router-dom'
import PropTypes from 'prop-types'

export default class RouteWithLayout extends React.Component {
  static propTypes = {
    layout: PropTypes.any.isRequired,
    component: PropTypes.any.isRequired,
    passProps: PropTypes.object
  }

  static defaultProps = {
    passProps: {}
  }

  render() {
    const {
      layout: Layout,
      component: Component,
      passProps,
      ...rest
    } = this.props

    return (
      <Route {...rest} render={(props) =>
        <Layout {...props}>
          <Component {...props} {...passProps}/>
        </Layout>
      }/>
    )

  }
}
