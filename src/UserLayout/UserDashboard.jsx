import { Outlet } from "react-router-dom";
import { UserBottomHeader } from "../UserComponents/UserBottomHeader";
import UserSideNav from "../UserComponents/UserSideNav";
import UserTopHeader from "../UserComponents/UserTopHeader";
export default function DashboardLayout() {
  return (
    <>
      <div className="min-h-svh ">
        <UserSideNav />
        <main className="ml-0 min-h-svh xl:ml-[calc(264px+8px)] flex flex-col">
          <UserTopHeader />
          <Outlet />
          <UserBottomHeader />
        </main>
      </div>
    </>
  );
}
