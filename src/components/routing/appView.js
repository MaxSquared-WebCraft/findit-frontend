import React, { PureComponent } from 'react'
import {
  AppBar, Button, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar,
  Typography, withStyles,
} from 'material-ui'
import { Link } from 'react-router-dom'
import { PATH_LOGOUT } from '../../routes'
import MenuIcon from 'material-ui-icons/Menu'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft'
import InboxIcon from 'material-ui-icons/MoveToInbox'
import { bindActionCreators, compose } from 'redux'
import { toggleDrawerOpenStateAction } from '../../actions/app'
import { connect } from 'react-redux'
import classNames from 'classnames'

const drawerWidth = 240

const styles = theme => ({
  root: {
    width: '100%',
    zIndex: 1,
    overflow: 'hidden',
    height: '100vh',
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
    }
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
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
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
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
})

const LogoutLink = (props) => <Link to={PATH_LOGOUT} {...props}/>

const mapStateToProps = ({ app: { drawerOpen } }) => ({ drawerOpen })

const mapDispatchToProps = (dispatch) => bindActionCreators({ toggleDrawerOpenStateAction }, dispatch)

class AppView extends PureComponent {

  handleDrawerState = (open) => () => {
    const { toggleDrawerOpenStateAction } = this.props
    toggleDrawerOpenStateAction(open)
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
            <ListItem button>
              <ListItemIcon>
                <InboxIcon/>
              </ListItemIcon>
              <ListItemText primary="Inbox"/>
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
                component={LogoutLink}
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
)(AppView)