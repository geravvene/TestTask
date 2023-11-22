import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import PaginationPage, { IPaginationPage } from './PaginationPage'; // Assuming the file is named PaginationPage.tsx

const mockOnClick = jest.fn();
const mockChildren = '1';
const mockClassName = 'custom-class';
const mockIsDarkTheme = true;

const defaultProps: IPaginationPage = {
  isDarkTheme: mockIsDarkTheme,
  disabled: false,
  onClick: mockOnClick,
  children: mockChildren,
  className: mockClassName,
};

describe('PaginationPage component', () => {
  beforeEach(() => render(<PaginationPage {...defaultProps} />));

  it('renders buttons text', () => {
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  it('has basic class', () => {
    expect(screen.getByRole('button')).toHaveClass('PaginationPage');
  });

  it('has custom class', () => {
    expect(screen.getByRole('button')).toHaveClass(mockClassName);
  });

  it('calls onClick when the button is clicked', async () => {
    await userEvent.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});

describe('PaginationPageDisabled component', () => {
  it('disables the button when disabled prop is true', () => {
    render(<PaginationPage {...defaultProps} disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
