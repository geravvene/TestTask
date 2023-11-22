import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import FilterUL, { IFilterUL } from './FilterUL';

describe('FilterUL component', () => {
  const mockData: IFilterUL['data'] = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ];

  const mockChange = jest.fn();
  const mockIsDark = true;

  beforeEach(() => render(<FilterUL data={mockData} change={mockChange} isDark={mockIsDark} />));

  it('render list', () => {
    mockData.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  it('render buttons', () => {
    expect(screen.getAllByRole('button').length).toBe(mockData.length);
  });

  it('triggers change function on button click', async () => {
    await userEvent.click(screen.getAllByRole('button')[0]);
    expect(mockChange).toHaveBeenCalledTimes(1);
  });
});
