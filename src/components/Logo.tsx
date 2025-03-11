import { logo } from "@/assets/assets";

function Logo() {
  return (
    <div className="text-lg font-semibold flex items-center gap-3">
      <img src={logo} alt="ZenKaryaX logo" className="size-6" />

      <span>ZenKaryaX</span>
    </div>
  );
}

export default Logo;
