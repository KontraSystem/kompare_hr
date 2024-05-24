export default function Footer(props) {
  const { children } = props;

  return (
    <div className="flex flex-end w-full bg-customBlack border-t-4 border-t-customRed h-16">
      {children}
    </div>
  );
}
