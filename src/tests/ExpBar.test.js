import React from 'react'
import ReactDOM from 'react-dom'
import { shallow, mount, find, render, simulate } from 'enzyme'
import enzymeSerializer from 'enzyme-to-json/serializer'

import { ExpBar } from './../components/ExpBar'

expect.addSnapshotSerializer(enzymeSerializer)
describe('ExpBar', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<ExpBar />, div)
  })

  let component
  let props

  beforeEach(() => {
    props = {
      currentExp: 10,
      neededExp: 100
    }
    component = mount(<ExpBar {...props} />)
  })

  it('contains correct number of div', () => {
    expect(component.find('div').length).toEqual(3)
  })

  it('receives correct current and needed experience', () => {
    expect(component.props().currentExp).toEqual(10)
    expect(component.props().neededExp).toEqual(100)
  })

  it('matches snapshot', () => {
    const comp = shallow(<ExpBar {...props} />)
    expect(comp).toMatchSnapshot()
  })
})
