import React, { PureComponent } from 'react'
import DropzoneComponent from '../components/app/dropzone'
import { Button, Grid, withStyles, withWidth } from 'material-ui'
import { bindActionCreators, compose } from 'redux'
import {
  addErrorFilesAction,
  addPreviewFilesAction,
  clearFilesAction,
  uploadFilesAction
} from '../actions/file'
import { connect } from 'react-redux'
import FileList from '../components/list/files'

const accept = 'image/*,application/pdf'

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

const mapStateToProps = ({ file: { previewFiles, errorFiles } }) => ({ previewFiles, errorFiles })

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    addErrorFilesAction,
    addPreviewFilesAction,
    clearFilesAction,
    uploadFilesAction
  }, dispatch)

class Dashboard extends PureComponent {

  handleDropzone = (accepted, rejected) => {

    const { addErrorFilesAction, addPreviewFilesAction } = this.props
    const { length: accLen } = accepted
    const { length: rejLen } = rejected

    if (accLen) addPreviewFilesAction(accepted)
    if (rejLen) addErrorFilesAction(rejected)
  }

  handleClearClicked = () => {
    const { clearFilesAction } = this.props
    clearFilesAction()
  }

  handleUpload = () => {
    const { uploadFilesAction, previewFiles } = this.props
    uploadFilesAction(previewFiles)
  }

  render() {

    const { classes, previewFiles, errorFiles } = this.props
    const { length } = previewFiles

    return (
      <div>
        <DropzoneComponent
          onUploadClicked={this.handleDropzone}
          onFileDropped={this.handleDropzone}
          className={classes.dropzone}
          acceptString={accept}
        />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Grid container spacing={24}>
              <Grid item xs={6} className={classes.center}>
                <Button
                  onClick={this.handleClearClicked}
                  raised
                  fullWidth
                  color='secondary'
                >Clear
                </Button>
              </Grid>
              <Grid item xs={6} className={classes.center}>
                <Button
                  onClick={this.handleUpload}
                  disabled={!length}
                  raised
                  fullWidth
                  color='primary'
                >Upload
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <FileList files={previewFiles} title={'Files:'}/>
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
  withStyles(styles, { withTheme: true }),
  withWidth(),
)(Dashboard)