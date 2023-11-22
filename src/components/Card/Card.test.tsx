import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';

describe('Card component', () => {
  const mockName = 'Test Card';
  const mockDescription = [
    { id: 1, property: 'Property 1', value: 'Value 1' },
    { id: 2, property: 'Property 2', value: 'Value 2' },
  ];
  const mockChildren = <div>Mock Children</div>;
  const mockClassName = 'custom-class';

  beforeEach(() =>
    render(<Card name={mockName} description={mockDescription} children={mockChildren} className={mockClassName} />)
  );

  it('render card name', () => {
    expect(screen.getByText(mockName)).toBeInTheDocument();
  });

  it('renders description', () => {
    mockDescription.forEach((line) => {
      expect(screen.getByText(`${line.property}:`)).toBeInTheDocument();
      expect(screen.getByText(line.value)).toBeInTheDocument();
    });
  });
});
