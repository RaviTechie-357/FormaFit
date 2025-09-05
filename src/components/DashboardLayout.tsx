// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useSelector } from "react-redux";
// import { RootState } from "../redux/store";
// import { UserRole } from "../types/prisma";
// import {
//   Home,
//   Users,
//   Calendar,
//   BarChart3,
//   Settings,
//   MessageSquare,
//   CreditCard,
//   Target,
//   Menu,
//   X,
//   LogOut,
//   User,
// } from "lucide-react";

// interface DashboardLayoutProps {
//   children: React.ReactNode;
// }

// export default function DashboardLayout({ children }: DashboardLayoutProps) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const pathname = usePathname();
//   const { user } = useSelector((state: RootState) => state.auth);

//   const getNavItems = () => {
//     if (!user) return [];

//     const baseItems = [
//       { name: "Dashboard", path: "/dashboard", icon: Home },
//       { name: "Profile", path: "/profile", icon: User },
//       { name: "Messages", path: "/messages", icon: MessageSquare },
//       { name: "Settings", path: "/settings", icon: Settings },
//     ];

//     switch (user.role) {
//       case UserRole.ADMIN:
//         return [
//           ...baseItems,
//           { name: "Users", path: "/admin/users", icon: Users },
//           { name: "Analytics", path: "/admin/analytics", icon: BarChart3 },
//           { name: "Reports", path: "/admin/reports", icon: BarChart3 },
//         ];
//       case UserRole.TRAINER:
//         return [
//           ...baseItems,
//           { name: "Clients", path: "/trainer/clients", icon: Users },
//           { name: "Schedule", path: "/trainer/schedule", icon: Calendar },
//           { name: "Earnings", path: "/trainer/earnings", icon: CreditCard },
//           { name: "Goals", path: "/trainer/goals", icon: Target },
//         ];
//       case UserRole.CLIENT:
//         return [
//           ...baseItems,
//           { name: "My Trainers", path: "/client/trainers", icon: Users },
//           { name: "Bookings", path: "/client/bookings", icon: Calendar },
//           { name: "Goals", path: "/client/goals", icon: Target },
//           { name: "Payments", path: "/client/payments", icon: CreditCard },
//         ];
//       default:
//         return baseItems;
//     }
//   };

//   const navItems = getNavItems();

//   const isActivePath = (path: string) => {
//     if (path === "/dashboard") {
//       return pathname === "/dashboard" || pathname.startsWith("/dashboard/");
//     }
//     return pathname.startsWith(path);
//   };

//   const getDashboardTitle = () => {
//     if (!user) return "Dashboard";
//     switch (user.role) {
//       case UserRole.ADMIN:
//         return "Admin Dashboard";
//       case UserRole.TRAINER:
//         return "Trainer Dashboard";
//       case UserRole.CLIENT:
//         return "Client Dashboard";
//       default:
//         return "Dashboard";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Mobile sidebar overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
//           <div className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//               <User className="w-5 h-5 text-white" />
//             </div>
//             <span className="text-lg font-semibold text-gray-900">
//               FormaFit
//             </span>
//           </div>
//           <button
//             onClick={() => setSidebarOpen(false)}
//             className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <nav className="mt-6 px-3">
//           <div className="space-y-1">
//             {navItems.map((item) => (
//               <Link
//                 key={item.path}
//                 href={item.path}
//                 className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
//                   isActivePath(item.path)
//                     ? "bg-blue-100 text-blue-700"
//                     : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//                 }`}
//                 onClick={() => setSidebarOpen(false)}
//               >
//                 <item.icon className="w-5 h-5 mr-3" />
//                 {item.name}
//               </Link>
//             ))}
//           </div>
//         </nav>

//         {/* User info at bottom */}
//         <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
//           <div className="flex items-center space-x-3">
//             <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
//               <User className="w-4 h-4 text-white" />
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-medium text-gray-900 truncate">
//                 {user?.name || "User"}
//               </p>
//               <p className="text-xs text-gray-500 capitalize">
//                 {user?.role?.toLowerCase() || "user"}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="lg:pl-64">
//         {/* Top bar */}
//         <div className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200">
//           <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
//             <div className="flex items-center">
//               <button
//                 onClick={() => setSidebarOpen(true)}
//                 className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
//               >
//                 <Menu className="w-6 h-6" />
//               </button>
//               <h1 className="ml-4 text-xl font-semibold text-gray-900">
//                 {getDashboardTitle()}
//               </h1>
//             </div>

//             <div className="flex items-center space-x-4">
//               <button className="p-2 text-gray-400 hover:text-gray-600">
//                 <MessageSquare className="w-5 h-5" />
//               </button>
//               <button className="p-2 text-gray-400 hover:text-gray-600">
//                 <LogOut className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Page content */}
//         <main className="p-4 sm:p-6 lg:p-8">{children}</main>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { UserRole } from "../types/prisma";
import {
  Home,
  Users,
  Calendar,
  BarChart3,
  Settings,
  MessageSquare,
  CreditCard,
  Target,
  Menu,
  X,
  LogOut,
  User,
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useSelector((state: RootState) => state.auth);

  const getNavItems = () => {
    if (!user) return [];

    const baseItems = [
      { name: "Dashboard", path: "/dashboard", icon: Home },
      { name: "Profile", path: "/profile", icon: User },
      { name: "Messages", path: "/messages", icon: MessageSquare },
      { name: "Settings", path: "/settings", icon: Settings },
    ];

    switch (user.role) {
      case UserRole.ADMIN:
        return [
          ...baseItems,
          { name: "Users", path: "/admin/users", icon: Users },
          { name: "Analytics", path: "/admin/analytics", icon: BarChart3 },
          { name: "Reports", path: "/admin/reports", icon: BarChart3 },
        ];
      case UserRole.TRAINER:
        return [
          ...baseItems,
          { name: "Clients", path: "/trainer/clients", icon: Users },
          { name: "Schedule", path: "/trainer/schedule", icon: Calendar },
          { name: "Earnings", path: "/trainer/earnings", icon: CreditCard },
          { name: "Goals", path: "/trainer/goals", icon: Target },
        ];
      case UserRole.CLIENT:
        return [
          ...baseItems,
          { name: "My Trainers", path: "/client/trainers", icon: Users },
          { name: "Bookings", path: "/client/bookings", icon: Calendar },
          { name: "Goals", path: "/client/goals", icon: Target },
          { name: "Payments", path: "/client/payments", icon: CreditCard },
        ];
      default:
        return baseItems;
    }
  };

  const navItems = getNavItems();

  const isActivePath = (path: string) => {
    if (path === "/dashboard") {
      return pathname === "/dashboard" || pathname.startsWith("/dashboard/");
    }
    return pathname.startsWith(path);
  };

  const getDashboardTitle = () => {
    if (!user) return "Dashboard";
    switch (user.role) {
      case UserRole.ADMIN:
        return "Admin Dashboard";
      case UserRole.TRAINER:
        return "Trainer Dashboard";
      case UserRole.CLIENT:
        return "Client Dashboard";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:top-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">
              FormaFit
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActivePath(item.path)
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* User info at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {user?.role?.toLowerCase() || "user"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="ml-4 text-xl font-semibold text-gray-900">
                {getDashboardTitle()}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <MessageSquare className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
