type Props = {
  text: string;
  onClick?: () => any;
  type?: "button" | "submit" | "reset";
  className?: string;
  style?: "default" | "confirm" | "delete";
};
const STYLE_TYPE = {
  default:
    "min-w-24 h-12 font-semibold text-white bg-[#2E5994] border-none rounded-md p-2 cursor-pointer duration-300 hover:text-[#5992cd] hover:bg-white hover:outline hover:outline-1 hover:outline-[#5992cd]",
  confirm:
    "min-w-24 h-12 font-semibold text-white bg-green-700 border-none rounded-md p-2 cursor-pointer duration-300 hover:text-green-700 hover:bg-white hover:outline hover:outline-1 hover:outline-green-700",
  delete:
    "min-w-24 h-12 font-semibold text-white bg-[#ff0000] border-none rounded-md p-2 cursor-pointer duration-300 hover:text-[#ff0000] hover:bg-white hover:outline hover:outline-1 hover:outline-[#ff0000]",
};

const Button = ({
  text,
  onClick,
  type = "button",
  style = "default",
  className,
}: Props) => {
  if (style != "default" && style != "confirm" && style != "delete")
    throw Error(
      "<Button/> component invalid style. The value needs to be one of next: 'default' | 'confirm' | 'delete'"
    );
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${STYLE_TYPE[style]} ${className}`}
    >
      {text}
    </button>
  );
};
export default Button;
