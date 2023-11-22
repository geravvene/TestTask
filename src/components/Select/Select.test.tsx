import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Select, { ISelect } from './Select';

const mockChildren = <div>Mock Children</div>;
const mockName = 'TestSelect';
const mockClear = jest.fn();
const mockValue = 'test';
const mockIsDark = true;
const mockAbsolute = true;

const defaultProps: ISelect = {
  children: mockChildren,
  isDark: mockIsDark,
  value: undefined,
  name: mockName,
  absolute: mockAbsolute,
  clear: mockClear,
};

describe('Select component with value', () => {
  beforeEach(() => render(<Select {...{ ...defaultProps, value: mockValue }} />));

  it('renders select', () => {
    expect(screen.getByRole('select')).toBeInTheDocument();
  });

  it('renders select value', () => {
    expect(screen.getByText(mockValue)).toBeInTheDocument();
  });

  it('renders select reset', () => {
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders select arrow', () => {
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls clear function when reset button is clicked', async () => {
    await userEvent.click(screen.getByRole('button'));
    expect(mockClear).toHaveBeenCalledTimes(1);
  });

  it('toggles active state when clicked', async () => {
    const selectElement = screen.getByRole('select');

    await userEvent.click(selectElement);
    expect(selectElement).toHaveClass('active');

    await userEvent.click(selectElement);
    expect(selectElement).not.toHaveClass('active');
  });
});

describe('Select component', () => {
  beforeEach(() => render(<Select {...defaultProps} />));

  it('renders select name', () => {
    expect(screen.getByText(mockName)).toBeInTheDocument();
  });

  it('renders select arrow', () => {
    expect(screen.getByText(mockName).querySelector('svg')).toBeInTheDocument();
  });
});
