import debounce from 'debounce';

interface IInput extends React.ComponentProps<"input"> {
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  time: number;
}

function Input({ onChange, time, id, ...rest }: IInput) {
  const handleOnChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => onChange(e), time);

  return (
    <input
      id={id}
      onClick={(e) => {
        e.stopPropagation();
      }}
      onChange={handleOnChange}
      {...rest}
    />
  );
}

export default Input;
