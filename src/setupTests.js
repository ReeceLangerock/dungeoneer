import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

Enzyme.configure({ adapter: new Adapter() });

global.requestAnimationFrame = function(callback) {
    setTimeout(callback, 0);
  };