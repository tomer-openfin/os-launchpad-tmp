import * as React from 'react';

// import { MOCK_CONTEXTS, MOCK_INTENTS } from '../../samples/FDC3';

import * as EditIcon from '../../assets/Edit.svg';

import { renderError } from '../../utils/renderError';
import { IconPreviewMeta, IconPreviewMetaWrapper, IconPreviewWrapper, StyledForm, StyledRow } from './AppForm.css';

// import CheckboxInArray from '../CheckboxInArray';
import { ValueType } from 'react-select/lib/types';
import Dropdown, { OptionType } from '../Dropdown';
import FormFooter from '../FormFooter';
import ImagePreview from '../ImagePreview';
import ImageUpload from '../ImageUpload';
import Input from '../Input';
import Label from '../Label';
import Modal from '../Modal';
import ScrollGrid, { /* CheckboxWrapper, */ RowWrapper } from '../Responsive';
import SvgIcon from '../SvgIcon';
import TextArea from '../TextArea';

interface Touched {
  // contexts?: boolean;
  // images?: boolean;
  // intents?: boolean;
  appUrl?: boolean;
  appPath?: boolean;
  description?: boolean;
  icon?: boolean;
  id?: boolean;
  manifestUrl?: boolean;
  name?: boolean;
  title?: boolean;
}

interface Errors {
  // contexts?: Array<{ $type: string }>;
  // images?: string;
  // intents?: Array<{ $type: string }>;
  appUrl?: string;
  appPath?: string;
  description?: string;
  icon?: string;
  id?: string;
  name?: string;
  manifestUrl?: string;
  title?: string;
}

export enum ManifestType {
  AppUrl = 'appUrl',
  Manifest = 'manifest',
  Path = 'path',
}

const MANIFEST_OPTIONS = [{ label: 'App Url', value: 'appUrl' }, { label: 'Manifest', value: 'manifest' }, { label: 'Native App', value: 'path' }];

export interface Values {
  // contexts: Array<{ $type: string }>;
  // images?: Array<{ url: string }>;
  // intents?: Array<{ displayName: string; name: string }>;
  appUrl?: string;
  appPath?: string;
  description: string;
  icon: string;
  id: string;
  manifestType: ManifestType;
  manifestUrl?: string;
  name: string;
  title: string;
}

type SetFieldValue = <T extends keyof Values>(field: T, value: Values[T], shouldValidate?: boolean) => void;

interface Props {
  className?: string;
  errors: Errors;
  focusFieldOnInitialMount?: boolean;
  handleBlur: (e: React.FocusEvent) => void;
  handleCancel: () => void;
  handleChange: (e: React.ChangeEvent) => void;
  handleSubmit: () => void;
  isSubmitting?: boolean;
  isValid?: boolean;
  setFieldValue: SetFieldValue;
  touched: Touched;
  values: Values;
}

interface State {
  iconFormOpen: boolean;
}

const defaultState: State = { iconFormOpen: false };

class AppForm extends React.Component<Props, State> {
  state: State = defaultState;
  private inputField: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.inputField = React.createRef<HTMLInputElement>();
  }
  // TEMP: talk to product team
  // focusing field on mount disrupts cascade animations for NewApp form
  // componentDidMount() {
  //   if (this.props.focusFieldOnInitialMount) {
  //     this.focusInputField();
  //   }
  // }

  componentDidUpdate(prevProps: Props) {
    const {
      values: { manifestType: oldManifestType },
    } = prevProps;

    const {
      values: { manifestType: newManifestType },
    } = this.props;

    if (newManifestType !== oldManifestType) {
      this.focusInputField();
    }
  }

  focusInputField = () => {
    if (this.inputField.current) {
      this.inputField.current.focus();
    }
  };

  handleOpenIconForm = () => this.setState({ iconFormOpen: true });
  handleCloseIconForm = () => this.setState({ iconFormOpen: false });

  saveImage = (setFieldValue: SetFieldValue) => (imgSrc: string) => {
    setFieldValue('icon', imgSrc);

    this.handleCloseIconForm();
  };

  handleSelect = (setFieldValue: SetFieldValue) => (option: ValueType<OptionType>) => {
    if (option && !Array.isArray(option) && option.value) {
      setFieldValue('manifestType', option.value as ManifestType);
    }
  };

  // renderMockIntents = () => MOCK_INTENTS.map((intent, index) => <CheckboxInArray name="intents" key={index} value={intent.displayName} />);

  // renderMockContexts = () => MOCK_CONTEXTS.map((context, index) => <CheckboxInArray name="contexts" key={index} value={context.$type} />);

  // renderIntentsAndContextsRow = () => (
  //   <RowWrapper height="161px">
  //     <Label>
  //       <LabelText>Accepted Intent(s)</LabelText>

  //       <CheckboxWrapper>{this.renderMockIntents()}</CheckboxWrapper>
  //     </Label>

  //     <Label>
  //       <LabelText>Accepted Context(s)</LabelText>

  //       <CheckboxWrapper>{this.renderMockContexts()}</CheckboxWrapper>
  //     </Label>
  //   </RowWrapper>
  // );

  render() {
    const { className, errors, handleBlur, handleCancel, handleChange, handleSubmit, isSubmitting, isValid, setFieldValue, touched, values } = this.props;

    const { iconFormOpen } = this.state;

    return (
      <StyledForm className={className} onSubmit={handleSubmit}>
        <ScrollGrid>
          <StyledRow firstElementWidth="140px">
            <Label label="App Type">
              <Dropdown name="manifestType" onSelect={this.handleSelect(setFieldValue)} options={MANIFEST_OPTIONS} selected={values.manifestType} />
            </Label>

            {values.manifestType === ManifestType.AppUrl && (
              <Label index={1} label="App URL" renderError={renderError(errors.appUrl, touched.appUrl)}>
                <Input
                  hasError={!!errors.appUrl && touched.appUrl}
                  name="appUrl"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter app url"
                  ref={this.inputField}
                  value={values.appUrl}
                />
              </Label>
            )}

            {values.manifestType === ManifestType.Manifest && (
              <Label index={1} label="Manifest URL" renderError={renderError(errors.manifestUrl, touched.manifestUrl)}>
                <Input
                  hasError={!!errors.manifestUrl && touched.manifestUrl}
                  name="manifestUrl"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter manifest url"
                  ref={this.inputField}
                  value={values.manifestUrl}
                />
              </Label>
            )}

            {values.manifestType === ManifestType.Path && (
              <Label index={1} label="Native App" renderError={renderError(errors.appPath, touched.appPath)}>
                <Input
                  hasError={!!errors.appPath && touched.appPath}
                  name="appPath"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter path"
                  ref={this.inputField}
                  value={values.appPath}
                />
              </Label>
            )}
          </StyledRow>

          <Label index={2} label="App Title" renderError={renderError(errors.title, touched.title)}>
            <Input
              hasError={!!errors.title && touched.title}
              name="title"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Enter app title"
              value={values.title}
            />
          </Label>

          <RowWrapper firstElementWidth="100px" height="144px">
            <Label index={3} label="App Shortcut">
              <IconPreviewWrapper>
                <ImagePreview imgSrc={values.icon || ''} size={68} />

                <IconPreviewMetaWrapper>
                  <IconPreviewMeta>64x64</IconPreviewMeta>

                  <SvgIcon imgSrc={EditIcon} size={20} onClick={this.handleOpenIconForm} />
                </IconPreviewMetaWrapper>
              </IconPreviewWrapper>
            </Label>

            <Label index={4} label="Description" renderError={renderError(errors.description, touched.description)}>
              <TextArea
                hasError={!!errors.description && touched.description}
                height={118}
                name="description"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Enter description"
                value={values.description}
                width="100%"
              />
            </Label>
          </RowWrapper>

          {iconFormOpen && (
            <Modal handleClose={this.handleCloseIconForm}>
              <ImageUpload
                handleCancel={this.handleCloseIconForm}
                headerText={`Upload a new image asset for ${values.title}`}
                height="326px"
                saveImage={this.saveImage(setFieldValue)}
                width="420px"
              />
            </Modal>
          )}
        </ScrollGrid>
        <FormFooter isSubmitting={isSubmitting} submitDisabled={isSubmitting || !isValid} handleCancel={handleCancel} />;
      </StyledForm>
    );
  }
}

export default AppForm;
