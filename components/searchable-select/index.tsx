import React from "react";
import Select from "react-select";
import styled from "@emotion/styled";
import theme from "@chakra-ui/theme";
import { useColorMode } from "@chakra-ui/color-mode";
import { FormControl, FormLabel } from "@chakra-ui/form-control";

const StyledSelect = styled(Select)`
  position: relative;
  font-size: 14px;
  top: 1px;
  .react-select__placeholder {
    padding-left: 5px;
    color: ${({ isDark }) =>
      isDark ? theme.colors.gray[500] : theme.colors.gray[400]};
  }
  .react-select__control {
    background: ${({ isDark }) => isDark && `rgba(255, 255, 255, 0.06)`};
    border: ${({ isDark }) =>
      `1px solid ${isDark ? theme.colors.gray[700] : "#E2E8F0"}`};
    input {
      color: ${({ isDark }) => isDark && "white !important"};
    }
  }
  .react-select__single-value {
    p {
      color: ${({ isDark }) => isDark && theme.colors.gray[300]} !important;
    }
  }
  .react-select__menu-list {
    background-color: ${({ isDark }) => isDark && theme.colors.gray[700]};
  }
  .react-select__option--is-focused {
    background: ${({ isDark }) => isDark && theme.colors.gray[500]};
  }
`;

const SearchableSelect = ({
  options,
  selectedValue,
  setSelectedValue,
  label,
}) => {
  const { colorMode } = useColorMode();

  return (
    <FormControl>
      <FormLabel fontSize="sm">{label}</FormLabel>
      <StyledSelect
        isDark={colorMode === "dark"}
        className="react-select-container"
        classNamePrefix="react-select"
        placeholder="Select an endpoint"
        isClearable
        options={options}
        value={selectedValue}
        onChange={(v) => {
          setSelectedValue(v);
        }}
      />
    </FormControl>
  );
};

export default SearchableSelect;
