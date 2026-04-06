import { render, screen, fireEvent } from "@testing-library/react";
import { Navbar } from "../Navbar";

describe("Navbar", () => {
  const mockProps = {
    branding: { name: "TestLens" },
    navigation: [
      { label: "Dashboard", href: "/dashboard", active: true },
      { label: "Settings", href: "/settings" },
    ],
    onMenuClick: jest.fn(),
  };

  it("renders branding name", () => {
    render(<Navbar {...mockProps} />);
    expect(screen.getByText("TestLens")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Navbar {...mockProps} />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("calls onMenuClick when menu button is clicked", () => {
    render(<Navbar {...mockProps} />);
    const menuButton = screen.getByLabelText("Open menu");
    fireEvent.click(menuButton);
    expect(mockProps.onMenuClick).toHaveBeenCalled();
  });

  it("renders search input by default", () => {
    render(<Navbar {...mockProps} />);
    expect(screen.getByLabelText("Search")).toBeInTheDocument();
  });

  it("hides search input when showSearch is false", () => {
    render(<Navbar {...mockProps} showSearch={false} />);
    expect(screen.queryByLabelText("Search")).not.toBeInTheDocument();
  });

  it("renders rightContent when provided", () => {
    render(<Navbar {...mockProps} rightContent={<div data-testid="right-content">Right Content</div>} />);
    expect(screen.getByTestId("right-content")).toBeInTheDocument();
  });
});
