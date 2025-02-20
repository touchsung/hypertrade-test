import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProductModal } from "./ProductModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as categoryService from "../service/category";
import { Product } from "../types/product";
// Mock the category service
vi.mock("../service/category", () => ({
  getCategories: vi.fn().mockResolvedValue([
    { id: 1, name: "Category 1", status: true },
    { id: 2, name: "Category 2", status: true },
  ]),
  createCategory: vi
    .fn()
    .mockResolvedValue({ id: 3, name: "New Category", status: true }),
}));

describe("ProductModal", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onSubmit: vi.fn(),
    product: null as Product | null,
  };

  const renderWithQuery = (props = defaultProps) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <ProductModal {...props} />
      </QueryClientProvider>
    );
  };

  it("renders add product form when no product is provided", () => {
    renderWithQuery();
    expect(screen.getByText("Add New Product")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("SKU")).toBeInTheDocument();
    expect(screen.getByLabelText("Price")).toBeInTheDocument();
    expect(screen.getByLabelText("Stock Quantity")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Category")).toBeInTheDocument();
  });

  it("renders edit product form with populated data when product is provided", () => {
    const product = {
      id: 1,
      name: "Test Product",
      sku: "TEST123",
      price: 99.99,
      stock_quantity: 10,
      description: "Test description",
      status: true,
      category: {
        id: 1,
        name: "Category 1",
        status: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      category_id: 1,
    };

    renderWithQuery({ ...defaultProps, product });

    expect(screen.getByText("Edit Product")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Product")).toBeInTheDocument();
    expect(screen.getByDisplayValue("TEST123")).toBeInTheDocument();
    expect(screen.getByDisplayValue("99.99")).toBeInTheDocument();
    expect(screen.getByDisplayValue("10")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test description")).toBeInTheDocument();
  });

  it("submits form with correct data", async () => {
    const onSubmitSpy = vi.fn();
    renderWithQuery({ ...defaultProps, onSubmit: onSubmitSpy });

    // Fill out the form
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "New Product" },
    });
    fireEvent.change(screen.getByLabelText("SKU"), {
      target: { value: "NEW123" },
    });
    fireEvent.change(screen.getByLabelText("Price"), {
      target: { value: "29.99" },
    });
    fireEvent.change(screen.getByLabelText("Stock Quantity"), {
      target: { value: "5" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "New description" },
    });
    fireEvent.change(screen.getByLabelText("Category"), {
      target: { value: "0" },
    });

    // Submit the form
    const submitButton = screen.getByRole("button", { name: /add product/i });

    fireEvent.submit(submitButton.closest("form")!);

    await waitFor(() => {
      expect(onSubmitSpy).toHaveBeenCalledWith({
        name: "New Product",
        sku: "NEW123",
        price: 29.99,
        stock_quantity: 5,
        description: "New description",
        category_id: 0,
        status: false,
      });
    });
  });

  it("opens and handles new category dialog", async () => {
    renderWithQuery();

    // Open new category dialog
    fireEvent.click(screen.getByText("New"));
    expect(screen.getByText("Create New Category")).toBeInTheDocument();

    // Fill and submit new category form
    fireEvent.change(screen.getByLabelText("Category Name"), {
      target: { value: "New Category" },
    });
    fireEvent.click(screen.getByText("Create"));

    await waitFor(() => {
      expect(categoryService.createCategory).toHaveBeenCalledWith({
        name: "New Category",
        status: true,
      });
    });
  });

  it("closes modal when cancel is clicked", () => {
    renderWithQuery();
    fireEvent.click(screen.getByText("Cancel"));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("displays loading state while fetching categories", () => {
    renderWithQuery();
    expect(screen.getByText("Loading categories...")).toBeInTheDocument();
  });
});
