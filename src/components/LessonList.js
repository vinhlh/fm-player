import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'
import { CircularProgress } from 'material-ui'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    overflow: 'scroll',
    width: '40%'
  },
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  button: {
    display: 'block'
  },
  loadingIcon: {
    display: 'block'
  },
  thumbnail: {
    width: theme.spacing.unit * 8,
    height: theme.spacing.unit * 4.5
  }
})

const propTypes = {}

const LessonList = ({
  classes,
  courseDetail,
  activeLession,
  setActiveLesson,
  openDrawer,
  isDrawerOpened,
  fetching
}) => (
  <List className={classes.root} component="nav">
    {courseDetail ? (
      courseDetail.lessonHashes.map(lessonId => {
        const { title, description, thumbnail } = courseDetail.lessonData[
          lessonId
        ]
        return (
          <ListItem
            button
            key={lessonId}
            onClick={() => setActiveLesson(lessonId)}
          >
            <Avatar className={classes.thumbnail} alt={title} src={thumbnail} />
            <ListItemText primary={title} secondary={description} />
          </ListItem>
        )
      })
    ) : (
      <div className={classes.container}>
        {fetching ? (
          <CircularProgress className={classes.loadingIcon} />
        ) : (
          <Button
            variant="raised"
            color="primary"
            size="large"
            className={classes.button}
            onClick={openDrawer}
            disabled={isDrawerOpened}
          >
            Choose a course to watch
          </Button>
        )}
      </div>
    )}
  </List>
)

LessonList.propTypes = propTypes

export default withStyles(styles)(LessonList)
