import React from 'react'
import './Contact.css'

const Contact = () => {
  return (
    <>
      <main className='about'>
        <section className='top-info-section'>
          <div className='contact-title'>About</div>
          <div className='info-grid'>
            <div className='contact-info'>
              <div className="description">
                I'm an digital designer who love to establish my design through conceptual thinking. I love working with the entire design process and to implement these designs through code.<br />
                I'm a firm believer that through a thorough design process, and knowledge of both design methods and code, you'll be able to make  high quality solutions.
              </div>
            </div>
              <div className='contact-list-info'>
                <div className='list-info-items'>
                  <p className='tagName'>email</p>
                  <div className='year'>eivindmpham@gmail.com</div>
                </div>
                <div className='list-info-items'>
                  <p className='tagName'>phone</p>
                  <div className='year'>+47 908 96 870</div>
                </div>
                <div className='list-info-items'>
                  <p className='tagName'>Linkedin</p>
                  <a href="https://www.linkedin.com/in/eivind-madsen-pham-154338198/" className='year'>Link</a>
                </div>
                <div className='list-info-items'>
                  <p className='tagName'>Github</p>
                  <a href="https://github.com/Phamern?tab=repositories" className='year'>Link</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Contact