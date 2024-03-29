// components
import InputField from '../components/Form/InputField'
import Button from './../components/Button/Button'
import ScrollToTop from '../components/ScrollToTop'
import Avatar from '../components/Avatar/Avatar'

// assets
import '../assets/css/pages/auth.css'
import AcmLogo from '../assets/images/acm_logo.png'
import { emailPattern, passwordPattern, namePattern, phonePattern } from './../assets/js/patterns'
import UserImage from '../assets/images/user_placeholder.png'
import Spinner from './../components/Spinner/Spinner'

// react
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { GrUploadOption } from 'react-icons/gr'
import { TiDelete } from 'react-icons/ti'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'

// library
import ScrollAnimation from 'react-animate-on-scroll'

export default function Signup() {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
  })

  const [file, setFile] = useState(null)
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

  // Submit form values
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmittable) {
      dispatch(register(formValues))
    }
  }, [errors, isSubmittable])

  const handleChange = e => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const validateValues = values => {
    const currErrors = {}
    if (!isValid(values.firstName, namePattern))
      currErrors.firstName = 'First name must be at least 3 characters long with no special characters*'
    if (!isValid(values.lastName, namePattern))
      currErrors.lastName = 'Last name must be at least 3 characters long with no special characters*'
    if (!isValid(values.email, emailPattern)) currErrors.email = 'Invalid email, example - yourname@yourdomain.edu.pk*'
    if (!isValid(values.password, passwordPattern)) currErrors.password = 'Password must be between 6 and 21 characters*'
    if (!isValid(values.phone, phonePattern)) currErrors.phone = 'Phone number must begin with +92 or 0, followed by 10 digits'
    return currErrors
  }

  const isValid = (value, regexPattern) => (regexPattern.test(value) ? true : false)

  const handleSubmit = e => {
    e.preventDefault()
    setErrors(validateValues(formValues))
    setIsSubmittable(true)
  }

  const handleFileChange = e => {
    setFile(URL.createObjectURL(e.target.files[0]))
    e.target.value = null
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <main className="container">
      <ScrollToTop />
      <ScrollAnimation animateIn="fadeInDown" duration={0.5}>
        <section id="signup" className="auth">
          <div className="registration-logo">
            <Avatar image={AcmLogo} width="60px" height="60px" />
          </div>

          <h1 className="auth-title">Sign up</h1>

          <form className="auth-form" onSubmit={e => handleSubmit(e)} method="POST" action="/signup">
            <InputField
              type="name"
              name="firstName"
              placeholder="First name"
              required={true}
              pattern={namePattern}
              value={formValues.firstName}
              handleChange={handleChange}
            />
            <p className="error">{errors.firstName}</p>
            <InputField
              type="name"
              name="lastName"
              placeholder="Last name"
              required={true}
              pattern={namePattern}
              value={formValues.lastName}
              handleChange={handleChange}
            />
            <p className="error">{errors.lastName}</p>
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

            <InputField
              type="tel"
              name="phone"
              placeholder="Cell phone number"
              required={true}
              pattern={phonePattern}
              value={formValues.phone}
              handleChange={handleChange}
            />
            <p className="error">{errors.phone}</p>

            <div className="custom-file-upload">
              <label>
                <InputField
                  type="file"
                  id="display-image"
                  name="display-image"
                  accept="png,.PNG,.jpeg,.JPEG,.jpg,.JPG,.svg,.SVG"
                  handleChange={handleFileChange}
                  required={false}
                />
                <GrUploadOption className="upload-icon" />
                Display image
              </label>
              <Avatar image={file ? file : UserImage} width="50px" height="50px" />
              {file && <TiDelete className="delete-icon" onClick={e => setFile(null)} />}
            </div>

            <Button type="submit" content={'Sign up'} />
          </form>

          <p className="auth-switch">
            Already registered? Go to <Link to="/signin">Sign in</Link>
          </p>
        </section>
      </ScrollAnimation>
    </main>
  )
}
