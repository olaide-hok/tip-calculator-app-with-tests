'use client';

import {calculateTipPerPerson, calculateTotalPerPerson} from '@/utils';
import Image from 'next/image';
import {useState} from 'react';

type TipButtonsProps = {
    handleTipCalculation: (tip: number) => void;
};

export function TipButtons({handleTipCalculation}: TipButtonsProps) {
    return (
        <>
            {[5, 10, 15, 25, 50].map((tip) => (
                <button
                    type="button"
                    className="btn"
                    key={tip}
                    onClick={() => handleTipCalculation(tip)}>
                    {tip}%
                </button>
            ))}
        </>
    );
}

type ResultsProps = {
    tipAmountPerPerson: string;
    totalPerPerson: string;
};

export function Results({tipAmountPerPerson, totalPerPerson}: ResultsProps) {
    return (
        <div className="wrapper">
            <div className="tip_amount">
                <p>
                    Tip Amount
                    <br />
                    <span> / person </span>
                </p>
                <span className="value" id="tipAmountPerPerson">
                    {tipAmountPerPerson}
                </span>
            </div>
            <div className="total">
                <p>
                    Total <br />
                    <span> / person </span>
                </p>
                <span className="value" id="totalPerPerson">
                    {totalPerPerson}
                </span>
            </div>
        </div>
    );
}

export default function Home() {
    const [bill, setBill] = useState<number | ''>('');
    const [numOfPeople, setNumOfPeople] = useState<number | ''>('');
    const [customTip, setCustomTip] = useState<number | ''>('');
    const [tipAmountPerPerson, setTipAmountPerPerson] = useState('0.00');
    const [totalPerPerson, setTotalPerPerson] = useState('0.00');
    const [error, setError] = useState(false);

    const handleTipCalculation = (tipPercentage: number) => {
        if (!numOfPeople || numOfPeople <= 0) {
            setError(true);
            return;
        }
        setError(false);

        if (!bill || isNaN(Number(bill))) return;

        const percentTip = tipPercentage * 0.01 * Number(bill);
        setTipAmountPerPerson(
            calculateTipPerPerson(percentTip, Number(numOfPeople))
        );
        setTotalPerPerson(
            calculateTotalPerPerson(
                Number(bill),
                percentTip,
                Number(numOfPeople)
            )
        );
    };

    const handleReset = () => {
        setBill('');
        setNumOfPeople('');
        setCustomTip('');
        setTipAmountPerPerson('0.00');
        setTotalPerPerson('0.00');
        setError(false);
    };

    return (
        <main className="container">
            <div className="logo">
                <Image
                    src="/logo.svg"
                    alt="spliter-logo"
                    width={32}
                    height={32}
                />
            </div>
            <div className="calculator">
                <div className="inputs">
                    <div className="bill">
                        <label htmlFor="bill" className="text-regular-semibold">
                            Bill
                        </label>
                        <div className="icon-input_wrapper">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="11"
                                height="17"
                                viewBox="0 0 11 17"
                                fill="none">
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M6.01586 16.328V14.864C7.24786 14.784 8.23586 14.42 8.97986 13.772C9.72386 13.124 10.0959 12.264 10.0959 11.192V11.048C10.0959 10.056 9.74786 9.276 9.05186 8.708C8.35586 8.14 7.34386 7.776 6.01586 7.616V4.184C6.57586 4.328 7.02786 4.584 7.37186 4.952C7.71586 5.32 7.88786 5.768 7.88786 6.296V6.584H9.71186V6.152C9.71186 5.704 9.62386 5.276 9.44786 4.868C9.27186 4.46 9.02386 4.088 8.70386 3.752C8.38386 3.416 7.99586 3.132 7.53986 2.9C7.08386 2.668 6.57586 2.504 6.01586 2.408V0.872002H4.28786V2.36C3.79186 2.408 3.31986 2.516 2.87186 2.684C2.42386 2.852 2.03186 3.076 1.69586 3.356C1.35986 3.636 1.09186 3.972 0.891859 4.364C0.691859 4.756 0.591859 5.208 0.591859 5.72V5.864C0.591859 6.824 0.907859 7.572 1.53986 8.108C2.17186 8.644 3.08786 8.992 4.28786 9.152V13.064C3.58386 12.904 3.03986 12.592 2.65586 12.128C2.27186 11.664 2.07986 11.048 2.07986 10.28V9.992H0.255859V10.568C0.255859 11.032 0.335859 11.492 0.495859 11.948C0.655859 12.404 0.899859 12.828 1.22786 13.22C1.55586 13.612 1.97186 13.948 2.47586 14.228C2.97986 14.508 3.58386 14.704 4.28786 14.816V16.328H6.01586ZM4.28786 7.424C3.59986 7.296 3.12386 7.092 2.85986 6.812C2.59586 6.532 2.46386 6.168 2.46386 5.72C2.46386 5.256 2.63986 4.888 2.99186 4.616C3.34386 4.344 3.77586 4.168 4.28786 4.088V7.424ZM6.01586 9.344V13.136C6.70386 13.056 7.24386 12.848 7.63586 12.512C8.02786 12.176 8.22386 11.736 8.22386 11.192C8.22386 10.632 8.04786 10.216 7.69586 9.944C7.34386 9.672 6.78386 9.472 6.01586 9.344Z"
                                    fill="#9EBBBD"
                                />
                            </svg>

                            <input
                                id="bill"
                                type="number"
                                value={bill}
                                onChange={(e) =>
                                    setBill(
                                        e.target.value
                                            ? Number(e.target.value)
                                            : ''
                                    )
                                }
                            />
                        </div>
                    </div>
                    <div className="select-tip">
                        <p className="text-regular-semibold">Select Tip %</p>
                        <div className="btn-wrapper">
                            <TipButtons
                                handleTipCalculation={handleTipCalculation}
                            />

                            <input
                                id="customTip"
                                type="number"
                                placeholder="Custom"
                                value={customTip}
                                onChange={(e) =>
                                    setCustomTip(
                                        e.target.value
                                            ? Number(e.target.value)
                                            : ''
                                    )
                                }
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && customTip) {
                                        handleTipCalculation(Number(customTip));
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="numOfPeople">
                        <div className="labelAndErrorText_wrapper">
                            <label
                                htmlFor="numOfPeople"
                                className="text-regular-semibold">
                                Number of People
                            </label>
                            <span id="numOfPeopleErrorText" className="d-none">
                                Can&apos;t be zero
                            </span>
                        </div>
                        <div className="icon-input_wrapper">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="13"
                                height="16"
                                viewBox="0 0 13 16"
                                fill="none">
                                <path
                                    d="M6.59852 7.70722C5.56736 7.70722 4.67445 7.32746 3.94488 6.5782C3.21532 5.82906 2.84548 4.91244 2.84548 3.85349C2.84548 2.7949 3.21532 1.87816 3.945 1.12878C4.67469 0.379758 5.56748 0 6.59852 0C7.62981 0 8.52248 0.379758 9.25204 1.1289C9.98161 1.87804 10.3516 2.79478 10.3516 3.85349C10.3516 4.91244 9.98161 5.82918 9.25192 6.57832C8.52224 7.32734 7.62945 7.70722 6.59852 7.70722Z"
                                    fill="#9EBBBD"
                                />
                                <path
                                    d="M0.0315027 12.3031C0.0525446 11.9914 0.0951042 11.6513 0.157754 11.2921C0.220998 10.9303 0.30243 10.5883 0.399912 10.2757C0.500604 9.95256 0.637553 9.63347 0.806838 9.32769C0.982543 9.01031 1.18892 8.73394 1.4205 8.50652C1.66266 8.26861 1.95914 8.07733 2.30199 7.9378C2.64365 7.79901 3.02229 7.7287 3.42731 7.7287C3.58637 7.7287 3.7402 7.79571 4.03728 7.99432C4.22012 8.11676 4.43398 8.25836 4.6727 8.41497C4.87681 8.54852 5.15333 8.67364 5.49487 8.78692C5.82809 8.89764 6.16642 8.95379 6.50036 8.95379C6.83429 8.95379 7.1725 8.89764 7.50608 8.78692C7.84727 8.67376 8.12378 8.54864 8.32766 8.41509C8.56411 8.25994 8.7781 8.11834 8.96367 7.9942C9.26039 7.79559 9.41434 7.72858 9.5734 7.72858C9.97855 7.72858 10.3571 7.79901 10.6986 7.93793C11.0412 8.07721 11.3378 8.26849 11.5802 8.50665C11.8117 8.73418 12.0182 9.01043 12.1936 9.32769C12.3628 9.63347 12.4998 9.95244 12.6006 10.2758C12.6979 10.5884 12.7794 10.9303 12.8426 11.2921C12.9053 11.6508 12.9478 11.991 12.9689 12.3035C12.9895 12.6096 13 12.9274 13 13.2483C13 14.0835 12.7414 14.7597 12.2316 15.2583C11.728 15.7504 11.0617 16 10.2514 16H2.74862C1.93834 16 1.27225 15.7505 0.768559 15.2583C0.258564 14.76 0 14.0838 0 13.2482C0.000119209 12.9258 0.0106983 12.6078 0.0315027 12.3031Z"
                                    fill="#9EBBBD"
                                />
                            </svg>
                            <input
                                id="numOfPeople"
                                type="number"
                                value={numOfPeople}
                                onChange={(e) =>
                                    setNumOfPeople(
                                        e.target.value
                                            ? Number(e.target.value)
                                            : ''
                                    )
                                }
                                className={error ? 'error' : ''}
                                placeholder="0"
                                min="1"
                            />
                        </div>
                    </div>
                </div>
                <div className="tip-result">
                    <Results
                        tipAmountPerPerson={tipAmountPerPerson}
                        totalPerPerson={totalPerPerson}
                    />
                    <button
                        type="button"
                        id="resetBtn"
                        className="resetBtn"
                        onClick={handleReset}>
                        Reset
                    </button>
                </div>
            </div>
        </main>
    );
}
