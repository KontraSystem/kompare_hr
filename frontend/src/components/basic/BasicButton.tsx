interface BasicButtonProps {
  onClick: () => void;
}
const BasicButton = (props: BasicButtonProps) => {
  const { onClick } = props;
  return (
    <div className="mt-6 flex items-center justify-end gap-x-6">
      <button
        type="submit"
        onClick={onClick}
        className="rounded-md bg-grape px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-thistle focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Save
      </button>
    </div>
  );
};

export default BasicButton;
