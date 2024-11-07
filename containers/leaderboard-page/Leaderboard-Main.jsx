"use client";
import { fetchAllPointData } from "@/apis/leaderboardApi";
import { PolygonIcon } from "@/components/icons/icons";
import LottieAnimation from "@/components/lottie/LottieAnimation";
import { siteConfig } from "@/config/site";
import { Avatar, Button, Image, Tab, Tabs } from "@nextui-org/react";
import CryptoJS from "crypto-js";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import Crown from "@/components/lottie/crown.json";
import { fetchRankBadgeData } from "@/apis/restaurantApi";
import QRLoader from "@/components/lottie/QR_loop.json";
import { notFound, useRouter } from "next/navigation";
import ScreenError from "@/components/pages/Screen-Error";
import useSmallScreen from "@/hooks/useSmallScreen";

const LeaderboardMain = () => {
  const router = useRouter();
  const isSmallScreen = useSmallScreen();
  const [selectedTab, setSelectedTab] = useState("week");
  const [pointData, setPointData] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const [myRank, setMyRank] = useState(null);
  const [myPoints, setMyPoints] = useState(0);
  const [rankBadge, setRankBadge] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const encryptedToken =
    typeof window !== "undefined" ? localStorage.getItem("userToken") : null;

  if (!encryptedToken) {
    notFound();
  }

  const decryptedBytes = CryptoJS.AES.decrypt(
    encryptedToken,
    siteConfig.cryptoSecret
  );

  const userId = decryptedBytes.toString(CryptoJS.enc.Utf8);

  const fetchData = async () => {
    try {
      const result = await fetchAllPointData(selectedTab);
      setPointData(result);
      calculateTopUsers(result);
    } catch (error) {
      console.error("Error fetching point data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBadgeData = async () => {
    const badgeResult = await fetchRankBadgeData();

    setRankBadge(badgeResult);
  };

  const calculateBadge = (points) => {
    const userBadge = rankBadge?.find(
      (badge) => points >= badge.greater_than && points < badge.less_than
    );
    return userBadge;
  };

  const calculateTopUsers = (pointData) => {
    const userPointsMap = pointData.reduce((acc, curr) => {
      const { user_id, point, is_credit } = curr;
      const currUserId = user_id.id;

      if (!acc[currUserId]) {
        acc[currUserId] = { ...user_id, points: 0 };
      }

      acc[currUserId].points += is_credit ? point : -point;
      return acc;
    }, {});

    const sortedUsers = Object.values(userPointsMap)
      .filter((user) => user.points >= 0)
      .sort((a, b) => b.points - a.points);

    setTopUsers(sortedUsers.slice(0, 10));

    const userRank = sortedUsers.findIndex((user) => user.id === userId);
    if (userRank !== -1) {
      setMyRank(userRank + 1);
      setMyPoints(sortedUsers[userRank].points);
    } else {
      setMyRank(null);
      setMyPoints(0);
    }
  };

  const getOrdinalSuffix = (number) => {
    const suffixes = ["TH", "ST", "ND", "RD"];
    const value = number % 100;
    return suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0];
  };

  useEffect(() => {
    fetchData();
    fetchBadgeData();
  }, [selectedTab]);

  function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  }

  if (isLoading) {
    return (
      <div className="w-full h-svh flex justify-center items-center -mt-8">
        <LottieAnimation width={400} height={400} animationData={QRLoader} />
      </div>
    );
  }

  if (!isSmallScreen) {
    return <ScreenError />;
  }

  return (
    <section id="leaderboard" className="flex flex-col w-full ">
      <div className="bg-gradient-to-bl from-primary-500/50 to-secondary-500/25 backdrop-blur-xl p-6 rounded-b-3xl text-black sticky top-0 z-50">
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
            Leaderboard
          </h1>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <Tabs
            classNames={{
              tabList: "bg-white/20 backdrop-blur-xl",
              tabContent: "text-default-800",
              cursor: "bg-secondary-200",
            }}
            color="default"
            size="lg"
            fullWidth
            selectedKey={selectedTab ? selectedTab : "week"}
            className="font-medium"
            onSelectionChange={(tab) => setSelectedTab(tab)}
          >
            <Tab key="week" title="Weekly" />
            <Tab key="all" title="All Time" />
          </Tabs>
        </div>

        <div className="flex justify-between items-center gap-8">
          {/* Second Place */}
          <div className="text-center flex justify-center flex-col items-center gap-1">
            <p className="text-medium font-bold leading-none -mb-0.5 text-default-700">
              2
            </p>
            <PolygonIcon size={10} className="fill-primary" />
            <div className="relative w-16 h-16 mx-auto my-2">
              <Image
                src={
                  topUsers[1]?.image
                    ? topUsers[1]?.image
                    : "/assets/placeholder.png"
                }
                alt="mark_vna"
                className={`rounded-xl w-16 h-16 object-cover shadow-small border-2 `}
                style={{
                  borderColor: calculateBadge(topUsers[1]?.points || 0)?.color
                    ? `rgba(${hexToRgb(
                        calculateBadge(topUsers[1]?.points || 0)?.color
                      )}, 0.6)`
                    : "rgba(var(--nextui-colors-secondary-500-rgb), 0.8)",
                }}
              />
              <div className="w-full flex justify-center absolute -bottom-2">
                <Image
                  radius="none"
                  alt="ranking"
                  src={
                    calculateBadge(
                      topUsers[1]?.points ? topUsers[1]?.points : 0
                    )?.image
                  }
                  className="w-auto h-6"
                />
              </div>
            </div>
            <p className="text-xl font-bold text-default-800">
              {topUsers[1]?.points ? topUsers[1]?.points : 0}
            </p>
            <p className="text-small font-medium leading-none text-default-700">
              {topUsers[1]?.name ? topUsers[1]?.name : "Anonymous"}
            </p>
          </div>

          {/* First Place */}
          <div className="text-center flex justify-center flex-col items-center gap-1">
            <LottieAnimation width={65} height={40} animationData={Crown} />
            <div className="relative w-24 h-24 mx-auto mb-2">
              <Image
                src={
                  topUsers[0]?.image
                    ? topUsers[0]?.image
                    : "/assets/placeholder.png"
                }
                alt="jessica_cher"
                className="rounded-xl object-cover  w-24 h-24 border-2 shadow-small"
                style={{
                  borderColor: calculateBadge(topUsers[0]?.points || 0)?.color
                    ? `rgba(${hexToRgb(
                        calculateBadge(topUsers[0]?.points || 0)?.color
                      )}, 0.8)`
                    : "rgba(var(--nextui-colors-secondary-500-rgb), 0.2)",
                }}
              />
              <div className="w-full flex justify-center absolute -bottom-3">
                <Image
                  radius="none"
                  alt="ranking"
                  src={calculateBadge(topUsers[0]?.points || 0)?.image}
                  className="w-auto h-8"
                />
              </div>
            </div>
            <p className="text-xl font-bold text-default-800">
              {topUsers[0]?.points ? topUsers[0]?.points : 0}
            </p>
            <p className="text-small font-medium leading-none text-default-700">
              {topUsers[0]?.name ? topUsers[0]?.name : "Anonymous"}
            </p>
          </div>

          {/* Third Place */}
          <div className="text-center flex justify-center flex-col items-center gap-1">
            <p className="text-medium font-bold leading-none -mb-0.5 text-default-700">
              3
            </p>
            <PolygonIcon size={10} className="fill-danger rotate-180" />
            <div className="relative w-16 h-16 mx-auto my-2">
              <Image
                src={
                  topUsers[2]?.image
                    ? topUsers[2]?.image
                    : "/assets/placeholder.png"
                }
                alt="mark_vna"
                className="rounded-xl w-16 h-16 object-cover shadow-small border-2"
                style={{
                  borderColor: calculateBadge(topUsers[2]?.points || 0)?.color
                    ? `rgba(${hexToRgb(
                        calculateBadge(topUsers[2]?.points || 0)?.color
                      )}, 0.8)`
                    : "rgba(var(--nextui-colors-secondary-500-rgb), 0.2)",
                }}
              />
              <div className="w-full flex justify-center absolute -bottom-2">
                <Image
                  radius="none"
                  alt="ranking"
                  src={calculateBadge(topUsers[2]?.points || 0)?.image}
                  className="w-auto h-6"
                />
              </div>
            </div>
            <p className="text-xl font-bold text-default-800">
              {topUsers[2]?.points ? topUsers[2]?.points : 0}
            </p>
            <p className="text-small font-medium leading-none text-default-700">
              {topUsers[2]?.name ? topUsers[2]?.name : "Anonymous"}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col px-6 mt-5 gap-3">
        <h3 className="text-default-800 font-medium">My Ranking</h3>
        {myRank ? (
          <div className="w-full flex gap-5 bg-default-100 px-3 py-3 rounded-xl border items-center">
            <h4 className="font-semibold text-small text-default-600 w-10">
              {myRank}
              {getOrdinalSuffix(myRank)}
            </h4>
            <div className="w-full flex gap-3 items-center">
              <div className="relative flex">
                <Avatar
                  radius="md"
                  src={topUsers[myRank - 1]?.image || "/assets/placeholder.png"}
                  size="md"
                  className="border-2 w-12 h-12"
                  style={{
                    borderColor: calculateBadge(myPoints || 0)?.color
                      ? `rgba(${hexToRgb(
                          calculateBadge(myPoints || 0)?.color
                        )}, 0.5)`
                      : "rgba(var(--nextui-colors-secondary-500-rgb), 0.2)",
                  }}
                />
              </div>
              <div>
                <h4 className="font-semibold text-large text-default-800 line-clamp-1">
                  {topUsers[myRank - 1]?.name || "Anonymous"}
                </h4>
                <h4 className="text-small font-bold text-secondary-500 line-clamp-1">
                  {myPoints}{" "}
                  <span className="text-default-500 font-normal"> Points</span>
                </h4>
              </div>
            </div>
            <div className="w-20 flex flex-col items-center ">
              <h4 className="text-default-500 font-medium text-small">
                {calculateBadge(myPoints)?.title}
              </h4>
              <Image
                radius="none"
                alt="ranking"
                src={calculateBadge(myPoints)?.image}
                className="w-auto h-8"
              />
            </div>
          </div>
        ) : (
          <p className="text-default-600">You are not ranked yet.</p>
        )}
      </div>
      <div className="w-full flex flex-col px-6 mt-5 gap-3 mb-5">
        <h3 className="text-default-800 font-medium">Leaderboard</h3>
        {topUsers.map((user, index) => {
          const rank = index + 1;
          const ordinalRank = `${rank}${getOrdinalSuffix(rank)}`;
          return (
            <div
              key={index}
              className="w-full flex gap-5 bg-default-100 px-3 py-3 rounded-xl border items-center"
            >
              <h4 className="font-semibold text-small text-default-600 w-10">
                {ordinalRank}
              </h4>
              <div className="w-full flex gap-3 items-center">
                <div className="relative flex">
                  <Avatar
                    src={user?.image}
                    size="md"
                    radius="md"
                    className="border-2 w-12 h-12"
                    style={{
                      borderColor: calculateBadge(user.points)?.color
                        ? `rgba(${hexToRgb(
                            calculateBadge(user.points)?.color
                          )}, 0.5)`
                        : "rgba(var(--nextui-colors-secondary-500-rgb), 0.2)",
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-large text-default-800 line-clamp-1">
                    {user.name ? user.name : "Anonymous"}
                  </h4>
                  <h4 className="text-small font-bold text-secondary-500 line-clamp-1">
                    {user.points ? user.points : 0}{" "}
                    <span className="text-default-500 font-normal">
                      {" "}
                      Points
                    </span>
                  </h4>
                </div>
              </div>
              <div className="w-20 flex flex-col items-center ">
                <h4 className="text-default-500 font-medium text-small">
                  {calculateBadge(user.points ? user.points : 0)?.title}
                </h4>
                <Image
                  radius="none"
                  alt="ranking"
                  src={calculateBadge(user.points ? user.points : 0)?.image}
                  className="w-auto h-8"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LeaderboardMain;
