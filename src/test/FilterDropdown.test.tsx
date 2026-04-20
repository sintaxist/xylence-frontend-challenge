import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FilterDropdown } from "@/components/Shared/Filters/FilterDropdown";

describe("FilterDropdown", () => {
  const mockOptions = ["FinTech", "HealthTech"];
  const mockOnSelect = vi.fn();

  it("debe abrir el menú y mostrar las opciones al hacer clic", () => {

    render(
      <FilterDropdown 
        label="Categoría" 
        options={mockOptions} 
        selected={[]} 
        onSelect={mockOnSelect} 
      />
    );

    const button = screen.getByRole("button", { name: /categoría/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    const option = screen.getByText("FinTech");
    expect(option).toBeInTheDocument();
  });

  it("debe llamar a onSelect cuando se hace clic en una opción", () => {
    render(
      <FilterDropdown 
        label="Categoría" 
        options={mockOptions} 
        selected={[]} 
        onSelect={mockOnSelect} 
      />
    );

    fireEvent.click(screen.getByRole("button"));

    const option = screen.getByLabelText("FinTech");
    fireEvent.click(option);

    expect(mockOnSelect).toHaveBeenCalledWith("FinTech");
  });
});