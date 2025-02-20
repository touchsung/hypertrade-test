import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

describe("Header", () => {
  it("renders title and description correctly", () => {
    const props = {
      title: "Test Title",
      description: "Test Description",
    };

    render(<Header {...props} />);

    // Check if title is rendered
    const titleElement = screen.getByText("Test Title");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe("H1");

    // Check if description is rendered
    const descriptionElement = screen.getByText("Test Description");
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement.tagName).toBe("P");
  });

  it("applies correct styling classes", () => {
    const props = {
      title: "Test Title",
      description: "Test Description",
    };

    render(<Header {...props} />);

    const titleElement = screen.getByText("Test Title");
    expect(titleElement).toHaveClass(
      "text-3xl",
      "font-bold",
      "bg-gradient-to-r",
      "from-blue-600",
      "to-purple-600",
      "bg-clip-text",
      "text-transparent"
    );

    const descriptionElement = screen.getByText("Test Description");
    expect(descriptionElement).toHaveClass("mt-2", "text-gray-500");
  });
});
