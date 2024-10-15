type Props = {
  title: string;
  descricao: string;
  onClick: () => void;
  className?: string;
};
const CarsInput = ({ title, descricao, onClick, className }: Props) => {
  return (
    <div
      className={`w-[500px] h-fit px-4 py-3 rounded-md cursor-pointer ${className}`}
      onClick={onClick}
    >
      <p className="font-semibold mb-4">{title}</p>
      <p>{descricao}</p>
    </div>
  );
};
export default CarsInput;
