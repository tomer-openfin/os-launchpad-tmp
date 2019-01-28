import { Field, FieldProps } from 'formik';
import * as React from 'react';

import Logo from '../Logo/Logo';

import { Input, InputWrapper, LogoWrapper, Placeholder, Wrapper } from './LogoInput.css';

const FILE_ACCEPT = 'image/*';

interface Props {
  fileInputId?: string;
  logo: string;
  name: string;
  handleFileChange: Function;
}

interface State {
  draggedOver: boolean;
}

class LogoInput extends React.PureComponent<Props, State> {
  state = {
    draggedOver: false,
  };

  handleDragEnter = () => {
    this.setState({ draggedOver: true });
  };

  handleDragExit = () => {
    this.setState({ draggedOver: false });
  };

  renderFileInput = ({ field }: FieldProps) => {
    const { handleFileChange, fileInputId } = this.props;

    return (
      <Input
        {...field}
        accept={FILE_ACCEPT}
        id={fileInputId}
        onChange={handleFileChange(field.onChange)}
        onDragEnter={this.handleDragEnter}
        onDragLeave={this.handleDragExit}
        onDrop={this.handleDragExit}
        type="file"
      />
    );
  };

  renderInput = () => {
    const { name } = this.props;

    return (
      <InputWrapper>
        <Placeholder>Click & drag a new image over the existing one to replace your brand logo.</Placeholder>

        <Field name={name} render={this.renderFileInput} />
      </InputWrapper>
    );
  };

  render() {
    const { logo } = this.props;
    const { draggedOver } = this.state;

    return (
      <Wrapper active={draggedOver}>
        <LogoWrapper>
          <Logo imgSrc={logo} />
        </LogoWrapper>

        {this.renderInput()}
      </Wrapper>
    );
  }
}

export default LogoInput;
