import { useState } from "react";
import type { Icon } from "@tabler/icons-react";
import {
  IconChecklist,
  IconLayoutDashboard,
  IconBriefcase2,
  IconCalendarTime,
  IconCalendarDollar,
  IconBuildingCommunity,
  IconFileTime,
  IconBox,
  IconBeach,
  IconBulb,
} from "@tabler/icons-react";
import { Center, Stack, Tooltip, UnstyledButton } from "@mantine/core";
import classes from "./Sidebar.module.css";

interface NavbarLinkProps {
  icon: Icon;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function Sidebar({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={classes.link}
        data-active={active || undefined}
        aria-label={label}
      >
        <Icon size={20} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconLayoutDashboard, label: "Dashboard" },
  { icon: IconChecklist, label: "Daily Tasks" },
  { icon: IconBriefcase2, label: "Projects" },
  { icon: IconCalendarTime, label: "Leaves" },
  { icon: IconCalendarDollar, label: "Leave Compensation" },
  { icon: IconBuildingCommunity, label: "Work From Home" },
  { icon: IconFileTime, label: "Time Entry" },
  { icon: IconBox, label: "Venue Booking" },
  { icon: IconBeach, label: "Holiday" },
  { icon: IconBulb, label: "Policies" },
];

export function NavbarMinimal() {
  const [active, setActive] = useState(0);

  const links = mockdata.map((link, index) => (
    <Sidebar
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <Center>
        <img src="/logo.svg" alt="Logo" className={classes.logo} />
      </Center>

      <hr className={classes.hr} />

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>
    </nav>
  );
}

export default Sidebar;
