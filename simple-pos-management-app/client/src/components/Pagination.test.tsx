import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("renders current page and total pages correctly", () => {
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={() => {}} />
    );

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText(/page/i)).toBeInTheDocument();
    expect(screen.getByText(/of/i)).toBeInTheDocument();
  });

  it("handles previous button click correctly", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />
    );

    const previousButton = screen.getByText("Previous");
    fireEvent.click(previousButton);
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("handles next button click correctly", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />
    );

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("disables previous button on first page", () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
    );

    const previousButton = screen.getByText("Previous");
    expect(previousButton).toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(
      <Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />
    );

    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();
  });
});
