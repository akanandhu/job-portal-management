import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatOptionLabel } from "@/lib/utils";

type FilterSelectPropsI = {
  label: string;
  onValueChange: (value: string) => void;
  options: readonly string[];
  placeholder: string;
  value: string;
  emptyValue?: string;
};

function FilterSelect({
  label,
  onValueChange,
  options,
  placeholder,
  value,
  emptyValue = "all",
}: FilterSelectPropsI) {
  return (
    <div className="grid gap-2 text-sm font-semibold">
      {label}
      <Select value={value} onValueChange={(nextValue) => onValueChange(String(nextValue))}>
        <SelectTrigger className="h-10 w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={emptyValue} displayValue="All">
            {emptyValue}
          </SelectItem>
          {options.map((option) => (
            <SelectItem key={option} value={option} displayValue={formatOptionLabel(option)}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default FilterSelect;
