import React, { Component } from 'react'

import CourseList from './components/CourseList'
import LessonList from './components/LessonList'
import Layout from './components/Layout'
import Player from './components/Player'

const S3_ENDPOINT = 'https://s3-ap-southeast-1.amazonaws.com/vinhlh.fm'

const getApiByName = (name, options = {}) =>
  S3_ENDPOINT +
  {
    allCourses: '/courses.json',
    courseDetail: `/${options.courseId}/info.json`,
    getVideo: `/${options.courseId}/${options.lessonId}.webm`
  }[name]

class App extends Component {
  state = {
    allCourses: [],
    activeCourse: null,
    activeLesson: null,
    courseDetails: {},
    fetching: false
  }

  componentWillMount() {
    fetch(getApiByName('allCourses'))
      .then(resp => resp.json())
      .then(allCourses => this.setState({ allCourses }))
  }

  setActiveCourse = courseId => {
    this.setState({ activeCourse: courseId })

    if (!this.state.courseDetails[courseId]) {
      this.setState({ fetching: true }, () => {
        fetch(getApiByName('courseDetail', { courseId }))
          .then(resp => resp.json())
          .then(courseInfo =>
            this.setState({
              fetching: false,
              courseDetails: {
                ...this.state.courseDetails,
                [courseId]: courseInfo
              }
            })
          )
      })
    }
  }

  setActiveLesson = lessonId => {
    this.setState({ activeLesson: lessonId })
  }

  getCurrentVideo = () => {
    const { activeCourse, activeLesson } = this.state
    if (!activeCourse || !activeLesson) {
      return null
    }

    return getApiByName('getVideo', {
      courseId: activeCourse,
      lessonId: activeLesson
    })
  }

  getCourseDetail = () => {
    const { courseDetails, activeCourse } = this.state

    return courseDetails[activeCourse] || null
  }

  render() {
    const {
      allCourses,
      activeCourse,
      activeLesson,
      fetching
    } = this.state
    const courseDetail = this.getCourseDetail()
    return (
      <Layout
        title={courseDetail && courseDetail.title}
        renderDrawer={props => (
          <CourseList
            allCourses={allCourses}
            activeCourse={activeCourse}
            setActiveCourse={this.setActiveCourse}
            {...props}
          />
        )}
      >
        {props => [
          <LessonList
            key="lesson-list"
            activeLesson={activeLesson}
            setActiveLesson={this.setActiveLesson}
            courseDetail={courseDetail}
            fetching={fetching}
            {...props}
          />,
          <Player key="player" src={this.getCurrentVideo()} />
        ]}
      </Layout>
    )
  }
}

export default App
