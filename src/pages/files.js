import React, { PureComponent } from 'react'
import {
  FormControl,
  Grid,
  Input,
  InputAdornment,
  withStyles,
} from 'material-ui'
import { bindActionCreators, compose } from 'redux'
import SearchIcon from 'material-ui-icons/Search'
import { getAllFilesAction } from '../actions/file'
import { connect } from 'react-redux'
import FileList from '../components/list/files'

const styles = (theme) => ({
  icon: {
    marginBottom: -5,
  },
  input: {
    fontSize: 20,
  }
})

const SearchIconComponent = ({ classes }) => (
  <InputAdornment position="start">
    <SearchIcon className={classes.icon}/>
  </InputAdornment>
)

const mapStateToProps = ({ auth: { user }, file: { files } }) => ({ user, files })

const mapDispatchToProps = (dispatch) => bindActionCreators({ getAllFilesAction }, dispatch)

class FilesComponent extends PureComponent {

  state = {
    search: '',
  }

  componentDidMount() {
    this.getAllFiles()
  }

  getAllFiles = () => {
    const { getAllFilesAction, user: { uuid } } = this.props
    getAllFilesAction(uuid)
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
  }

  handleChange = (field) => ({ target: { value }}) => {
    this.setState(() => ({ [field]: value }))
  }

  render() {

    const { classes, files } = this.props
    const { search } = this.state

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <form onSubmit={this.handleFormSubmit}>
            <FormControl fullWidth>
              <Input
                id="search-term"
                value={search}
                onChange={this.handleChange('search')}
                placeholder={'Search for anything'}
                className={classes.input}
                startAdornment={<SearchIconComponent classes={classes}/>}
              />
            </FormControl>
          </form>
        </Grid>
        <Grid item xs={12}>
          <div>
            <FileList files={files} title={'Your files'}/>
          </div>
        </Grid>
      </Grid>
    )
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, { withTheme: true }),
)(FilesComponent)