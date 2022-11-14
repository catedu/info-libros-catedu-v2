import { createBrowserRouter } from 'react-router-dom'

import CoursesView from 'CoursesView'
import CourseView from 'CourseView'

const router = createBrowserRouter([
  {
    path: '/',
    element: <CoursesView />,
  },
  {
    path: '/courses/:id',
    element: <CourseView />,
  },
  {
    path: '*',
    element: <h1>Lo siento, la página que estás buscando no existe.</h1>,
  },
])

export default router
