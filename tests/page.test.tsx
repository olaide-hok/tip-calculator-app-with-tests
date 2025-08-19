import {expect, describe, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home, {Results, TipButtons} from '../app/page';

describe('Home', () => {
    it('renders Home component', () => {
        render(<Home />);
        expect(screen.getByText('Bill')).toBeInTheDocument();
    });
});

describe('Bill input with user-event', () => {
    it('renders label and input', () => {
        render(<Home />);
        const input = screen.getByLabelText(/bill/i);
        expect(input).toBeInTheDocument();
    });

    it('lets user type in the bill input', async () => {
        render(<Home />);
        const input = screen.getByLabelText(/bill/i) as HTMLInputElement;

        await userEvent.type(input, '100');
        expect(input).toBeInTheDocument();

        // clear input
        await userEvent.clear(input);
        expect(input.value).toBe('');
    });
});

describe('Custom tip input with user-event', () => {
    it('renders input with custom placeholder', () => {
        render(<Home />);
        const input = screen.getByPlaceholderText(/custom/i);
        expect(input).toBeInTheDocument();
    });

    it('lets user type in the custom tip input', async () => {
        render(<Home />);
        const input = screen.getByPlaceholderText(
            /custom/i
        ) as HTMLInputElement;

        await userEvent.type(input, '100');
        expect(input).toBeInTheDocument();

        // clear input
        await userEvent.clear(input);
        expect(input.value).toBe('');
    });
});

describe('Number of people input with user-event', () => {
    it('renders label and input', () => {
        render(<Home />);
        const input = screen.getByLabelText(/number of people/i);
        expect(input).toBeInTheDocument();
    });

    it('lets user type in the number of people input', async () => {
        render(<Home />);
        const input = screen.getByLabelText(
            /number of people/i
        ) as HTMLInputElement;

        await userEvent.type(input, '5');
        expect(input).toBeInTheDocument();

        // clear input
        await userEvent.clear(input);
        expect(input.value).toBe('');
    });
});

describe('Tip buttons', () => {
    it('renders tip buttons', () => {
        const mockHandler = vi.fn();
        render(<TipButtons handleTipCalculation={mockHandler} />);

        [5, 10, 15, 25, 50].forEach((tip) => {
            expect(screen.getByText(`${tip}%`)).toBeInTheDocument();
        });
    });

    it('calls handleTipCalculation', async () => {
        const mockHandler = vi.fn();
        render(<TipButtons handleTipCalculation={mockHandler} />);

        const button15 = screen.getByRole('button', {name: '15%'});
        await userEvent.click(button15);

        expect(mockHandler).toHaveBeenCalledTimes(1);
        expect(mockHandler).toHaveBeenCalledWith(15);

        const button50 = screen.getByRole('button', {name: '50%'});
        await userEvent.click(button50);

        expect(mockHandler).toHaveBeenCalledTimes(2);
        expect(mockHandler).toHaveBeenLastCalledWith(50);
    });
});

describe('Results', () => {
    it('renders labels correctly', () => {
        render(<Results tipAmountPerPerson="5.25" totalPerPerson="10.50" />);

        expect(screen.getByText(/tip amount/i)).toBeInTheDocument();
        expect(screen.getByText(/total/i)).toBeInTheDocument();
        expect(screen.getAllByText(/\/ person/i)).toHaveLength(2);
    });

    it('renders correct tip and total values', () => {
        render(<Results tipAmountPerPerson="7.30" totalPerPerson="15.60" />);

        expect(screen.getByText('7.30')).toBeInTheDocument();
        expect(screen.getByText('15.60')).toBeInTheDocument();
    });
});
