import { InputMask, InputMaskProps } from 'primereact/inputmask';
import styled from 'styled-components';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

// Style the PrimeReact InputMask using styled()
const StyledInputMask = styled(InputMask)`
  padding: ${({ theme }) => theme.spacing.medium};
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: 1rem; // 16px
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(93, 58, 123, 0.2); // Sombra roxa clara no foco
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
  }
`;

const HelperTextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem; // 12px
  color: ${({ theme }) => theme.colors.textLight};
  margin-top: ${({ theme }) => theme.spacing.small};
`;

const Label = styled.label`
  font-size: 0.875rem; // 14px
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

export default function CPF(properties: InputMaskProps) {
  const rawCpf = properties.value.replace(/\D/g, '');
  const charCount = rawCpf.length;

  const handleOnFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!rawCpf) {
      event.target.setSelectionRange(0, 0);
    }
  };

  const handleOnClick = (event: React.MouseEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;

    if (document.activeElement === input && !rawCpf) {
      input.setSelectionRange(0, 0);
    }
  };

  return (
    <InputWrapper>
      <Label htmlFor="cpf">CPF</Label>
      <StyledInputMask
        {...properties}
        mask="999.999.999-99"
        placeholder="111.111.111-11"
        onFocus={handleOnFocus}
        onClick={handleOnClick}
        required
        autoClear={false}
        unmask={false} // Keep mask
      />
      <HelperTextContainer>
        <span>Campo obrigatório</span>
        <span>{charCount}/11</span>
      </HelperTextContainer>
    </InputWrapper>
  );
}
