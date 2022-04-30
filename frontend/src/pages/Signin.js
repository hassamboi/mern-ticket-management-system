// components
import InputField from '../components/Form/InputField'
import Button from './../components/Button/Button'
import ScrollToTop from '../components/ScrollToTop'
import Avatar from '../components/Avatar/Avatar'
import Spinner from './../components/Spinner/Spinner'

// assets
import '../assets/css/pages/auth.css'
import AcmLogo from '../assets/images/acm_logo.png'
import { emailPattern, passwordPattern } from './../assets/js/patterns'

// react
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { signin, reset } from '../features/auth/authSlice'

// library
import { toast } from 'react-toastify'
import ScrollAnimation from 'react-animate-on-scroll'

export default function Signup() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({})
  const [isSubmittable, setIsSubmittable] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth)

  // After submitting form values, handle state change / responses from the servers
  useEffect(() => {
    if (isError) {
      toast.error(message, { position: 'bottom-left', theme: 'colored' })
    }

    if (isSuccess || user) {
      toast.success('Signed in', { position: 'bottom-left', theme: 'colored' })
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  // Submit the form data
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmittable) {
      dispatch(signin(formValues))
    }
  }, [errors, isSubmittable])

  const handleChange = e => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const validateValues = values => {
    const currErrors = {}
    if (!isValid(values.email, emailPattern)) currErrors.email = 'Invalid email, example - yourname@yourdomain.edu.pk*'
    if (!isValid(values.password, passwordPattern)) currErrors.password = 'Password must be between 6 and 21 characters*'
    return currErrors
  }

  const isValid = (value, regexPattern) => (regexPattern.test(value) ? true : false)

  const handleSubmit = e => {
    e.preventDefault()
    setErrors(validateValues(formValues))
    setIsSubmittable(true)
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <main className="container">
      <ScrollToTop />
      <ScrollAnimation animateIn="fadeInDown" duration={0.5}>
        <section id="signin" className="auth">
          <div className="registration-logo">
            <Avatar image={AcmLogo} width="60px" height="60px" />
          </div>

          <h1 className="auth-title">Sign in</h1>

          <form className="auth-form" onSubmit={e => handleSubmit(e)} method="POST" action="/signin">
            <InputField
              type="email"
              name="email"
              placeholder="Email"
              required={true}
              pattern={emailPattern}
              value={formValues.email}
              handleChange={handleChange}
            />
            <p className="error">{errors.email}</p>
            <InputField
              type="password"
              name="password"
              placeholder="Password"
              required={true}
              pattern={passwordPattern}
              value={formValues.password}
              handleChange={handleChange}
            />
            <p className="error">{errors.password}</p>

            <Button type="submit" content={'Sign in'} />
          </form>

          <p className="auth-switch">
            Haven't registered yet? Go to <Link to="/signup">Sign up</Link>
          </p>
        </section>
      </ScrollAnimation>
    </main>
  )
}
