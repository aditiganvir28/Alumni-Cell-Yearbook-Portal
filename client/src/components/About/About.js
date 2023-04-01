import React, { useContext, useEffect } from 'react'
import './About.scss'
import { LoginContext } from '../../helpers/Context.js'

function About() {
  const { loading, setLoading } = useContext(LoginContext)

  useEffect(() => {
    setLoading(true)
    const Load = async () => {
      await new Promise((r) => setTimeout(r, 1000))

      setLoading((loading) => !loading)
    }

    Load()
  }, [])

  const accordion = document.getElementsByClassName('container')

  for (var i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener('click', function () {
      this.classList.toggle('active')
    })
  }
  return (
    <>
      {loading && (
        <div className="spinner">
          <span class="loader"></span>
        </div>
      )}
      {!loading && (
        <div className="wrapper">
          <div className="about">
            <div>
              <style>
                @import
                url('https://fonts.googleapis.com/css2?family=Quantico&display=swap');
              </style>
              {/* <ChakraProvider> */}
              <div className="wrapper" id="abd">
                <hr id="line"></hr>
                <div className="abouta" id="abt">
                  <h1 id="abouta">ABOUT ALUMNI CELL</h1>
                  <p id="para-abouta">
                    The Alumni Cell is the Institute’s student-run cell to
                    connect and broaden the alum network. It started as a group
                    of 4 individuals but now encompasses 5 teams working to
                    improve Alum-Institute-Student Relations. The Yearbook was
                    one such initiative undertaken by the Cell. Starting with
                    the Class of 2022, the Yearbook’s First Edition was a
                    smashing success and helped the alums and the students
                    connect more. Following the same, the Yearbook Portal is
                    another initiative headed by the Web Development Division of
                    the Alumni Cell.<br></br> A one-stop hub to curate your
                    Yearbook profile and help others do the same. This is the
                    very first edition of the Yearbook Portal, and we would love
                    to hear your comments and suggestions so we can improve in
                    the coming years.{' '}
                  </p>
                  <p id='para-abouta'>
                    Please reach us at<br></br>E-Mail: alumnicell@iiti.ac.in
                    <br></br>Enjoy commenting!<br></br>Regards,<br></br>The
                    Alumni Cell,<br></br>Indian Institute of Technology Indore
                    <br></br>
                  </p>
                  <hr id="line2"></hr>
                </div>
                <div className="message" id="dean">
                  <h1 id="msg">Message from Dean</h1>
                  <p id="para-msg">
                  Dear Class of 2023,<br/><br/>
                  I extend a sincere congratulations and best of luck to the Class of 2023. While
                  your days as a student have come to an end, your connection to IIT Indore lasts
                  for a lifetime. Take advantage of the opportunities provided by our global alumni
                  network – leverage it and contribute to it.<br/>
                  In the coming years, I urge that you not forget your alma mater, professors, and
                  fellows. I encourage you to not only give back to the institute, but also keep us
                  updated on the many achievements you will experience in your careers and
                  personal lives. We will always take great pride in your achievements.<br/><br/>
                  Take care and keep in touch,<br/>
                  Congratulations once again!
                  </p>
                  <br></br>
                  <hr id="line2"></hr>
                </div>
                <div className="faq">
                  <div class="accordion-body">
                    <div class="accordion">
                      <h1 id='fa'>Frequently Asked Questions (FAQs)</h1>
                      <hr></hr>
                      <div class="containera">
                        <div class="label"><div className="dash">&#62;</div> Would I be required to log in every time I access the yearbook portal?</div>
                        <div class="content">
                        No. Once you set up your profile on the first log in, you would not be required to log in again every time you access the portal. 
                        Just click on the ‘Profile’ button, and you’re good to go.
                        </div>
                      </div>
                      <hr></hr>
                      <div class="containera">
                        <div class="label"><div className="dash">&#62;</div> Is two-step verification necessary for creating my profile?</div>
                        <div class="content">
                        Yes. Two-step verification helps us ensure that it is truly you who is signing in. Without completing it, your profile will not be created on the portal.
                        </div>
                      </div>
                      <hr></hr>
                      <div class="containera">
                        <div class="label"><div className="dash">&#62;</div> Can I navigate through the profiles of my batchmates?</div>
                        <div class="content">
                        Yes, you can do that by typing their name in the search bar.
                        </div>
                      </div>
                      <hr></hr>
                      <div class="containera">
                        <div class="label"><div className="dash">&#62;</div> Would I have to re-enter my details for the physical yearbook separately?</div>
                        <div class="content">
                        No, your profile from the portal will be used for printing the yearbook. 
                        Please ensure you fill in the required details accordingly. You can edit your profile once you’ve signed up on the portal. 
                        However, after a particular date - of which you’ll be informed well in advance - your profile will be locked, and the same details would be used for printing.
                        </div>
                      </div>
                      <hr></hr>
                      <div class="containera">
                        <div class="label"><div className="dash">&#62;</div> Can I edit my phone number and email id once it has been verified?</div>
                        <div class="content">
                          No. In order to change either your phone number or email id, please reach out to the Alumni Cell Web Team.
                        </div>
                      </div>
                      <hr></hr>
                      <div class="containera">
                        <div class="label"><div className="dash">&#62;</div> Can I use slang / inappropriations in my comments?</div>
                        <div class="content">
                          No. The Alumni Cell reserves the full right to delete any comments which use foul or abusive language. Please refrain from doing so.
                        </div>
                      </div>
                      {/* <hr></hr> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default About
