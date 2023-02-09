import { fireEvent, screen } from '@testing-library/react'
import { UsersSearch } from 'src/app/components/mainPage/components/usersSearch/usersSearch';
import { renderWithProviders } from 'src/app/utils/testsUtils';
import { describe, expect } from 'vitest';

describe('UsersSearch', () => {
  it('button to perform search should be disabled when search input is empty', () => {
    renderWithProviders(<UsersSearch />)
    const isDisabled = screen.getByRole('button').attributes.getNamedItem('disabled');
    expect(isDisabled).toBeTruthy();
  });

  it('button to perform search should be enabled when search input is not empty', () => {
    renderWithProviders(<UsersSearch />)
    const searchInput = screen.getByPlaceholderText('Enter username') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'Batman' } });
    const isDisabled = screen.getByRole('button').attributes.getNamedItem('disabled');
    expect(isDisabled).toBeFalsy();
  });
});
