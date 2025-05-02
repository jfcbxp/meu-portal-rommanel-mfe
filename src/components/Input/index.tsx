'use client';

import React, { InputHTMLAttributes, useState, ChangeEvent } from 'react';
import * as S from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  requiredText?: string;
  maxLength?: number;
  onValueChange?: (value: string) => void; // Callback for value change
}

const Input: React.FC<InputProps> = ({
  label,
  helperText,
  requiredText,
  maxLength,
  id,
  value: controlledValue,
  onChange,
  onValueChange,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(controlledValue || '');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    // Apply maxLength if provided
    if (maxLength === undefined || newValue.length <= maxLength) {
      setInternalValue(newValue);
      if (onChange) {
        onChange(event); // Propagate original event if needed
      }
      if (onValueChange) {
        onValueChange(newValue); // Call the specific value change handler
      }
    }
  };

  // Use controlledValue if provided, otherwise use internal state
  const displayValue =
    controlledValue !== undefined ? controlledValue : internalValue;
  const currentCharCount = displayValue?.toString().length || 0;

  return (
    <S.InputWrapper>
      {label && <S.Label htmlFor={id}>{label}</S.Label>}
      <S.StyledInput
        id={id}
        value={displayValue}
        onChange={handleChange}
        maxLength={maxLength} // Pass maxLength to the native input
        {...props}
      />
      {(requiredText || maxLength) && (
        <S.HelperText>
          {requiredText && <S.RequiredText>{requiredText}</S.RequiredText>}
          {maxLength && (
            <S.CharCount>
              {currentCharCount}/{maxLength}
            </S.CharCount>
          )}
        </S.HelperText>
      )}
      {helperText && !requiredText && !maxLength && (
        <S.HelperText>{helperText}</S.HelperText>
      )}
    </S.InputWrapper>
  );
};

export default Input;
