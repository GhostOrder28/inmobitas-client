import ErrorMessage from './error-message.component';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

describe('ErrorMessage', () => {
  it('should render with message', () => {
    const wrapper = render(<ErrorMessage fieldErrorMsg={'this is an error'} />)
    expect(wrapper).toMatchSnapshot();
  })

  it('should render nothing', () => {
    render(<ErrorMessage fieldErrorMsg={undefined} />);
    const errorMessageContainer = screen.queryByTestId('error-message-container');
    expect(errorMessageContainer).not.toBeInTheDocument();
  })
})
