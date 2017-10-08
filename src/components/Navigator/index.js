import React from 'react'
import PropTypes from 'prop-types'
import {withRouter, Link} from 'react-router'
import autobind from 'autobind-decorator'
import sleep from '../../helpers/sleep'
import RightIcon from 'react-icons/lib/md/chevron-right'
import LeftIcon from 'react-icons/lib/md/chevron-left'
import parseColor from '../../helpers/parseColor'

@withRouter
export default class Navigator extends React.Component {
  static propTypes = {
    router: PropTypes.object,
    items: PropTypes.array,
    color: PropTypes.string
  }

  static defaultProps = {
    color: '#0069ff'
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
      const pathname = this.props.router.location.pathname
      const active = item.path === '/' ? pathname === item.path : pathname.startsWith(item.path)
      const classNames = ['os-navigator-item']
      if (active) classNames.push('os-navigator-itemActive')
      return (
        <div key={index} className={classNames.join(' ')}>
          <Link to={item.path}>{item.title}</Link>
        </div>
      )
    })

    const classNames = ['os-navigator-inner']
    if (this.state.isSmall) {
      classNames.push('os-navigator-inner-small')
    }
    return (
      <div className={classNames.join(' ')} ref="inner">
        {items}
      </div>
    )
  }

  renderShadow() {
    if (!this.state.showShadows) return
    const {red, green, blue} = parseColor(this.props.color)
    const color = [red, green, blue].join(', ')
    const element = this.refs.inner
    const top = element.getBoundingClientRect().top + window.scrollY
    const left = element.getBoundingClientRect().left + window.scrollX
    const right = element.getBoundingClientRect().right - window.scrollX
    const getStyle = isLeft => {
      return {
        top,
        left: isLeft ? left : right - 30,
        background: `-webkit-gradient(linear,${isLeft ? '100' : '0'}% 50%,${isLeft
          ? '0'
          : '100'}% 50%,color-stop(0%, rgba(${color}, 0)),color-stop(100%, rgba(${color}, 1)))`
      }
    }
    return [
      <div key="left" className="os-navigator-shadow" style={getStyle(true)} />,
      <div key="right" className="os-navigator-shadow" style={getStyle(false)} />
    ]
  }

  renderRightIcon() {
    const element = this.refs.inner
    if (!element) return
    const top = element.getBoundingClientRect().top + window.scrollY
    const right = element.getBoundingClientRect().right - window.scrollX
    return (
      <div
        className="os-navigator-icon"
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
        className="os-navigator-icon"
        style={{opacity: this.state.showArrowLeft ? 1 : 0, top, left: left}}>
        <LeftIcon size={30} />
      </div>
    )
  }

  render() {
    return (
      <div className="os-navigator-container" style={{background: this.props.color}}>
        {this.renderItems()}
        {this.renderShadow()}
        {this.renderLeftIcon()}
        {this.renderRightIcon()}
      </div>
    )
  }
}
