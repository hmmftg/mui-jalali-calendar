# mui-persian-calendar

Persian Wide Calendar Built With Mui DatePicker, to decrease effort to build Wide Calendars in react for persian developers

## Usage

```typescript
import Header from "./components/Header";
import DayButton from "./components/DayButton";

const colors = [
  "#fbf8cc",
  "#fde4cf",
  "#ffcfd2",
  "#f1c0e8",
  "#cfbaf0",
  "#a3c4f3",
  "#90dbf4",
  "#8eecf5",
  "#98f5e1",
  "#b9fbc0",
];

const App: React.FC = () => {
  const date = new Date();
  const minDate = new Date(new Date(date).setMonth(date.getMonth() - 3));
  const maxDate = new Date(new Date(date).setMonth(date.getMonth() + 1));
  return <Calendar
          dayComponent={(props) => (
            <Day 
              {...props} 
              colors={colors} 
              dayComponent={DayButton}
            />
          )}
          headerComponent={Header}
          minDate={minDate}
          maxDate={maxDate}
        />;
}
```

## Examples

You can find examples of how to use the `mui-jalali-calendar` component in the [examples](https://github.com/hmmftg/mui-jalali-calendar/tree/main/examples) folder.

### Live Demo

Check out the live demo [here](https://hmmftg.github.io/mui-jalali-calendar).
