import React from 'react'
import PropTypes from 'prop-types'
import grey from 'material-ui/colors/grey'
import indigo from 'material-ui/colors/indigo'
import Dropzone from 'react-dropzone'
import { withStyles } from 'material-ui'
import classNames from 'classnames'

const styles = () => ({
    dropzoneComponent: {
      border: `2px dashed ${grey[500]}`,
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      flexDirection: 'column',
      position: 'relative',
      borderRadius: 2,
    },
    dropzoneActive: {
      border: `2px solid ${indigo[200]}`,
      backgroundColor: indigo[100],
    }
})

const DropzoneComponent = (props) => {

  const {
    onFileDropped,
    acceptString,
    className,
    classes: {
      dropzoneComponent,
      dropzoneActive,
    }
  } = props

  return (
    <div>
      <Dropzone
        className={classNames(className, dropzoneComponent)}
        activeClassName={dropzoneActive}
        onDrop={onFileDropped}
        accept={acceptString}
      >
        <div> </div>
      </Dropzone>
    </div>
  )
}

DropzoneComponent.propTypes = {
  className: PropTypes.string,
  previewFile: PropTypes.shape({
    preview: PropTypes.any,
    name: PropTypes.string,
  }),
  onUploadClicked: PropTypes.func.isRequired,
  onFileDropped: PropTypes.func.isRequired,
  acceptString: PropTypes.string.isRequired,
}

export default withStyles(styles)(DropzoneComponent)