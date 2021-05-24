import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import Link from 'next/link';
import { allStates } from '../utils/index';

const StateSearch = ({ endpoint }) => {
  const router = useRouter();
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (value == null) return;
    router.push(`/${endpoint}/${value}`);
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  return (
    <>
      <Autocomplete
        // id="field1"
        options={allStates}
        value={value}
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              label="For Detailed Data, Choose a US State"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                startAdornment: value && (
                  <>
                    <InputAdornment position="start">
                      <CircularProgress />
                    </InputAdornment>
                  </>
                ),
              }}
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password',
              }}
            />
          );
        }}
      />
    </>
  );
};

export default StateSearch;
