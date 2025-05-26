import { InputMaskProps } from 'primereact/inputmask';
import {
  Container,
  HelperTextContainer,
  Label,
  StyledInputMask,
} from './styles';

export default function CPF(properties: Readonly<InputMaskProps>) {
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
    <Container>
      <Label htmlFor="cpf">CPF</Label>
      <StyledInputMask
        {...properties}
        mask="999.999.999-99"
        placeholder="111.111.111-11"
        onFocus={handleOnFocus}
        onClick={handleOnClick}
        required
        autoClear={false}
        unmask={true}
      />
      <HelperTextContainer>
        <span>Campo obrigatório</span>
        <span>{charCount}/11</span>
      </HelperTextContainer>
    </Container>
  );
}
