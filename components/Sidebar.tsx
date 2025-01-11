"use client";

import React from "react";

import { HomeIcon, Layers2Icon, ShieldCheckIcon, CoinsIcon } from "lucide-react";

const routes = [
    {
        href: "",
        label: "Home",
        icon: HomeIcon
    },
    {
        href: "workflows",
        label: "Workflows",
        icon: Layers2Icon
    },
    {
        href: "credentials",
        label: "Credentials",
        icon: ShieldCheckIcon
    },
    {
        href: "billing",
        label: "Billing",
        icon: CoinsIcon
    }
]
function DesktopSidebar() {
    return <div>Hello World</div>
}

export default DesktopSidebar;