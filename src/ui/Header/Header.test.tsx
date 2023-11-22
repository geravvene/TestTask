import { render } from '@testing-library/react';
import Header from './Header';
import '@testing-library/jest-dom';

describe('Header component', () => {
  it('renders correctly', () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});
