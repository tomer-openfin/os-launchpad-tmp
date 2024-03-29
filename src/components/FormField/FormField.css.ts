import styled from 'styled-components';

import { Color, hexToRgba } from '../../styles';
import { TypeStyleArcturus, TypeStyleCanopus, TypeStyleDeneb } from '../../styles/typography.css';

interface Props {
  isValid?: boolean;
}

export const Error = styled.div`
  ${TypeStyleDeneb}

  bottom: -20px;
  color: ${Color.MARS};
  left: 0;
  position: absolute;
`;

export const LabelText = styled.div`
  ${TypeStyleArcturus}

  display: flex;
  color: ${Color.SUN};
`;

export const Label = styled.label<Props>`
  position: relative;
  display: flex;
  flex-direction: column;

  & > input {
    ${TypeStyleCanopus}
    padding: 7px 0 9px 9px;

    margin-top: 5px;
    max-height: 35px;
  }

  & > textarea {
    ${TypeStyleCanopus}

    padding: 7px 0 9px 9px;
    resize: none;
    margin-top: 10px;
    height: -webkit-fill-available;
  }

  & > input:focus {
    outline: none;
    color: ${({ isValid }) => (isValid ? `${Color.VACUUM}` : `${Color.MARS}`)};
    border: 3px solid ${({ isValid }) => hexToRgba(isValid ? Color.JUPITER : Color.MARS, 0.5)};
  }
`;
