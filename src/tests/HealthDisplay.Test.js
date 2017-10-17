import React from 'react'
import ReactDOM from 'react-dom'
import { shallow, mount, find, render, simulate } from 'enzyme'
import enzymeSerializer from 'enzyme-to-json/serializer'

import { HealthDisplay } from './../components/HealthDisplay'

expect.addSnapshotSerializer(enzymeSerializer)
describe('HealthDisplay', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<HealthDisplay />, div)
  })

  let component
  let props

  beforeEach(() => {
    props = {
      currentHealth: 10,
      maxHealth: 100
    }
    component = mount(<ExpBar {...props} />)
  })

  it('contains correct number of div', () => {
    expect(component.find('div').length).toEqual(3)
  })

  it('receives correct current and max props', () => {
    expect(component.props().currentHealth).toEqual(10)
    expect(component.props().maxHealth).toEqual(100)
  })

  it('matches snapshot', () => {
    const comp = shallow(<HealthDisplay {...props} />)
    expect(comp).toMatchSnapshot()
  })
})
