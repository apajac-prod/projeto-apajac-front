type Props = {
  text: string;
  className?: string;
  completed: boolean;
  selected: boolean;
  onClick?: () => void;
};
const FormIndice = ({
  className,
  text,
  onClick,
  completed,
  selected,
}: Props) => {
  return (
    <div
      className={`p-1 bg-white w-fit max-w-[120px] rounded-md flex justify-center items-center text-center capitalize hover:outline hover:outline-3 hover:outline-blue-800 ${
        selected ? "outline outline-3 outline-blue-800" : "outline-none"
      } ${completed && "bg-blue-800 text-white"} ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
      onClick={onClick}
    >
      <p className="inline-block w-fit">{text}</p>
    </div>
  );
};
export default FormIndice;
