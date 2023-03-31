import React, { ChangeEvent } from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';

// ----------------------------------------------------------------------

type QuickSearchToolbarProps = {
  value: string,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  onClear: () => void,
};

const QuickSearchToolbar: React.FC<QuickSearchToolbarProps> = ({ value, onChange, onClear }) => (
    <Box
      sx={{ pb: 2 }}
    >
      <TextField
        value={value}
        onChange={onChange}
        placeholder="Search…"
        InputProps={{
          startAdornment: <SearchIcon sx={{ mr: 1 }} fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: value ? 'visible' : 'hidden' }}
              onClick={onClear}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
        sx={{
          width: {
            xs: 1,
            sm: 0.5,
          },
        }}
      />
    </Box>
  )

export default QuickSearchToolbar;
