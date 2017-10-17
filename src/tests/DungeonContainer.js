import React from 'react'
import ReactDOM from 'react-dom'
import { shallow, mount, find, render, simulate } from 'enzyme'
import enzymeSerializer from 'enzyme-to-json/serializer'

import { DungeonContainer } from './../components/DungeonContainer'

expect.addSnapshotSerializer(enzymeSerializer)
describe('DungeonContainer', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<DungeonContainer />, div)
  })

  let component
  let props

  beforeEach(() => {
    props = {

    }
    component = shallow(<DungeonContainer {...props} />)
  })

  it('renders correct number of cells', () => {
    expect(component.find(Cell).length).toBe(60 * 60)
  })

  it('receives a method', () => {
    // expect(component.props()).toEqual('')
  })

  it('matches snapshot', () => {
    const comp = shallow(<DungeonContainer {...props} />)
    expect(comp).toMatchSnapshot()
  })
})
