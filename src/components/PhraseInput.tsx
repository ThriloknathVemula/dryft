import { Input } from "./ui/input";

type PhraseInputProps = {
  index: number;
  value: string;
  onChange: (index: number, value: string) => void;
};

export const PhraseInput = ({ index, value, onChange }: PhraseInputProps) => {
    return (
        <div className="flex items-center gap-1">
            <p>{index + 1}.</p>
            <Input type="text" value={value}  onChange={(e) => onChange(index, e.target.value)}/>
        </div>
    )
}