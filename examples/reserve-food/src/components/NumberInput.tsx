import React from "react";
import { TextField, Button, Box } from "@mui/material";

interface NumberInputProps {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  max: number;
}

export const NumberInputWithButtons: React.FC<NumberInputProps> = ({
  value,
  setValue,
  max,
}) => {
  const min = 0;

  const handleIncrement = () => {
    if (value < max) {
      setValue(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      setValue(value - 1);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue)) {
      setValue(newValue);
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <Button onClick={handleIncrement} disabled={value >= max}>
        +
      </Button>
      <TextField
        type="number"
        value={value}
        onChange={handleChange}
        slotProps={{
          input:{
            sx:{
                fontSize: "2rem",
            }
          },
          htmlInput: {
            min,
            max,
            type: "number",
          },
        }}
        sx={{ padding: "0 0px", fontSize: "2rem", width:"40%" }}
      />
      <Button onClick={handleDecrement} disabled={value <= min}>
        -
      </Button>
    </Box>
  );
};

export default NumberInputWithButtons;
