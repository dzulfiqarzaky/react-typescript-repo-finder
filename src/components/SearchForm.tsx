import React from 'react';
import { Input, Button } from 'antd';
import styled from 'styled-components';
import { SearchFormProps } from '../common/interfaces';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledInput = styled(Input)`
  width: 100%;
  margin-bottom: 10px;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit, value, onChange }) => {
  return (
    <FormContainer onSubmit={onSubmit}>
      <StyledInput
        size="large"
        onChange={onChange}
        value={value}
        placeholder="Enter username"
      />
      <StyledButton type="primary" htmlType="submit" size="large">
        Search
      </StyledButton>
    </FormContainer>
  );
};

export default SearchForm;
