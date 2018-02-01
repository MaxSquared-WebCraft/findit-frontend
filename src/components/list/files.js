import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, List, ListItem, ListItemText, Typography } from 'material-ui'
import DriveFileIcon from 'material-ui-icons/InsertDriveFile'

const FileList = (props) => {

  const { files, title } = props
  const { length } = files

  return (
    <div>
      {length ?
      <Typography key='1' type='headline'>{title}</Typography> : null
      }
      <List key='2'>
        {files.map(({ name, location, originalName }, idx) => (
          <ListItem key={name + idx}>
            <Avatar>
              <DriveFileIcon/>
            </Avatar>
            <ListItemText primary={originalName || name} secondary={location || null}/>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

FileList.propTypes = {
  title: PropTypes.string,
  files: PropTypes.array,
}

FileList.defaultProps = {
  title: 'File list',
  files: [],
}

export default FileList