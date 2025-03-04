interface NumberPadProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  maxQuantity: number;
}

const NumberPad = ({ value, onChange, onSubmit, maxQuantity }: NumberPadProps) => {
  const handleNumberClick = (num: number) => {
    const newValue = value === '0' ? num.toString() : value + num.toString();
    if (parseInt(newValue) <= maxQuantity) {
      onChange(newValue);
    }
  };

  const handleClear = () => {
    onChange('');
  };

  const numbers = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ['C', 0, 'Go']
  ];

  const currentValue = parseInt(value) || 0;

  return (
    <div className="grid grid-cols-3 gap-1">
      {numbers.map((row, rowIndex) => 
        row.map((num, colIndex) => {
          const isNumber = typeof num === 'number';
          const isDisabled = isNumber && num > maxQuantity;
          const isSelected = isNumber && value.includes(num.toString());
          
          return (
            <button
              key={`${rowIndex}-${colIndex}`}
              onClick={() => {
                if (num === 'C') handleClear();
                else if (num === 'Go') onSubmit();
                else if (!isDisabled) handleNumberClick(num as number);
              }}
              disabled={isDisabled || (num === 'Go' && currentValue === 0)}
              className={`
                p-2 text-sm font-medium rounded transition-colors
                ${num === 'Go'
                  ? currentValue === 0
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                  : num === 'C'
                    ? 'bg-gray-200 hover:bg-gray-300'
                    : isDisabled
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : isSelected
                        ? 'bg-blue-100 hover:bg-blue-200'
                        : 'bg-gray-100 hover:bg-gray-200'
                }
              `}
            >
              {num}
            </button>
          );
        })
      )}
    </div>
  );
};

export default NumberPad; 