import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import {
  UserIcon,
  UsersIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "@/context/AuthContext";

export default function UserDropdown({ avatarUrl, username }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <img
          src={avatarUrl}
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover hover:opacity-80 cursor-pointer transition"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel className="font-bold">{username}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => navigate("/profile")}>
          <UserIcon className="w-4 h-4" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => navigate("/mynetwork")}>
          <UsersIcon className="w-4 h-4" />
          My Network
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={logout}>
          <ArrowRightStartOnRectangleIcon className="w-4 h-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
