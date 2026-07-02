import Button from "../../../../ui/buttons/Button";

type NavbarDrawerToggleProps = {
  open: boolean;

  onClick: () => void;
};

const NavbarToggle = ({ open, onClick }: NavbarDrawerToggleProps) => {
  return (
    <Button
      onClick={onClick}
      aria-expanded={open}
      aria-label={open ? "Close navigation" : "Open navigation"}
      style={{
        width: 40,

        height: 40,

        padding: 0,

        borderRadius: "calc(var(--radius) - 2px)",

        background: "transparent",

        display: "flex",

        flexDirection: "column",

        alignItems: "center",

        justifyContent: "center",

        gap: 4,

        cursor: "pointer",
      }}
    >
      <span
        style={{
          width: 18,

          height: 1.5,

          borderRadius: 999,

          background: "hsl(var(--foreground))",

          transition: "transform 0.2s ease",

          transform: open ? "translateY(5.5px) rotate(45deg)" : undefined,
        }}
      />

      <span
        style={{
          width: 18,

          height: 1.5,

          borderRadius: 999,

          background: "hsl(var(--foreground))",

          transition: "opacity 0.2s ease",

          opacity: open ? 0 : 1,
        }}
      />

      <span
        style={{
          width: 18,

          height: 1.5,

          borderRadius: 999,

          background: "hsl(var(--foreground))",

          transition: "transform 0.2s ease",

          transform: open ? "translateY(-5.5px) rotate(-45deg)" : undefined,
        }}
      />
    </Button>
  );
};

export default NavbarToggle;
