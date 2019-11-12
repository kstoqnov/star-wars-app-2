import React from 'react';
import ReactDOM from 'react-dom';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<>RenderWithThemeForTest(App)</>, div);
  ReactDOM.unmountComponentAtNode(div);
});

// test('Link changes the class when hovered', () => {
//   const component = renderer.create(
//     App,
//   );
  
//   expect(component).toMatchSnapshot();

// });