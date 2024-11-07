import {
  Avatar,
  Button,
  ButtonGroup,
  Image,
  useDisclosure,
} from "@nextui-org/react";
import {
  ArrowLeftToLine,
  ChevronRight,
  Edit,
  LogOut,
  Trophy,
} from "lucide-react";
import React, { useRef, useEffect, useState } from "react";
import EndSession from "../modal/End-Session";
import EditProfileModal from "../modal/Edit-Profile";
import {
  fetchRankBadgeData,
  fetchUserData,
  fetchUserPointData,
} from "@/apis/restaurantApi";
import { useRouter } from "next/navigation";

const ProfileSidebar = ({
  sidebarOpen,
  setSidebarOpen,
  tableId,
  restaurantId,
  userId,
  isEndSession = true,
}) => {
  const router = useRouter();
  const sidebarRef = useRef(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
  } = useDisclosure();

  const [availablePoints, setAvailablePoints] = useState(0);
  const [rankBadge, setRankBadge] = useState(null);
  const [userData, setUserData] = useState(null);

  const fetchData = async () => {
    try {
      const [pointsResult, userResult, badgeResult] = await Promise.all([
        fetchUserPointData(),
        fetchUserData(),
        fetchRankBadgeData(),
      ]);

      const totalPoints = pointsResult?.reduce(
        (acc, curr) => acc + curr.point,
        0
      );
      const nonCreditPoints = pointsResult
        ?.filter((point) => point.is_credit === false)
        ?.reduce((acc, curr) => acc + curr.point, 0);

      const available = totalPoints - nonCreditPoints;
      setAvailablePoints(available);

      if (userResult) {
        setUserData(userResult);
      }

      const userBadge = badgeResult.find(
        (badge) =>
          available >= badge.greater_than && available < badge.less_than
      );
      setRankBadge(userBadge);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const clickEndSession = () => {
    setSidebarOpen(false);
    onOpen();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    const toggleOverflow = () => {
      document.body.style.overflow = sidebarOpen ? "hidden" : "";
    };

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      toggleOverflow();
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      toggleOverflow();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [sidebarOpen, setSidebarOpen]);

  function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  }

  return (
    <>
      {sidebarOpen && <div className="fixed inset-0 backdrop-blur-sm z-30" />}

      <aside
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 w-72 bg-background z-40 shadow-small transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full p-4">
          {userData ? (
            <>
              <div className="flex flex-col items-center mb-5 mt-20">
                <Avatar
                  src={userData?.image}
                  className="w-20 h-20 mb-2 border shadow-small"
                  radius="md"
                />
                <h2 className="text-large font-semibold text-default-900">
                  {userData?.name ? userData?.name : "Anonymous"}
                </h2>
                <p className="text-sm text-default-500">{userData?.mobile}</p>
              </div>

              <div
                className={`flex flex-col items-center justify-between mb-5 px-3 py-3 rounded-lg gap-2 relative`}
                style={{
                  backgroundColor: rankBadge
                    ? `rgba(${hexToRgb(rankBadge.color)}, 0.2)`
                    : "rgba(var(--nextui-colors-secondary-500-rgb), 0.2)",
                }}
              >
                <div className="w-full flex justify-between">
                  <div className="flex flex-col">
                    <h3 className="text-[10px] font-bold uppercase">
                      Available Points
                    </h3>
                    <h2 className="text-2xl font-bold">{availablePoints}</h2>
                  </div>
                  {rankBadge && (
                    <Image
                      alt="icon"
                      src={rankBadge.image}
                      className="w-10 h-auto"
                    />
                  )}
                </div>
                <h4 className="text-[10px] leading-snug font-medium text-default-600 -mt-1">
                  Placed order to earn more loyality points, redeem exciting
                  deals.
                </h4>
                <ButtonGroup
                  fullWidth
                  size="sm"
                  variant="solid"
                  className="gap-0.5"
                >
                  {/* <Button
                    className={`font-medium text-white `}
                    style={{
                      backgroundColor: rankBadge
                        ? rankBadge.color
                        : "var(--nextui-colors-secondary-500)",
                    }}
                  >
                    HISTORY
                  </Button> */}
                  <Button
                    onClick={() => {
                      router.push("/profile");
                    }}
                    className={`font-medium text-white `}
                    style={{
                      backgroundColor: rankBadge
                        ? rankBadge.color
                        : "var(--nextui-colors-secondary-500)",
                    }}
                  >
                    PROFILE DETAILS
                  </Button>
                </ButtonGroup>
              </div>
            </>
          ) : (
            <div className="bg-gradient-to-tl to-primary-100 relative from-secondary-100 flex flex-col w-full h-36 rounded-lg mt-20 mb-5 px-3 py-5">
              <div className="w-full flex flex-col gap-1">
                <h4 className="text-xs text-default-800 font-medium">
                  Want to get better and win more!
                </h4>
                <h4 className="text-2xl font-bold text-primary ">
                  Get Your Points!
                </h4>
              </div>
              <div className="flex absolute bottom-2 right-2">
                <Image
                  src="/assets/coins.png"
                  alt="coins"
                  className="w-20 h-20 "
                />
              </div>
              <Button
                size="sm"
                color="primary"
                className="w-fit mt-2 absolute bottom-5 px-6 text-sm font-medium"
                onClick={() => {
                  router.push("/login");
                }}
              >
                Login
              </Button>
            </div>
          )}

          <div className="flex-1">
            {userData && (
              <>
                <Button
                  variant="flat"
                  className="w-full justify-start mb-2 rounded-lg px-3 relative bg-default-100 text-default-700 font-medium text-[15px]"
                  size="lg"
                  onClick={() => {
                    router.push("/leaderboard");
                  }}
                >
                  <Trophy size={18} className="mr-1" />
                  Leaderboard
                  <ChevronRight size={20} className="absolute right-2" />
                </Button>
                <Button
                  onClick={() => {
                    setSidebarOpen(false), onEditOpen(true);
                  }}
                  variant="flat"
                  className="w-full justify-start mb-2 rounded-lg px-3 relative bg-default-100 text-default-700 font-medium text-[15px]"
                  size="lg"
                >
                  <Edit size={18} className="mr-1" />
                  Edit Profile
                  <ChevronRight size={20} className="absolute right-2" />
                </Button>
              </>
            )}
            {/* <Button
              onClick={() => {
                localStorage.removeItem("userToken");
              }}
              variant="flat"
              className="w-full justify-start mb-2 rounded-lg px-3 relative font-medium text-[15px] bg-default-100 text-default-700"
              size="lg"
            >
              <ArrowLeftToLine size={18} className="mr-1" />
              Log Out
              <ChevronRight size={20} className="absolute right-2" />
            </Button> */}
            {isEndSession && (
              <Button
                onClick={clickEndSession}
                variant="flat"
                color="danger"
                className="w-full justify-start mb-2 rounded-lg px-3 relative text-danger-500 font-medium text-[15px]"
                size="lg"
              >
                <LogOut size={18} className="mr-1" />
                End Session
                <ChevronRight size={20} className="absolute right-2" />
              </Button>
            )}
          </div>
        </div>
      </aside>
      <EndSession
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        tableId={tableId}
        restaurantId={restaurantId}
        userId={userId}
      />
      <EditProfileModal
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
        userData={userData}
        fetchUserData={fetchData}
      />
    </>
  );
};

export default ProfileSidebar;
