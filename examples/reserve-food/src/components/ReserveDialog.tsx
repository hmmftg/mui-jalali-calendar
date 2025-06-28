import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {
  Box,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import NumberInputWithButtons from "./NumberInput";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { format } from "date-fns-jalali";
import StewAnimation from '../assets/images/stew-animation.gif';
import DietAnimation from '../assets/images/daiet-animation.gif';

const arabicDigits = ["٠", "١", "٢", "٣", "۴", "۵", "۶", "٧", "٨", "٩"];
const convertToArabicNumerals = (numberString: string) => {
  let result = "";
  for (const char of numberString) {
    if (char >= "0" && char <= "9") {
      result += arabicDigits[parseInt(char)];
    } else {
      result += char;
    }
  }
  return result;
};
export interface SimpleDialogProps {
  open: boolean;
  title: string;
  name: string;
  date: Date;
  type: string;
  price: string | null;
  selectedValue: number;
  onClose: (value: number) => void;
}

export const ReserveDialog: React.FC<SimpleDialogProps> = (props) => {
  const { onClose, selectedValue, open, title, name, price, date, type } = props;
  const [reserveCount, setReserveCount] = useState(selectedValue);

  return (
    <Dialog onClose={()=>{onClose(selectedValue)}} open={open}>
      <DialogTitle>
        <Typography fontSize={"2rem"} textAlign={"center"}>
          رزرو {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft:"60px",
            backgroundImage: `url(${type==="salad"?DietAnimation:StewAnimation})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "75px",
            height: "75px",
          }}
        >
        </Box>
        <Typography fontSize={"1.6rem"} textAlign={"center"}>
          {name}
        </Typography>
        <Typography fontSize={"1.6rem"} textAlign={"center"}>
          {convertToArabicNumerals(`${format(date, "d MMMM yyyy")}`)}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ justifyContent: "center", alignItems: "center" }}>
        <Typography fontSize={"1.6rem"}>قیمت هر وعده {price}</Typography>
        <NumberInputWithButtons
          value={reserveCount}
          max={2}
          setValue={setReserveCount}
        />
      </DialogContent>
      <DialogActions sx={{ alignItems: "center", justifyContent: "center" }}>
        <IconButton
          onClick={() => {
            onClose(reserveCount);
          }}
        >
          <ShoppingCartIcon color={reserveCount > 0 ? "success" : "disabled"} />
        </IconButton>
        <IconButton
          onClick={() => {
            setReserveCount(0);
            onClose(0);
          }}
        >
          <DeleteIcon color="error" />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};
