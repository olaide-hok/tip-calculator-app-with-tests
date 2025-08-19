type TipButtonsProps = {
    handleTipCalculation: (tip: number) => void;
};

export default function TipButtons({handleTipCalculation}: TipButtonsProps) {
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
