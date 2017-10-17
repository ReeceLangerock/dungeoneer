import React from 'react'
import ReactDOM from 'react-dom'
import { shallow, mount, find, render, simulate } from 'enzyme'
import enzymeSerializer from 'enzyme-to-json/serializer'

import { Footer } from './../components/Footer'

expect.addSnapshotSerializer(enzymeSerializer)
describe('Footer', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Footer />, div)
  })

  let component
  let props

  beforeEach(() => {
    component = mount(<Footer />)
  })

  it('matches snapshot', () => {
    const comp = shallow(<Footer />)
    expect(comp).toMatchSnapshot()
  })
})
