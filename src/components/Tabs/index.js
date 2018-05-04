import React from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import autobind from 'autobind-decorator'
import sleep from '../../helpers/sleep'
import RightIcon from 'react-icons/lib/md/chevron-right'
import LeftIcon from 'react-icons/lib/md/chevron-left'
import parseColor from '../../helpers/parseColor'

@withRouter
export default class Tabs extends React.Component {
  static propTypes = {
    location: PropTypes.object,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.node.isRequired,
        path: PropTypes.string.isRequired
      })
    ),
    backgroundColor: PropTypes.string
  }

  static defaultProps = {
    backgroundColor: '#fafafa'
  }

  state = {}

  async componentDidMount() {
    this.refs.inner.addEventListener('scroll', this.checkScroll)
    window.addEventListener('resize', this.checkScroll)
    this.checkScroll()
    await sleep(200)
    if (this.refs.inner) {
      this.checkScroll()
    }
  }

  componentWillUnmount() {
    this.refs.inner.removeEventListener('scroll', this.checkScroll)
    window.removeEventListener('resize', this.checkScroll)
  }

  @autobind
  checkScroll() {
    const element = this.refs.inner
    const width = element.offsetWidth
    const innerWidth = element.scrollWidth
    const scrollLeft = element.scrollLeft
    const offsetRight = innerWidth - scrollLeft - width

    if (width >= innerWidth) {
      this.setState({
        isSmall: window.innerWidth <= 1220,
        showShadows: false,
        showArrowLeft: false,
        showArrowRight: false
      })
    } else {
      this.setState({
        isSmall: window.innerWidth <= 1220,
        showShadows: true,
        showArrowLeft: scrollLeft > 10,
        showArrowRight: offsetRight > 10
      })
    }
  }

  renderItems() {
    const items = this.props.items.map((item, index) => {
      const pathname = this.props.location.pathname
      const active = pathname === item.path
      const classNames = ['os-tabs-item']
      if (active) classNames.push('os-tabs-itemActive')
      return (
        <div key={index} className={classNames.join(' ')}>
          <Link to={item.path}>{item.title}</Link>
        </div>
      )
    })

    const classNames = ['os-tabs-inner']
    if (this.state.isSmall) {
      classNames.push('os-tabs-inner-small')
    }
    return (
      <div className={classNames.join(' ')} ref="inner">
        {items}
      </div>
    )
  }

  renderShadow() {
    if (!this.state.showShadows) return
    const {red, green, blue} = parseColor(this.props.backgroundColor)
    const color = [red, green, blue].join(', ')
    const element = this.refs.inner
    const top = element.getBoundingClientRect().top + window.scrollY
    const left = element.getBoundingClientRect().left + window.scrollX
    const right = element.getBoundingClientRect().right - window.scrollX
    const getStyle = isLeft => {
      return {
        top,
        left: isLeft ? left : right - 30,
        background: `-webkit-gradient(linear,${isLeft ? '100' : '0'}% 50%,${
          isLeft ? '0' : '100'
        }% 50%,color-stop(0%, rgba(${color}, 0)),color-stop(100%, rgba(${color}, 1)))`
      }
    }
    return [
      <div key="left" className="os-tabs-shadow" style={getStyle(true)} />,
      <div key="right" className="os-tabs-shadow" style={getStyle(false)} />
    ]
  }

  renderRightIcon() {
    const element = this.refs.inner
    if (!element) return
    const top = element.getBoundingClientRect().top + window.scrollY
    const right = element.getBoundingClientRect().right - window.scrollX
    return (
      <div
        className="os-tabs-icon"
        style={{opacity: this.state.showArrowRight ? 1 : 0, top, left: right - 30}}>
        <RightIcon size={30} />
      </div>
    )
  }

  renderLeftIcon() {
    const element = this.refs.inner
    if (!element) return
    const top = element.getBoundingClientRect().top + window.scrollY
    const left = element.getBoundingClientRect().left + window.scrollX
    return (
      <div
        className="os-tabs-icon"
        style={{opacity: this.state.showArrowLeft ? 1 : 0, top, left: left}}>
        <LeftIcon size={30} />
      </div>
    )
  }

  render() {
    return (
      <div className="os-tabs-container">
        {this.renderItems()}
        {this.renderShadow()}
        {this.renderLeftIcon()}
        {this.renderRightIcon()}
      </div>
    )
  }
}
