import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loginAction } from '../actions/auth'
import { PATH_DASHBOARD } from '../routes'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Input,
  InputLabel,
} from 'material-ui'
import { indigo } from 'material-ui/colors'
import styled from 'styled-components'

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  height: 100vh;
`

const StyledCard = styled(Card)`
  @media (max-width: 360px) {
    margin: 0 10px;
  }
  max-width: 350px;
  margin: auto;
`

const StyledFormControl = styled(FormControl)`
  margin-top: 20px;
`

const StyledCardHeader = styled(CardHeader)`
  background-color: ${indigo[500]};
`

const StyledFormControlLabel = styled(FormControlLabel)`
  margin-top: 10px;
`

const StyledButton = styled(Button)`
  margin-top: 50px;
  width: 100%;
`

const TitleText = styled.div`
  color: white;
`

const mapStateToProps = ({ auth: { user } }) => ({ user })

const mapDispatchToProps = (dispatch) => bindActionCreators({ loginAction }, dispatch)

class LoginPage extends PureComponent {

  state = {
    username: '',
    password: '',
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    const { username, password } = this.state
    const { loginAction } = this.props
    loginAction(username, password)
  }

  onChangeValue = (field) => ({ target: { value } }) => {
    this.setState(() => ({ [field]: value }))
  }

  render() {

    console.log('sers')

    const { username, password } = this.state

    return (
      <FlexContainer>
        <StyledCard raised>
          <form onSubmit={this.handleFormSubmit}>
            <StyledCardHeader title={<TitleText>FindIt Login</TitleText>}/>
            <CardContent>
              <StyledFormControl fullWidth>
                <InputLabel htmlFor="password">Username</InputLabel>
                <Input
                  id="adornment-password"
                  type={'text'}
                  value={username}
                  onChange={this.onChangeValue('username')}
                />
              </StyledFormControl>
              <StyledFormControl fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="adornment-password"
                  type={'password'}
                  value={password}
                  onChange={this.onChangeValue('password')}
                />
              </StyledFormControl>
              <StyledButton type={'submit'} raised color={'primary'}>Login</StyledButton>
            </CardContent>
          </form>
        </StyledCard>
      </FlexContainer>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)