type TipButtonsProps = {
    handleTipCalculation: (tip: number) => void;
    selectedTip: number | null;
    customTip: number | '';
    setCustomTip: React.Dispatch<React.SetStateAction<number | ''>>;
};

export default function TipButtons({
    handleTipCalculation,
    selectedTip,
    customTip,
    setCustomTip,
}: TipButtonsProps) {
    const handleButtonClick = (tip: number) => {
        setCustomTip(''); // Clear custom input when button is clicked
        handleTipCalculation(tip);
    };

    const handleCustomTipChange = (value: string) => {
        setCustomTip(value ? Number(value) : '');
    };

    const handleCustomTipSubmit = () => {
        if (customTip) {
            handleTipCalculation(Number(customTip));
        }
    };

    const handleCustomTipKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && customTip) {
            handleTipCalculation(Number(customTip));
        }
    };

    return (
        <>
            {[5, 10, 15, 25, 50].map((tip) => (
                <button
                    type="button"
                    className={`btn ${selectedTip === tip ? 'btn-active' : ''}`}
                    key={tip}
                    onClick={() => handleButtonClick(tip)}>
                    {tip}%
                </button>
            ))}
            <input
                id="customTip"
                type="number"
                placeholder="Custom"
                value={customTip}
                onChange={(e) => handleCustomTipChange(e.target.value)}
                onKeyDown={handleCustomTipKeyDown}
                onBlur={handleCustomTipSubmit}
            />
        </>
    );
}
