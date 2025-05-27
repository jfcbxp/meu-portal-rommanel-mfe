import { FullScreenModalContainer } from './styles';

interface Properties {
  children?: React.ReactNode;
}

export default function FullScreenModal({ children }: Readonly<Properties>) {
  return <FullScreenModalContainer>{children}</FullScreenModalContainer>;
}
