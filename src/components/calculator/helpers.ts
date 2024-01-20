export const getResult = (firstOperand: number, secondOperand: number, operator: string) => {
    if (operator === "/" && secondOperand === 0) {
        return 0;
    } else {
        switch (operator) {
            case "+":
                return firstOperand + secondOperand;
            case "-":
                return firstOperand - secondOperand;
            case "*":
                return firstOperand * secondOperand;
            default:
                return 0;
        }
    }
}
