interface BasicLabelProps {
  text: string;
}
const BasicLabel = (props: BasicLabelProps) => {
  const { text } = props;
  return (
    <div className="p-5 text-center">
      <p className="text-3xl rounded-md bg-grape p-3 font-semibold text-white shadow-md">
        {text}
      </p>
    </div>
  );
};

export default BasicLabel;
