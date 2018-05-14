import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'

const propTypes = {}

const styles = theme => ({
  root: {
    width: '60%',
    display: 'flex',
    alignContent: 'center'
  },
  video: {
    width: '100%'
  },
  videoActived: {
    background: '#000'
  }
})

const Player = ({ src, classes }) => (
  <div
    className={classNames(classes.root, {
      [classes.videoActived]: src
    })}
  >
    {src && <video className={classes.video} controls autoPlay src={src} />}
  </div>
)

Player.propTypes = propTypes

export default withStyles(styles)(Player)
