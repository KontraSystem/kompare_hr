import KompareLogo from "/kompare_logo.svg";
const LogoHeader = () => {
  return (
    <nav className="flex sticky w-100 top-0 left-0 right-0 bg-grape p-4 flex items-center ">
      <div className="text-xl">
        <img src={KompareLogo} />
      </div>
    </nav>
  );
};

export default LogoHeader;
