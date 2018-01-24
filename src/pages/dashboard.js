import React, { PureComponent } from 'react'
import DropzoneComponent from '../components/app/dropzone'
import { Button, Grid, withStyles, withWidth } from 'material-ui'
import { bindActionCreators, compose } from 'redux'
import { addErrorFilesAction, addFilesAction, clearFilesAction } from '../actions/file'
import { connect } from 'react-redux'
import FileList from '../components/list/files'

const accept = 'image/*'

const styles = (theme) => ({
  dropzone: {
    height: 200,
    [theme.breakpoints.down('xs')]: {
      height: 100,
    },
    marginBottom: 30,
  },
  center: {
    textAlign: 'center',
  },
})

const mapStateToProps = ({ file: { files, errorFiles } }) => ({ files, errorFiles })

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addErrorFilesAction, addFilesAction, clearFilesAction }, dispatch)

class Dashboard extends PureComponent {

  handleUpload = (accepted, rejected) => {

    const { addErrorFilesAction, addFilesAction } = this.props
    const { length: accLen } = accepted
    const { length: rejLen } = rejected

    if (accLen) addFilesAction(accepted)
    if (rejLen) addErrorFilesAction(rejected)
  }

  handleClearClicked = () => {
    const { clearFilesAction } = this.props
    clearFilesAction()
  }

  render() {

    const { classes, files, errorFiles } = this.props
    const { length } = files

    return (
      <div>
        <DropzoneComponent
          onUploadClicked={this.handleUpload}
          onFileDropped={this.handleUpload}
          className={classes.dropzone}
          acceptString={accept}
        />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Grid container spacing={24}>
              <Grid item xs={6} className={classes.center}>
                <Button onClick={this.handleClearClicked} raised fullWidth color='secondary'>Clear</Button>
              </Grid>
              <Grid item xs={6} className={classes.center}>
                <Button disabled={!length} raised fullWidth color='primary'>Upload</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <FileList files={files} title={'Files:'}/>
          </Grid>
          <Grid item xs={6}>
            <FileList files={errorFiles} title={'Forbidden files:'}/>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withWidth(),
)(Dashboard)