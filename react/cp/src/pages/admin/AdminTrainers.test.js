import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminTrainers from './AdminTrainers';
import * as api from '../../services/api';

// MOCK MUST COME BEFORE IMPORTS OF COMPONENTS THAT USE THE ROUTER
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/admin/trainers' }),
  BrowserRouter: ({ children }) => <div>{children}</div>,
  MemoryRouter: ({ children }) => <div>{children}</div>,
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ children }) => <div>{children}</div>,
}));

jest.mock('../../services/api');

const mockTrainers = [
  { id: 1, name: 'JohnDoe', email: 'john@gmail.com', specialization: 'Yoga', experience: '5', role: 'trainer', contact: '1234567890' }
];

describe('AdminTrainers Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    api.getItems.mockResolvedValue({ data: mockTrainers });
  });

  test('renders trainer list and handles search', async () => {
    render(<AdminTrainers />);
    
    // Check initial render
    const trainerName = await screen.findByText('JohnDoe');
    expect(trainerName).toBeInTheDocument();

    // Test Search
    const searchInput = screen.getByPlaceholderText(/Search.../i);
    fireEvent.change(searchInput, { target: { value: 'NonExistent' } });
    expect(screen.queryByText('JohnDoe')).not.toBeInTheDocument();
  });

  test('validates email field on blur', async () => {
    render(<AdminTrainers />);
    fireEvent.click(screen.getByText(/Add Trainer/i));

    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'wrong@email.com' } });
    fireEvent.blur(emailInput);

    expect(await screen.findByText('Use a valid @gmail.com address')).toBeInTheDocument();
  });

  test('calls createItem on valid form submission', async () => {
    api.createItem.mockResolvedValue({ data: {} });
    render(<AdminTrainers />);
    
    fireEvent.click(screen.getByText(/Add Trainer/i));
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'JaneSmith' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'jane@gmail.com' } });
    fireEvent.change(screen.getByLabelText(/Contact/i), { target: { value: '9876543210' } });
    fireEvent.change(screen.getByLabelText(/Specialization/i), { target: { value: 'Fitness' } });
    fireEvent.change(screen.getByLabelText(/Experience/i), { target: { value: '3' } });

    fireEvent.click(screen.getByRole('button', { name: /Save/i }));

    await waitFor(() => {
      expect(api.createItem).toHaveBeenCalledWith('users', expect.objectContaining({ name: 'JaneSmith' }));
    });
  });
});
