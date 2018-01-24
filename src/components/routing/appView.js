import React, { PureComponent } from 'react'
import {
  AppBar, Button, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar,
  Typography, withStyles,
} from 'material-ui'
import { Link } from 'react-router-dom'
import { PATH_LOGOUT, PATH_DASHBOARD, PATH_FILES } from '../../routes'
import MenuIcon from 'material-ui-icons/Menu'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft'
import CloudUploadIcon from 'material-ui-icons/CloudUpload'
import CloudIcon from 'material-ui-icons/Cloud'
import { bindActionCreators, compose } from 'redux'
import { toggleDrawerOpenStateAction } from '../../actions/app'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { applyPropsToComponent } from '../../lib/renderHelper'
import { withRouter } from 'react-router'

const drawerWidth = 240

const styles = theme => ({
  root: {
    width: '100%',
    zIndex: 1,
    overflow: 'hidden',
    minHeight: '100vh',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarMargin: {
    paddingRight: 24,
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  appBarTitle: {
    flex: 1,
    paddingBottom: 3,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  breakPointHide: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    position: 'relative',
    height: '100vh',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    minHeight: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      minHeight: 'calc(100% - 64px)',
      marginTop: 64,
    },
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  list: {
    padding: 0,
  }
})

const LinkComponent = ({ path, ...rest }) => <Link to={path} {...rest}/>

const mapStateToProps = ({ app: { drawerOpen } }) => ({ drawerOpen })

const mapDispatchToProps = (dispatch) => bindActionCreators({ toggleDrawerOpenStateAction }, dispatch)

class AppView extends PureComponent {

  handleDrawerState = (open) => () => {
    const { toggleDrawerOpenStateAction } = this.props
    toggleDrawerOpenStateAction(open)
  }

  handleListClicked = (location) => () => {
    const { history } = this.props
    history.push(location)
  }

  renderDrawer = () => {

    const {
      drawerOpen,
      classes: {
        drawerInner,
        drawerPaper,
        drawerHeader,
        list,
      },
    } = this.props

    return (
      <Drawer
        type="persistent"
        anchor='left'
        open={drawerOpen}
        classes={{ paper: drawerPaper }}
      >
        <div className={drawerInner}>
          <div className={drawerHeader}>
            <IconButton onClick={this.handleDrawerState(false)}>
              <ChevronLeftIcon/>
            </IconButton>
          </div>
          <List className={list}>
            <ListItem button onClick={this.handleListClicked(PATH_DASHBOARD)}>
              <ListItemIcon>
                <CloudUploadIcon/>
              </ListItemIcon>
              <ListItemText primary="Upload"/>
            </ListItem>
            <ListItem button onClick={this.handleListClicked(PATH_FILES)}>
              <ListItemIcon>
                <CloudIcon/>
              </ListItemIcon>
              <ListItemText primary="My Files"/>
            </ListItem>
          </List>
        </div>
      </Drawer>
    )
  }

  render() {

    const {
      children,
      drawerOpen,
      classes: {
        root,
        appFrame,
        appBar,
        appBarTitle,
        appBarShift,
        appBarMargin,
        menuButton,
        hide,
        content,
        contentShift,
        breakPointHide,
      },
    } = this.props

    return (
      <div className={root}>
        <div className={appFrame}>
          <AppBar className={classNames(appBar, { [appBarShift]: drawerOpen, [appBarMargin]: !drawerOpen })}>
            <Toolbar disableGutters={!drawerOpen}>
              <IconButton
                className={classNames(menuButton, drawerOpen && hide)}
                onClick={this.handleDrawerState(true)}
                color='inherit'
              ><MenuIcon/>
              </IconButton>
              <Typography
                type='title'
                color='inherit'
                noWrap
                className={classNames(appBarTitle, drawerOpen && breakPointHide)}
              >FindIt
              </Typography>
              <Button
                className={classNames(drawerOpen && breakPointHide)}
                color="inherit"
                component={applyPropsToComponent({ path: PATH_LOGOUT })(LinkComponent)}
              >Logout
              </Button>
            </Toolbar>
          </AppBar>
          {this.renderDrawer()}
          <main className={classNames(content, { [contentShift]: drawerOpen })}>{children}</main>
        </div>
      </div>
    )
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, { withTheme: true }),
  withRouter,
)(AppView)