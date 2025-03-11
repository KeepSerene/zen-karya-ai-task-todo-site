// Constant import
import { SOCIAL_LINKS } from "@/constants/constants";

// Component import
import { Separator } from "./ui/separator";

function Footer() {
  return (
    <footer className="p-4 pb-0">
      <div className="wrapper min-h-16 bg-background border border-b-0 rounded-t-xl py-4 flex flex-col lg:flex-row items-center lg:justify-between gap-3">
        <p className="text-sm text-center">
          &copy; {new Date().getFullYear()} KeepSerene
        </p>

        <ul className="flex flex-wrap items-center">
          {SOCIAL_LINKS.map(({ href, label }, index) => (
            <li key={index} className="flex items-center">
              <a
                href={href}
                target="_blank"
                className="text-muted-foreground text-sm transition-colors hover:text-foreground"
              >
                {label}
              </a>

              <>
                {index !== SOCIAL_LINKS.length - 1 && (
                  <Separator orientation="vertical" className="h-3 mx-3" />
                )}
              </>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
