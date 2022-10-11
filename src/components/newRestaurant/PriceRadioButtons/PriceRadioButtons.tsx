import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Box } from '@mui/material';
import './PriceRadioButtons.css'

export default function PriceRadioButtons(props: { onChange: React.ChangeEventHandler, value: '$' | '$$' | '$$$' | '$$$$' }) {
    return (
        <Box sx={{ my: '8px' }} className='price-radio-buttons'>
            <FormLabel id="price-form-label">Price</FormLabel>
            <RadioGroup
                onChange={props.onChange}
                value={props.value}
                defaultValue='$'
                row
                aria-labelledby="price-form-label"
                name="price"
            >
                <FormControlLabel value="$" control={<Radio />} label="$" labelPlacement='top' />
                <FormControlLabel value="$$" control={<Radio />} label="$$" labelPlacement='top' />
                <FormControlLabel value="$$$" control={<Radio />} label="$$$" labelPlacement='top' />
                <FormControlLabel value="$$$$" control={<Radio />} label="$$$$" labelPlacement='top' />
            </RadioGroup>
        </Box>

    );
}
