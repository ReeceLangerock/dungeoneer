import React from 'react'
import styled from 'styled-components'

const FooterStyled = styled.div`
  background-color: #80cf7c;
  font-size: 1rem;
  padding: 5px;
  color: #2f2f2f;
  margin-top:0px;
  a {
    color: white;
    cursor: pointer;
    
    text-decoration: none;
  }
`

const I = styled.i`
  margin-left: 10px;

  cursor: pointer;
  color: #2f2f2f;
`

export class Footer extends React.Component {
  handleIconClick (link) {
    window.open('https://github.com/ReeceLangerock/game-of-life', '_blank')
  }
  render () {
    const currentYear = new Date().getFullYear()

    return (
      <FooterStyled className='Footer'>
        © {currentYear}{' '}
        <a href='http://reecelangerock.com' rel='noopener noreferrer' target='_blank'>
          Reece Langerock
        </a>
        <I className={`fa fa-github`} aria-hidden='false' onClick={() => this.handleIconClick()} />
      </FooterStyled>
    )
  }
}
export default Footer
