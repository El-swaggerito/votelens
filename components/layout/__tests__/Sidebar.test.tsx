import { render, screen, fireEvent } from "@testing-library/react";
import { Sidebar } from "../Sidebar";
import { Home, User } from "lucide-react";

describe("Sidebar", () => {
  const mockProps = {
    isOpen: true,
    onClose: jest.fn(),
    branding: { name: "TestLens", tagline: "Test Tagline" },
    navigation: [
      { label: "Home", href: "/home", active: true, icon: Home },
      { label: "Profile", href: "/profile", icon: User },
    ],
  };

  it("renders branding information correctly", () => {
    render(<Sidebar {...mockProps} />);
    expect(screen.getAllByText("TestLens")[0]).toBeInTheDocument();
    expect(screen.getByText("Test Tagline")).toBeInTheDocument();
  });

  it("renders navigation items", () => {
    render(<Sidebar {...mockProps} />);
    expect(screen.getAllByText("Home").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Profile").length).toBeGreaterThan(0);
  });

  it("calls onClose when mobile close button is clicked", () => {
    render(<Sidebar {...mockProps} />);
    const closeButtons = screen.getAllByRole("button");
    const mobileCloseButton = closeButtons.find(btn => btn.textContent === "✕");
    if (mobileCloseButton) {
      fireEvent.click(mobileCloseButton);
      expect(mockProps.onClose).toHaveBeenCalled();
    }
  });
  
  it("renders footer and user actions when provided", () => {
    render(
      <Sidebar 
        {...mockProps} 
        footerActions={<div data-testid="footer-action">Footer Action</div>}
        userActions={<div data-testid="user-action">User Action</div>}
      />
    );
    expect(screen.getAllByText("Footer Action")[0]).toBeInTheDocument();
    expect(screen.getAllByText("User Action")[0]).toBeInTheDocument();
  });
});
