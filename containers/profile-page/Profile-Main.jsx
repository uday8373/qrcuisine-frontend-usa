"use client";
import {
  Button,
  Card,
  CardBody,
  Chip,
  Image,
  Progress,
  useDisclosure,
} from "@nextui-org/react";
import {
  ArrowLeft,
  ChartNoAxesColumn,
  ChevronRight,
  CircleHelp,
  Edit,
  HandPlatter,
  History,
  LogOut,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import {
  fetchRankBadgeData,
  fetchUserData,
  fetchUserPointData,
} from "@/apis/restaurantApi";
import LottieAnimation from "@/components/lottie/LottieAnimation";
import QRLoader from "@/components/lottie/QR_loop.json";
import EditProfileModal from "@/components/modal/Edit-Profile";
import useSmallScreen from "@/hooks/useSmallScreen";
import ScreenError from "@/components/pages/Screen-Error";

const ProfileMain = () => {
  const router = useRouter();
  const isSmallScreen = useSmallScreen();
  const [availablePoints, setAvailablePoints] = useState(0);
  const [rankBadge, setRankBadge] = useState(null);
  const [userData, setUserData] = useState(null);
  const [rankData, setRankData] = useState([]);
  const [nextRankBadge, setNextRankBadge] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
  } = useDisclosure();

  const encryptedToken =
    typeof window !== "undefined" ? localStorage.getItem("userToken") : null;

  if (!encryptedToken) {
    router.push("/login");
  }

  const fetchData = async () => {
    try {
      const [pointsResult, userResult, badgeResult] = await Promise.all([
        fetchUserPointData(),
        fetchUserData(),
        fetchRankBadgeData(),
      ]);

      setRankData(badgeResult);

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

      const currentBadge = badgeResult.find(
        (badge) =>
          available >= badge.greater_than && available < badge.less_than
      );
      setRankBadge(currentBadge);

      const nextBadge = badgeResult.find(
        (badge) => badge.greater_than > available
      );
      setNextRankBadge(nextBadge);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  }

  const pointsToNextRank = nextRankBadge
    ? nextRankBadge.greater_than - availablePoints
    : 0;
  const progressPercentage = nextRankBadge
    ? ((availablePoints - (rankBadge?.greater_than || 0)) /
        (nextRankBadge.greater_than - (rankBadge?.greater_than || 0))) *
      100
    : 100;

  if (isLoading) {
    return (
      <div className="w-full h-svh flex justify-center items-center -mt-8">
        <LottieAnimation width={400} height={400} animationData={QRLoader} />
      </div>
    );
  }

  const handleLogout = () => {
    alert("Are you sure you want to log out?");
    localStorage.removeItem("userToken");
    router.push("/login");
  };

  if (!isSmallScreen) {
    return <ScreenError />;
  }

  return (
    <section id="profile" className="flex flex-col w-full ">
      <div className="bg-gradient-to-bl from-primary-500/50 to-secondary-500/25 backdrop-blur-xl p-6 rounded-b-3xl text-black z-50">
        <div className="w-full items-center relative flex justify-center mb-4">
          <Button
            onClick={() => {
              router.back();
            }}
            size="sm"
            variant="light"
            isIconOnly
            className="absolute left-0 text-default-800"
          >
            <ArrowLeft />
          </Button>
          <h1 className="text-center text-large font-medium  text-default-800 uppercase ">
            Profile
          </h1>
        </div>
        <div className="text-center flex justify-center flex-col items-center gap-1">
          <div className="relative w-24 h-24 mx-auto my-2">
            <Image
              src={userData?.image || "/assets/placeholder.png"}
              alt="mark_vna"
              className={`rounded-xl w-24 h-24 object-cover shadow-small border-2 `}
            />
          </div>
          <p className="text-xl font-bold text-default-800">
            {userData?.name || "Anonymous"}
          </p>
          <p className="text-small font-medium leading-none text-default-700">
            {userData?.mobile || "N/A"}
          </p>
        </div>
      </div>
      <div className="px-6 w-full flex flex-col mt-3 ">
        <div className="w-full flex flex-col gap-2">
          <h3 className="text-default-700 font-medium text-medium mt-3">
            Loyality Points
          </h3>
          <Card
            aria-label="loyality"
            shadow="none"
            isBlurred
            className="border bg-default-100 pb-1"
          >
            <CardBody>
              <div className="flex justify-between items-center mb-2">
                <div className="text-2xl font-bold">
                  {availablePoints} points
                </div>
                {rankBadge && (
                  <Chip
                    style={{
                      backgroundColor: rankBadge
                        ? `rgba(${hexToRgb(rankBadge.color)}, 0.3)`
                        : "rgba(var(--nextui-colors-secondary-500-rgb), 0.2)",
                      color: `rgba(${hexToRgb(rankBadge.color)}, 1)`,
                    }}
                    classNames={{
                      content: "font-semibold",
                    }}
                    size="lg"
                    startContent={
                      <Image
                        alt="icon"
                        src={rankBadge?.image}
                        className="w-5 h-auto "
                      />
                    }
                    variant="flat"
                    color="success"
                  >
                    {rankBadge?.title}
                  </Chip>
                )}
              </div>
              <div className="space-y-1">
                {nextRankBadge ? (
                  <>
                    <div className="text-sm text-muted-foreground">
                      {pointsToNextRank} pts to {nextRankBadge.title}
                    </div>
                    <Progress
                      aria-label="progress"
                      value={progressPercentage}
                      className="w-full"
                    />
                  </>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    Maximum rank achieved
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="w-full flex flex-col gap-2">
          <h3 className="text-default-700 font-medium text-medium mt-3">
            Settings
          </h3>
          <Card
            aria-label="setting"
            shadow="none"
            isBlurred
            className="border bg-default-100"
          >
            <CardBody className="py-0">
              <div
                onClick={() => {
                  router.push("leaderboard");
                }}
                variant="outline"
                className="w-full justify-between flex items-center py-4"
              >
                <div className="flex items-center">
                  <ChartNoAxesColumn className="mr-2 h-4 w-4" />
                  Leaderboard
                </div>
                <ChevronRight className="h-4 w-4" />
              </div>
              <div className="border w-full border-dashed border-default-300" />
              <div
                onClick={onEditOpen}
                variant="outline"
                className="w-full justify-between flex items-center py-4"
              >
                <div className="flex items-center">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </div>
                <ChevronRight className="h-4 w-4" />
              </div>
              <div className="border w-full border-dashed border-default-300" />
              <div
                onClick={() => {
                  router.push("order-history");
                }}
                variant="outline"
                className="w-full justify-between flex items-center py-4"
              >
                <div className="flex items-center">
                  <HandPlatter className="mr-2 h-4 w-4" />
                  Order History
                </div>
                <ChevronRight className="h-4 w-4" />
              </div>
              {/* <div className="border w-full border-dashed border-default-300" /> */}
              {/* <div
                variant="outline"
                className="w-full justify-between flex items-center py-4"
              >
                <div className="flex items-center">
                  <History className="mr-2 h-4 w-4" />
                  Point History
                </div>
                <ChevronRight className="h-4 w-4" />
              </div> */}
            </CardBody>
          </Card>
        </div>
        <div className="w-full flex flex-col gap-2">
          <h3 className="text-default-700 font-medium text-medium mt-3">
            Account
          </h3>
          <Card
            aria-label="Account"
            shadow="none"
            isBlurred
            className="border bg-default-100 mb-5"
          >
            <CardBody className="py-0">
              <div
                onClick={() => {
                  router.push("https://erexstudio.com/contact-us");
                }}
                variant="outline"
                className="w-full justify-between flex items-center py-4"
              >
                <div className="flex items-center">
                  <CircleHelp className="mr-2 h-4 w-4" />
                  Help & Support
                </div>
                <ChevronRight className="h-4 w-4" />
              </div>
              <div className="border w-full border-dashed border-default-300" />
              <div
                onClick={handleLogout}
                variant="outline"
                className="w-full justify-between flex items-center py-4"
              >
                <div className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </div>
                <ChevronRight className="h-4 w-4" />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      <EditProfileModal
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
        userData={userData}
        fetchUserData={fetchData}
      />
    </section>
  );
};

export default ProfileMain;
