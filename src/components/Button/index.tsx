'use client';

import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import * as S from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'filter' | 'copy';
  isLoading?: boolean;
  icon?: ReactNode; // Optional icon prop
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading = false,
  disabled,
  icon,
  ...props
}) => {
  return (
    <S.StyledButton
      variant={variant}
      isLoading={isLoading}
      disabled={disabled || isLoading} // Disable button when loading
      {...props}
    >
      {isLoading ? (
        <S.LoadingSpinner />
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </S.StyledButton>
  );
};

export default Button;
