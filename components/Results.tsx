type ResultsProps = {
    tipAmountPerPerson: string;
    totalPerPerson: string;
};

export default function Results({
    tipAmountPerPerson,
    totalPerPerson,
}: ResultsProps) {
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
