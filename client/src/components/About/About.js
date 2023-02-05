import React, { Component } from 'react';
import qnas from './q&as.js'
import './About.css';


class About extends Component {
  render() {
    return (
      <div className='wrapper'>
        <div className='about'>
          <h1 id='about'>ABOUT ALUMNI CELL</h1>
          <p>Lorem ipsum dolor sit amet. Qui molestias itaque et excepturi nobis et corrupti dicta qui distinctio iste ut alias rerum quo magnam deserunt. Ad necessitatibus numquam ut quibusdam maiores ad incidunt provident vel obcaecati repellat hic ullam dicta eum dolor dolore sed ipsa quaerat. Non autem rerum aut saepe unde ex labore magnam At velit velit sit aspernatur autem ut modi quisquam. Quo placeat dolor cum galisum molestias in aliquam velit qui assumenda obcaecati.</p>
        </div>
        <h1 id='faq'>Frequently Asked Questions</h1>
        <div className='qna'>
          {qnas.map((qna) => {
            return (
              <div id='questions'>
                
                <div className='q'>
                  <div>Q.</div><p>{qna.q}</p>
                </div>
                <div id='a'>
                  <div>A.</div><div>{qna.a}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
};

export default About;
