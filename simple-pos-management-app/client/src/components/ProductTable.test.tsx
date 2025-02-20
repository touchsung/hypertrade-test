import { ProductTable } from "./ProductTable";
import { Product } from "../types/product";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("ProductTable", () => {
  const mockProducts: Product[] = [
    {
      id: 1,
      name: "Test Product",
      sku: "TEST123",
      price: 99.99,
      stock_quantity: 10,
      status: true,
      description: "Test description",
      category_id: 1,
      created_at: "2021-01-01",
      updated_at: "2021-01-01",
      category: {
        id: 1,
        name: "Test Category",
        status: true,
        created_at: "2021-01-01",
        updated_at: "2021-01-01",
      },
    },
  ];

  const defaultProps = {
    products: mockProducts,
    onEdit: vi.fn(),
    onDelete: vi.fn(),
  };

  it("renders table headers correctly", () => {
    render(<ProductTable {...defaultProps} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("SKU")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("Stock")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("renders product data correctly", () => {
    render(<ProductTable {...defaultProps} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("TEST123")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("calls onEdit when edit button is clicked", () => {
    render(<ProductTable {...defaultProps} />);

    const editButton = screen.getAllByRole("button")[0];
    fireEvent.click(editButton);

    expect(defaultProps.onEdit).toHaveBeenCalledWith(1);
  });

  it("calls onDelete when delete button is clicked", () => {
    render(<ProductTable {...defaultProps} />);

    const deleteButton = screen.getAllByRole("button")[1];
    fireEvent.click(deleteButton);

    expect(defaultProps.onDelete).toHaveBeenCalledWith(1);
  });

  it("displays correct status badge colors", () => {
    const productsWithDifferentStatuses: Product[] = [
      { ...mockProducts[0], status: true },
      { ...mockProducts[0], id: 2, status: false },
    ];

    render(
      <ProductTable
        {...defaultProps}
        products={productsWithDifferentStatuses}
      />
    );

    const activeStatus = screen.getByText("Active");
    const inactiveStatus = screen.getByText("Inactive");

    expect(activeStatus).toHaveClass("bg-green-100", "text-green-800");
    expect(inactiveStatus).toHaveClass("bg-red-100", "text-red-800");
  });

  it("handles empty products array", () => {
    render(<ProductTable {...defaultProps} products={[]} />);

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.queryByText("Test Product")).not.toBeInTheDocument();
  });
});
