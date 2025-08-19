// Helper functions
export const calculateTipPerPerson = (
    percentTip: number,
    numOfPeople: number
): string => {
    return (percentTip / numOfPeople).toFixed(2);
};

export const calculateTotalPerPerson = (
    bill: number,
    percentTip: number,
    people: number
): string => {
    const billPerPerson = bill / people;
    const tipPerPerson = percentTip / people;
    return (billPerPerson + tipPerPerson).toFixed(2);
};
