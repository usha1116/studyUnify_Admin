import { useState, useEffect } from "react";
import {
  Menu,
  X,
  GraduationCap,
  Users,
  FileText,
  ListOrdered,
  Briefcase,
  Globe,
  BarChart2,
  UserCheck,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const menuItems = [
  {
    title: "STD,BATCH & SUB CREATION",
    icon: GraduationCap,
    subMenu: [
      { name: "Standard", to: "/standard", icon: Users },
      { name: "Batch", to: "/batch", icon: Users },
      { name: "Subject", to: "/subject", icon: FileText },
    ],
  },
  {
    title: "I'D CREATION",
    icon: GraduationCap,
    subMenu: [
      { name: "Student Id Creator", to: "/student-id-creator", icon: Users },
      { name: "Student Id List", to: "/student-id-list", icon: FileText },
      { name: "Teacher Id Creation", to: "/teacherid", icon: FileText },
      { name: "Teacher Id List", to: "/teacher-id-list", icon: FileText },
      { name: "Manager Id", to: "/managerid", icon: FileText },
      { name: "Manager List", to: "/managerlist", icon: FileText },
    ],
  },
  {
    title: "TEST  SCHEDULE",
    icon: UserCheck,
    subMenu: [
      { name: "Upcoming", to: "/upcoming", icon: Users },
      { name: "Mark Pending", to: "/mark-pending", icon: Users },
      { name: "Completed", to: "/completed", icon: FileText },
    ],
  },
  { title: "LECTURE SCHEDULES", icon: UserCheck, to: "/lecture-schedules" },
  {
    title: "MESSAGES",
    icon: Globe,
    subMenu: [
      { name: "Simple Message", to: "/simple-message", icon: Users },
      { name: "Attendance Message", to: "/attendance-message", icon: Users },
      { name: "Mark Message", to: "/mark-message", icon: FileText },
      { name: "Mark Edit Message", to: "/mark-edit-message", icon: FileText },
    ],
  },
  {
    title: "PROGRESS REPORT",
    icon: BarChart2,
    subMenu: [
      { name: "Batch Progress Report", to: "/batch-progress-report", icon: Users },
      { name: "Student Progress Report", to: "/student-progress-report", icon: Users },
    ],
  },
  {
    title: "FEES",
    icon: Briefcase,
    subMenu: [
      { name: "Fees Update", to: "/fees-update", icon: Users },
      { name: "Installment Creation", to: "/installment-creation", icon: Users },
    ],
  },
  { title: "HOLIDAY SCHEDULE", icon: UserCheck, to: "/holiday-schedule" },
  {
    title: "ATTENDANCE DETAILS",
    icon: Briefcase,
    subMenu: [
      { name: "Batch Attendance", to: "/batch-attendance", icon: Users },
      { name: "STO Attendance", to: "/sto-attendance", icon: Users },
    ],
  },
  { title: "NOTICE", icon: UserCheck, to: "/advertisement" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleMenuClick = (title) => {
    setActiveMenu((prev) => (prev === title ? null : title));
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("aside") && !e.target.closest("button")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="md:flex">
      {/* Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-1 rounded shadow "
        onClick={toggleMenu}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-white shadow-md w-80 h-screen p-4 space-y-2 overflow-y-auto fixed z-40 md:relative transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="text-lg font-bold p-2 flex justify-center items-center">Dashboard</div>

        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx}>
              {item.subMenu ? (
                <div>
                  <button
                    onClick={() => handleMenuClick(item.title)}
                    className="w-full flex items-center gap-2 p-2 bg-gray-50 hover:bg-blue-200 rounded"
                  >
                    <div className="flex items-center gap-2 flex-grow">
                      <Icon size={18} className="text-blue-400" />
                      <span>{item.title}</span>
                    </div>
                    <div className="ml-auto">
                      {activeMenu === item.title ? (
                        <ChevronDown size={16} className="text-gray-500" />
                      ) : (
                        <ChevronRight size={16} className="text-gray-500" />
                      )}
                    </div>
                  </button>
                  {activeMenu === item.title && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.subMenu.map((sub, i) => {
                        const SubIcon = sub.icon;
                        return (
                          <Link
                            key={i}
                            to={sub.to}
                            className="flex items-center gap-2 p-2 bg-gray-50 hover:bg-blue-200 rounded text-sm"
                          >
                            <SubIcon size={16} className="text-blue-400" />
                            {sub.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.to}
                  className="flex items-center gap-2 p-2 bg-gray-50 hover:bg-blue-200 rounded"
                >
                  <Icon size={18} className="text-blue-300" />
                  {item.title}
                </Link>
              )}
            </div>
          );
        })}
      </aside>
    </div>
  );
}



