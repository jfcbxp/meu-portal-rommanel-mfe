import { styled } from 'styled-components';

interface Properties {
  children?: React.ReactNode;
}

export default function FullScreenModal({ children }: Readonly<Properties>) {
  return <FullScreenModalContainer>{children}</FullScreenModalContainer>;
}

const FullScreenModalContainer = styled.div`
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;
