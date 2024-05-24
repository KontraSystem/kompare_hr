interface BasicCardProps {
  component: JSX.Element;
}

export default function BasicCard(props: BasicCardProps) {
  const { component } = props;

  return <div className="max-w-sm w lg:max-w-full lg:flex">{component}</div>;
}
