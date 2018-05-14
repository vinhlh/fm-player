import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ListSubheader from '@material-ui/core/ListSubheader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import classNames from 'classnames'

const styles = theme => ({
  root: {},
  activeItem: {
    background: theme.palette.grey['300']
  }
})

const propTypes = {}

const CourseList = ({
  classes,
  allCourses,
  activeCourse,
  setActiveCourse,
  closeDrawer
}) => (
  <List
    className={classes.root}
    component="nav"
    subheader={
      <ListSubheader component="div" disableSticky>
        All courses
      </ListSubheader>
    }
  >
    {Object.entries(allCourses)
      .filter(([_, status]) => status !== 'none')
      .map(([courseId, status]) => (
        <ListItem
          button
          key={courseId}
          onClick={() => {
            closeDrawer()
            setActiveCourse(courseId)
          }}
          className={classNames(
            courseId === activeCourse && classes.activeItem
          )}
        >
          <ListItemText primary={courseId} secondary={status} />
        </ListItem>
      ))}
  </List>
)

CourseList.propTypes = propTypes

export default withStyles(styles)(CourseList)
