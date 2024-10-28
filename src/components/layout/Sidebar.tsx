import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { Link, useMatchRoute } from "@tanstack/react-router";

export function Sidebar({ isOpen }: { isOpen: boolean }) {
  const matchRoute = useMatchRoute();
  const isItemActive = (href: string) => {
    if (href === "/") {
      return matchRoute({ to: "/" });
    }
    return matchRoute({ to: href, fuzzy: true });
  };

  return (
    <div
      className={cn(
        "fixed z-20 h-full bg-gray-100/100 border-r",
        "transform transition-transform duration-200 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 px-4 py-4 space-y-1">
          {siteConfig.navigation.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item.href);

            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                  "transition-colors duration-200",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <Icon
                  className={cn(
                    "mr-2 h-4 w-4",
                    active
                      ? "text-primary-foreground"
                      : "text-gray-500 group-hover:text-gray-700"
                  )}
                />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>

        <div className="border-t p-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span>Business Account Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
