import React, { useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { CountCard } from "./CountCard/CountCard";

import assignedIcon from "src/assets/images/countRequestCards/assignedIcon.svg";
import duplicateIcon from "src/assets/images/countRequestCards/duplicateIcon.svg";
import forRevisionIcon from "src/assets/images/countRequestCards/forRevisionIcon.svg";
import impossibleIcon from "src/assets/images/countRequestCards/impossibleIcon.svg";
import installedIcon from "src/assets/images/countRequestCards/installedIcon.svg";
import timeIcon from "src/assets/images/countRequestCards/timeIcon.svg";

export const CountRequestCards = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const cards = [
        {
            title: "Назначены дилерам",
            count: "12380",
            colorCount: "rgba(112, 145, 183, 1)",
            icon: assignedIcon,
            detail: "Lorem ipsum dolor sit.",
        },
        {
            title: "Просроченные",
            count: "167637",
            colorCount: "rgba(224, 23, 23, 1)",
            icon: assignedIcon,
            detail: "Lorem ipsum dolor sit.",
        },
        {
            title: "Выполненные установки",
            count: "302011",
            colorCount: "rgba(65, 185, 77, 1)",
            icon: installedIcon,
            detail: "Lorem ipsum dolor sit.",
        },
        {
            title: "Установки с просрочкой",
            count: "0",
            colorCount: "rgba(224, 23, 23, 0.6)",
            icon: installedIcon,
            detail: "Lorem ipsum dolor sit.",
        },
        {
            title: "На доработку",
            count: "321111",
            colorCount: "rgba(255, 155, 41, 1)",
            icon: forRevisionIcon,
            detail: "Lorem ipsum dolor sit.",
        },
        {
            title: "В Невозможно",
            count: "142231",
            colorCount: "rgba(165, 165, 165, 1)",
            icon: impossibleIcon,
            detail: "Lorem ipsum dolor sit.",
        },
        {
            title: "В Дубликаты",
            count: "7828",
            colorCount: "rgba(165, 165, 165, 1)",
            icon: duplicateIcon,
            detail: "Lorem ipsum dolor sit.",
        },
        {
            title: "Среднее время (дней)",
            count: "29,2",
            colorCount: "rgba(76, 181, 117, 1)",
            icon: timeIcon,
            detail: "Lorem ipsum dolor sit.",
        },
    ];

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            const handleWheel = (event: WheelEvent) => {
                if (event.deltaY !== 0) {
                    event.preventDefault();
                    container.scrollLeft += event.deltaY;
                }
            };
            container.addEventListener("wheel", handleWheel as unknown as EventListener);
            return () => {
                container.removeEventListener("wheel", handleWheel as unknown as EventListener);
            };
        }
    }, []);

    return (
        <Box
            ref={containerRef}
            sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "4px",
                borderRadius: "8px",
                boxShadow: "0px 0px 6px 0px rgba(0, 0, 0, 0.15)",
                padding: "16px",
                overflowX: "auto",
                overflowY: "hidden",
                whiteSpace: "nowrap",
                // cursor: "grab"
            }}
        >
            {cards.map((card) => {
                const { title, count, colorCount, icon, detail } = card;
                return <CountCard key={title} title={title} count={count} colorCount={colorCount} icon={icon} detail={detail} />;
            })}
        </Box>
    );
};

