import React from 'react'
import ReactDOM from 'react-dom'
import { shallow, mount, find, render, simulate } from 'enzyme'
import enzymeSerializer from 'enzyme-to-json/serializer'

import { InfoDisplay } from './../components/InfoDisplay'

expect.addSnapshotSerializer(enzymeSerializer)
describe('InfoDisplay', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<InfoDisplay />, div)
  })

  let component
  let props

  beforeEach(() => {
    props = {
      weapon: 'knife',
      attack: 7,
      level: 0
    }
    component = mount(<InfoDisplay {...props} />)
  })

  it('contains correct number of h1', () => {
    expect(component.find('h5').length).toEqual(3)
  })

  it('text div display correct info', () => {
    expect(component.find('h5').at(0).text()).toEqual(`weapon: knife`)
    expect(component.find('h5').at(1).text()).toEqual(`attack: 7`)
    expect(component.find('h5').at(2).text()).toEqual(`level: 0`)
  })

  it('matches snapshot', () => {
    const comp = shallow(<InfoDisplay {...props} />)
    expect(comp).toMatchSnapshot()
  })
})
