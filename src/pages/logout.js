import { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { logoutAction } from '../actions/auth'
import { connect } from 'react-redux'
import { PATH_LOGIN } from '../routes'

const mapStateToProps = ({ auth: { user } }) => ({ user })

const mapDispatchToProps = (dispatch) => bindActionCreators({ logoutAction }, dispatch)

class LogoutComponent extends PureComponent {

  componentDidMount() {
    const { logoutAction } = this.props
    logoutAction()
  }

  componentWillUpdate({ user, history }) {
    if (!user) {
      history.replace(PATH_LOGIN)
      window.location.reload(true)
    }
  }

  render() {
    return null
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutComponent)