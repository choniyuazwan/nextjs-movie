import '@testing-library/jest-dom';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';
import Search from '../pages/search';

jest.mock('next/router', ()=> ({push: jest.fn()}));

describe('Search page', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      query: {page: 3, searchkey: 'a'},
      total_pages: 10,
    };
  });

  afterEach(() => {
    mockProps = {};
    cleanup();
  });

  test('should render correctly', () => {
    const { container } = render(<Search {...mockProps} />);
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test('should call proper url when user click number page', async () => {
    const { getByTestId } = render(<Search {...mockProps} />);
    await waitFor(() => {
      userEvent.click(getByTestId('button-page-3'));
      expect(Router.push).toHaveBeenCalledWith('/search/?searchkey=a&page=3');
    });
  });

  test('should call proper url when user click first page', async () => {
    const { getByTestId } = render(<Search {...mockProps} />);
    await waitFor(() => {
      userEvent.click(getByTestId('first-page-button'));
      expect(Router.push).toHaveBeenCalledWith('/search/?searchkey=a&page=1');
    });
  });

  test('should call proper url when user click prev page', async () => {
    const { getByTestId } = render(<Search {...mockProps} />);
    await waitFor(() => {
      userEvent.click(getByTestId('button-prev-page'));
      expect(Router.push).toHaveBeenCalledWith('/search/?searchkey=a&page=2');
    });
  });

  test('should call proper url when user click next page', async () => {
    const { getByTestId } = render(<Search {...mockProps} />);
    await waitFor(() => {
      userEvent.click(getByTestId('button-next-page'));
      expect(Router.push).toHaveBeenCalledWith('/search/?searchkey=a&page=4');
    });
  });

  test('should call proper url when user click last page', async () => {
    const { getByTestId } = render(<Search {...mockProps} />);
    await waitFor(() => {
      userEvent.click(getByTestId('button-last-page'));
      expect(Router.push).toHaveBeenCalledWith('/search/?searchkey=a&page=10');
    });
  });

  test('should call proper url when user searching', async () => {
    const { getByTestId } = render(<Search {...mockProps} />);
    await waitFor(() => {
      userEvent.click(getByTestId('search-button'));
      expect(Router.push).toHaveBeenCalledWith('/');
    });
  });
});
