import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CategoryCard, CategoryCardProps } from "./CategoryCard";
import { useNavigate } from "react-router-dom";

// Mock the useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const mockCategoryCard: CategoryCardProps = {
  category: "Category Title",
  icon: "img.jpg",
  alt: "category image",
  isActive: true,
  onClick: jest.fn(),
};

describe("CategoryCard Component", () => {
  const mockNavigate = jest.fn();
  (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

  beforeEach(() => {
    mockNavigate.mockClear();
    (mockCategoryCard.onClick as jest.Mock).mockClear();
  });

  it("should render category card details correctly", () => {
    render(
      <CategoryCard
        category={mockCategoryCard.category}
        icon={mockCategoryCard.icon}
        alt={mockCategoryCard.alt}
        isActive={mockCategoryCard.isActive}
        onClick={mockCategoryCard.onClick}
      />
    );

    // Check for text content
    expect(screen.getByText("Category Title")).toBeInTheDocument();

    // Check for image rendering
    const image = screen.getByAltText("category image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "img.jpg");

    // Check for card click handling
    const card = screen
      .getByRole("heading", { name: "Category Title" })
      .closest("div");
    expect(card).toBeInTheDocument();
    fireEvent.click(card!);
    expect(mockCategoryCard.onClick).toHaveBeenCalled();
  });

  it("should navigate to the correct URL on click", () => {
    render(
      <CategoryCard
        category={mockCategoryCard.category}
        icon={mockCategoryCard.icon}
        alt={mockCategoryCard.alt}
        isActive={mockCategoryCard.isActive}
        onClick={() => mockNavigate(`/categories/${mockCategoryCard.category}`)}
      />
    );

    const card = screen
      .getByRole("heading", { name: "Category Title" })
      .closest("div");
    fireEvent.click(card!);
    expect(mockNavigate).toHaveBeenCalledWith(
      `/categories/${mockCategoryCard.category}`
    );
  });
});
