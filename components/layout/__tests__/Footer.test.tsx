import { render, screen } from "@testing-library/react";
import { Footer } from "../Footer";

describe("Footer", () => {
  const mockProps = {
    branding: { name: "TestLens", tagline: "Test Tagline" },
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms", highlight: true },
    ],
    copyright: "© 2024 TestLens",
  };

  it("renders branding information", () => {
    render(<Footer {...mockProps} />);
    expect(screen.getByText("TestLens")).toBeInTheDocument();
    expect(screen.getByText("Test Tagline")).toBeInTheDocument();
  });

  it("renders footer links", () => {
    render(<Footer {...mockProps} />);
    expect(screen.getByText("Privacy")).toBeInTheDocument();
    expect(screen.getByText("Terms")).toBeInTheDocument();
  });

  it("highlights the designated link", () => {
    render(<Footer {...mockProps} />);
    const highlightedLink = screen.getByText("Terms");
    expect(highlightedLink).toHaveClass("text-primary");
    expect(highlightedLink).toHaveClass("underline");
  });

  it("renders copyright text", () => {
    render(<Footer {...mockProps} />);
    expect(screen.getByText("© 2024 TestLens")).toBeInTheDocument();
  });
});
