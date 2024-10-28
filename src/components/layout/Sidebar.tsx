import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { Link, useMatchRoute } from "@tanstack/react-router";

export function Sidebar() {
  const matchRoute = useMatchRoute();

  const isItemActive = (href: string) => {
    if (href === "/") {
      // Exact match for home route
      return matchRoute({ to: "/" });
    }
    // For other routes, use the router's matching
    return matchRoute({ to: href, fuzzy: true });
  };

  return (
    <div className="hidden border-r bg-gray-100/40 lg:block lg:w-64">
      <div className="flex h-full flex-col">
        <div className="flex-1 space-y-1 p-4">
          {siteConfig.navigation.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item.href);

            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium",
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
                {/* Optional: Add indicator for active state */}
                {active && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                )}
              </Link>
            );
          })}
        </div>
        
        {/* Optional: Add a footer section */}
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