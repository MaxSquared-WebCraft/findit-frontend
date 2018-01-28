import React, { PureComponent } from 'react'
import {
  Avatar,
  FormControl,
  Grid, IconButton,
  Input,
  InputAdornment,
  List,
  ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText,
  Typography,
  withStyles,
} from 'material-ui'
import { compose } from 'redux'
import SearchIcon from 'material-ui-icons/Search'
import DriveFileIcon from 'material-ui-icons/InsertDriveFile'
import DeleteIcon from 'material-ui-icons/Delete'

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

const generate = (element) => {
  return [0, 1, 2, 4, 5].map(value =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

class FilesComponent extends PureComponent {

  state = {
    search: '',
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
  }

  handleChange = (field) => ({ target: { value }}) => {
    this.setState(() => ({ [field]: value }))
  }


  render() {

    const { classes } = this.props
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
          <Typography type="title">
            Your Files:
          </Typography>
          <div>
            <List>
              {generate(
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar>
                      <DriveFileIcon/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Single-line item"
                    secondary={'Tag1, Tag2, Tag3'}
                  />
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Delete">
                      <DeleteIcon/>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>,
              )}
            </List>
          </div>
        </Grid>
      </Grid>
    )
  }
}

export default compose(
  withStyles(styles, { withTheme: true }),
)(FilesComponent)