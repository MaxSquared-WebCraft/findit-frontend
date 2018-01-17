import React, { Component } from 'react'

export default (importComponent) => {

  return class AsyncComponent extends Component {

    state = { component: null }
    
    async componentDidMount() {
      const { default: component } = await importComponent()
      this.setState(() => {
        return { component }
      })
    }

    render() {
      const { component: Component } = this.state
      return Component ? <Component {...this.props}/> : null
    }

  }
}