import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import Divider from '@material-ui/core/Divider'

const propTypes = {}

const styles = theme => ({
  root: {
    width: '60%',
    display: 'flex',
    alignContent: 'center',
    overflow: 'scroll',
    flexDirection: 'column',
    background: '#000'
  },
  video: {
    width: '100%'
  },
  card: {},
  courseDetail: {
    margin: '16px 24px'
  }
})

const CourseDetail = ({ classes, courseDetail, activeLesson }) => {
  const { resources, lessonData } = courseDetail
  return (
    <div className={classes.courseDetail}>
      <Card className={classes.card}>
        <CardContent>
          <Typography component="p">
            {activeLesson && lessonData[activeLesson].description}
          </Typography>
        </CardContent>
        <CardActions>
          {resources.map(({ label, url }) => (
            <Button
              size="small"
              color="primary"
              key={label}
              href={url}
              target="__blank"
              className={classes.button}
            >
              {label}
            </Button>
          ))}
        </CardActions>
      </Card>
    </div>
  )
}

const Player = ({ src, classes, courseDetail, activeLesson }) => (
  <div className={classes.root}>
    {src && <video className={classes.video} controls autoPlay src={src} />}

    {courseDetail && (
      <CourseDetail
        classes={classes}
        courseDetail={courseDetail}
        activeLesson={activeLesson}
      />
    )}
  </div>
)

Player.propTypes = propTypes

export default withStyles(styles)(Player)
