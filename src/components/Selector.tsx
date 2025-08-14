import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Selector() {
  return (
    <Select>
      <SelectTrigger className="w-full cursor-pointer text-[#8f8f8f] rounded-lg py-6 px-4 border-black">
        <SelectValue
          placeholder="Select a category"
          className="text-[#8f8f8f] "
        />
      </SelectTrigger>
      <SelectContent className="rounded-lg font-semibold">
        <SelectItem className="cursor-pointer" value="Entertainment">
          Entertainment
        </SelectItem>
        <SelectItem className="cursor-pointer" value="Bills">
          Bills
        </SelectItem>
        <SelectItem className="cursor-pointer" value="Groceries">
          Groceries
        </SelectItem>
        <SelectItem className="cursor-pointer" value="DiningOut">
          DiningOut
        </SelectItem>
        <SelectItem className="cursor-pointer" value="Transportation">
          Transportation
        </SelectItem>
        <SelectItem className="cursor-pointer" value="PersonalCare">
          PersonalCare
        </SelectItem>
        <SelectItem className="cursor-pointer" value="Education">
          Education
        </SelectItem>
        <SelectItem className="cursor-pointer" value="Lifestyle">
          Lifestyle
        </SelectItem>
        <SelectItem className="cursor-pointer" value="Shopping">
          Shopping
        </SelectItem>
        <SelectItem className="cursor-pointer" value="General">
          General
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
