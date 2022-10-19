import { useState, useEffect } from 'react'
import { ArrowRightCircle } from 'react-bootstrap-icons'
import TrackVisibility from 'react-on-screen'
import headerImg from '../../../assets/img/header-img.svg'
import 'animate.css'
import lightImg from '../../../assets/img/light-hero-bg.jpg'
import './LandingPage.css'

const LandingPage = ({ theme }) => {
  const [loopNum, setLoopNum] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [text, setText] = useState('')
  const [delta, setDelta] = useState(300 - Math.random() * 100)
  const [index, setIndex] = useState(1)
  const toRotate = ['Flexible', 'Warm', 'Comfortable']
  const period = 2000

  useEffect(() => {
    let ticker = setInterval(() => {
      tick()
    }, delta)

    return () => {
      clearInterval(ticker)
    }
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length
    let fullText = toRotate[i]
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1)

    setText(updatedText)

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2)
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true)
      setIndex((prevIndex) => prevIndex - 1)
      setDelta(period)
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false)
      setLoopNum(loopNum + 1)
      setIndex(1)
      setDelta(500)
    } else {
      setIndex((prevIndex) => prevIndex + 1)
    }
  }

  return (
    <div className='landing'>
      <section className="landingPage__section" id="home">
      <div className="container">
        <div className="landingPage__wrapper">
          <div className="landingPage__content">
            <div>
              <h2>Welcome to Space Walk</h2>
              <h2 className="highlight">
              {`Forum App`}{' '}
                <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "Flexsible", "Warm", "Comfortable" ]'>
                  <span className="wrap">{text}</span>
                </span>
              </h2>
            </div>
            <p className="description">
              "ada dua kemungkinan, antara kita sendirian diluar angkasa atau tidak. Keduanya sama-sama menakutkan"
            </p>
            <div className="landingPage__btns">
              <button className='primary__btn' onClick={() => console.log('connect')}>Get Started <ArrowRightCircle size={25} /></button>
            </div>
          </div>
          <div className='landingPage__img'>
            <TrackVisibility >
                {({ isVisible }) =>
                  <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                    <img src={theme === 'light-theme' ? lightImg : headerImg} alt="landingPage-img" />
                  </div>}
              </TrackVisibility>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default LandingPage